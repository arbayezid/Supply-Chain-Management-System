import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Paper, Button, TextField, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, Select, MenuItem, Alert, Snackbar, useTheme, InputAdornment, Tooltip
} from '@mui/material';
import {
  Add, Edit, Delete, Search, FilterList, Inventory, CheckCircle,
  Warning, Error, Visibility, TrendingUp
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import করা হলো

const InventoryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // useNavigate hook ব্যবহার করা হলো
  const [inventory, setInventory] = useState([]); // <-- API থেকে আসা আসল ডেটা থাকবে
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true); // <-- লোডিং অবস্থা ট্র্যাক করার জন্য
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // --- ডাটাবেস থেকে আসল ডেটা আনার ফাংশন ---
  const fetchInventory = useCallback(() => {
    setLoading(true);
    axios.get('/api/items')
      .then(response => {
        setInventory(response.data);
        setFilteredInventory(response.data); // প্রাথমিকভাবে ফিল্টার করা ডেটাও সেট করা হলো
        console.log("Successfully fetched data from database:", response.data);
      })
      .catch(error => {
        console.error("Error fetching inventory data:", error);
        setSnackbar({ open: true, message: 'Failed to load inventory data.', severity: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // --- ফিল্টারিং লজিক ---
  const filterInventory = useCallback(() => {
    let filtered = inventory;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => {
        if (selectedStatus === 'in_stock') return item.quantity > item.minQuantity;
        if (selectedStatus === 'low_stock') return item.quantity <= item.minQuantity && item.quantity > 0;
        if (selectedStatus === 'out_of_stock') return item.quantity === 0;
        return true;
      });
    }

    setFilteredInventory(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, inventory]);

  useEffect(() => {
    filterInventory();
  }, [searchTerm, selectedCategory, selectedStatus, inventory, filterInventory]);

  // --- quantity এবং minQuantity অনুযায়ী স্ট্যাটাস চিপ দেখাবে ---
  const getStatusChip = (item) => {
    if (item.quantity === 0) {
      return <Chip icon={<Error />} label="Out of Stock" color="error" size="small" variant="outlined" />;
    }
    if (item.quantity <= item.minQuantity) {
      return <Chip icon={<Warning />} label="Low Stock" color="warning" size="small" variant="outlined" />;
    }
    return <Chip icon={<CheckCircle />} label="In Stock" color="success" size="small" variant="outlined" />;
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setOpenDialog(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  // --- ডাটাবেসে আইটেম ডিলিট করার জন্য API কল ---
  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`/api/items/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
          fetchInventory(); // তালিকা রিফ্রেশ করবে
        })
        .catch(error => {
          console.error("Error deleting item:", error);
          setSnackbar({ open: true, message: 'Failed to delete item.', severity: 'error' });
        });
    }
  };
  
  // --- ডাটাবেসে আইটেম সেভ বা আপডেট করার জন্য API কল ---
  const handleSaveItem = (itemData) => {
    const request = editingItem
      ? axios.put(`/api/items/${editingItem.id}`, itemData)
      : axios.post('/api/items', itemData);

    request
      .then(() => {
        setSnackbar({ open: true, message: `Item ${editingItem ? 'updated' : 'added'} successfully`, severity: 'success' });
        fetchInventory(); // তালিকা রিফ্রেশ করবে
      })
      .catch(error => {
        console.error("Error saving item:", error);
        setSnackbar({ open: true, message: 'Failed to save item.', severity: 'error' });
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  const stats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    lowStockItems: inventory.filter(item => item.quantity <= item.minQuantity && item.quantity > 0).length,
    outOfStockItems: inventory.filter(item => item.quantity === 0).length,
  };

  const categories = [...new Set(inventory.map(item => item.category))];
  
  const chartOptions = { /* ... চার্টের অপশন আগের মতোই থাকবে ... */ };
  const chartSeries = categories.map(category => inventory.filter(item => item.category === category).length);

  if (loading) {
    return <Typography sx={{p: 3}}>Loading inventory...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Inventory Management</Typography>
        <Button onClick={handleAddItem} variant="contained" startIcon={<Add />}>Add Item</Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography color="textSecondary" gutterBottom variant="body2">Total Items</Typography><Typography variant="h4" fontWeight="bold">{stats.totalItems}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography color="textSecondary" gutterBottom variant="body2">Total Value</Typography><Typography variant="h4" fontWeight="bold">${stats.totalValue.toLocaleString()}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography color="textSecondary" gutterBottom variant="body2">Low Stock Items</Typography><Typography variant="h4" fontWeight="bold" color="warning.main">{stats.lowStockItems}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Card><CardContent><Typography color="textSecondary" gutterBottom variant="body2">Out of Stock</Typography><Typography variant="h4" fontWeight="bold" color="error.main">{stats.outOfStockItems}</Typography></CardContent></Card>
        </Grid>
      </Grid>
      
      {/* ... আপনার বাকি UI অপরিবর্তিত থাকবে, শুধু টেবিলের ডেটা filteredInventory থেকে আসবে ... */}

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
         <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}><TextField fullWidth placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)}}/></Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth><InputLabel>Category</InputLabel><Select value={selectedCategory} label="Category" onChange={(e) => setSelectedCategory(e.target.value)}><MenuItem value="all">All Categories</MenuItem>{categories.map((category) => (<MenuItem key={category} value={category}>{category}</MenuItem>))}</Select></FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
             <FormControl fullWidth><InputLabel>Status</InputLabel><Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}><MenuItem value="all">All Statuses</MenuItem><MenuItem value="in_stock">In Stock</MenuItem><MenuItem value="low_stock">Low Stock</MenuItem><MenuItem value="out_of_stock">Out of Stock</MenuItem></Select></FormControl>
          </Grid>
          <Grid item xs={12} md={2}><Button fullWidth variant="outlined" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedStatus('all'); }}>Clear Filters</Button></Grid>
        </Grid>
      </Paper>
      
      {/* Inventory Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead><TableRow><TableCell>Item Name</TableCell><TableCell>SKU</TableCell><TableCell>Category</TableCell><TableCell>Quantity</TableCell><TableCell>Price</TableCell><TableCell>Status</TableCell><TableCell>Supplier</TableCell><TableCell>Last Updated</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
            <TableBody>
              {filteredInventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell><Typography variant="body2" fontWeight="bold">{item.name}</Typography></TableCell>
                    <TableCell><Chip label={item.sku} size="small" variant="outlined" /></TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell><Typography variant="body2" fontWeight="bold">{item.quantity}</Typography></TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{getStatusChip(item)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell><Box sx={{ display: 'flex', gap: 1 }}><Tooltip title="Edit Item"><IconButton size="small" color="primary" onClick={() => handleEditItem(item)}><Edit /></IconButton></Tooltip><Tooltip title="Delete Item"><IconButton size="small" color="error" onClick={() => handleDeleteItem(item.id)}><Delete /></IconButton></Tooltip></Box></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredInventory.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}/>
      </Paper>

      {/* Add/Edit Item Dialog */}
      <InventoryDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveItem} item={editingItem} categories={categories}/>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert></Snackbar>
    </Box>
  );
};

// ... InventoryDialog কম্পোনেন্টটি অপরিবর্তিত থাকবে ...
const InventoryDialog = ({ open, onClose, onSave, item, categories }) => { /* ... আপনার আগের কোড ... */ };


export default InventoryPage;