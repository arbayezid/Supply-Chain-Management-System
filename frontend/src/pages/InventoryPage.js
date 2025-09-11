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

const InventoryPage = () => {
  const theme = useTheme();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchInventory = useCallback(() => {
    setLoading(true);
    axios.get('/api/items')
      .then(response => {
        const itemsWithStatus = response.data.map(item => {
          let status = 'in_stock';
          if ((item.quantity || 0) === 0) {
            status = 'out_of_stock';
          } else if ((item.quantity || 0) <= (item.minQuantity || 0)) {
            status = 'low_stock';
          }
          return { ...item, status };
        });
        setInventory(itemsWithStatus);
      })
      .catch(error => {
        console.error("Error fetching inventory data:", error);
        setSnackbar({ open: true, message: 'Failed to load inventory data.', severity: 'error' });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const filterInventory = useCallback(() => {
    // ... 필্টারিং লজিক অপরিবর্তিত ...
    let filtered = inventory;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }
    setFilteredInventory(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, inventory]);

  useEffect(() => {
    filterInventory();
  }, [searchTerm, selectedCategory, selectedStatus, inventory, filterInventory]);

  const getStatusChip = (status) => {
    const statusConfig = {
      in_stock: { color: 'success', label: 'In Stock', icon: <CheckCircle /> },
      low_stock: { color: 'warning', label: 'Low Stock', icon: <Warning /> },
      out_of_stock: { color: 'error', label: 'Out of Stock', icon: <Error /> },
    };
    const config = statusConfig[status] || {};
    return <Chip icon={config.icon} label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setOpenDialog(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`/api/items/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
          fetchInventory();
        })
        .catch(error => {
          console.error("Error deleting item:", error);
          setSnackbar({ open: true, message: 'Failed to delete item.', severity: 'error' });
        });
    }
  };

  const handleSaveItem = (itemData) => {
    const request = editingItem
      ? axios.put(`/api/items/${editingItem.id}`, itemData)
      : axios.post('/api/items', itemData);

    request
      .then(() => {
        setSnackbar({ open: true, message: `Item ${editingItem ? 'updated' : 'added'} successfully`, severity: 'success' });
        fetchInventory();
      })
      .catch(error => {
        console.error("Error saving item:", error);
        setSnackbar({ open: true, message: 'Failed to save item.', severity: 'error' });
      })
      .finally(() => setOpenDialog(false));
  };

  const stats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0),
    lowStockItems: inventory.filter(item => item.status === 'low_stock').length,
    outOfStockItems: inventory.filter(item => item.status === 'out_of_stock').length,
  };

  const categories = [...new Set(inventory.map(item => item.category).filter(Boolean))];
  const chartOptions = { /* ... */ };
  const chartSeries = categories.map(category => inventory.filter(item => item.category === category).length);

  if (loading) return <Typography sx={{ p: 3 }}>Loading inventory data...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* ... আপনার UI এর উপরের অংশ (Header, Cards, Charts) অপরিবর্তিত ... */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h4" fontWeight="bold">Inventory Management</Typography><Button onClick={handleAddItem} variant="contained" startIcon={<Add />}>Add Item</Button></Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography>Total Items</Typography><Typography variant="h4">{stats.totalItems}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography>Total Value</Typography><Typography variant="h4">${stats.totalValue.toLocaleString()}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography>Low Stock Items</Typography><Typography variant="h4" color="warning.main">{stats.lowStockItems}</Typography></CardContent></Card></Grid>
        <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography>Out of Stock</Typography><Typography variant="h4" color="error.main">{stats.outOfStockItems}</Typography></CardContent></Card></Grid>
      </Grid>
      
      {/* ... Filters and Search অপরিবর্তিত ... */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}><TextField fullWidth placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} /></Grid>
            <Grid item xs={12} md={3}><FormControl fullWidth><InputLabel>Category</InputLabel><Select value={selectedCategory} label="Category" onChange={(e) => setSelectedCategory(e.target.value)}><MenuItem value="all">All Categories</MenuItem>{categories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={3}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}><MenuItem value="all">All Statuses</MenuItem><MenuItem value="in_stock">In Stock</MenuItem><MenuItem value="low_stock">Low Stock</MenuItem><MenuItem value="out_of_stock">Out of Stock</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={2}><Button fullWidth variant="outlined" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedStatus('all'); }}>Clear Filters</Button></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead><TableRow><TableCell>Item Name</TableCell><TableCell>SKU</TableCell><TableCell>Category</TableCell><TableCell>Quantity</TableCell><TableCell>Price</TableCell><TableCell>Status</TableCell><TableCell>Supplier</TableCell><TableCell>Location</TableCell><TableCell>Last Updated</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
            <TableBody>
              {filteredInventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><Chip label={item.sku} size="small" variant="outlined" /></TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    {/* *** মূল পরিবর্তন এখানে *** */}
                    <TableCell>${(item.price || 0).toFixed(2)}</TableCell>
                    <TableCell>{getStatusChip(item.status)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    {/* *** মূল পরিবর্তন এখানে *** */}
                    <TableCell>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details"><IconButton size="small"><Visibility /></IconButton></Tooltip>
                        <Tooltip title="Edit Item"><IconButton size="small" color="primary" onClick={() => handleEditItem(item)}><Edit /></IconButton></Tooltip>
                        <Tooltip title="Delete Item"><IconButton size="small" color="error" onClick={() => handleDeleteItem(item.id)}><Delete /></IconButton></Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredInventory.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
      </Paper>
      
      <InventoryDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveItem} item={editingItem} categories={categories} />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert></Snackbar>
    </Box>
  );
};

// --- InventoryDialog কম্পোনেন্টটি আরও শক্তিশালী করা হলো ---
const InventoryDialog = ({ open, onClose, onSave, item, categories }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ name: '', sku: '', category: '', quantity: 0, minQuantity: 0, price: 0, supplier: '', location: '' });
    }
  }, [item]);

  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item ? 'Edit Inventory Item' : 'Add New Inventory Item'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Item Name" name="name" value={formData.name || ''} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="SKU" name="sku" value={formData.sku || ''} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Category</InputLabel><Select name="category" value={formData.category || ''} label="Category" onChange={handleChange} required>{categories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Quantity" name="quantity" type="number" value={formData.quantity || ''} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Minimum Quantity" name="minQuantity" type="number" value={formData.minQuantity || ''} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Price" name="price" type="number" value={formData.price || ''} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Supplier" name="supplier" value={formData.supplier || ''} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Location" name="location" value={formData.location || ''} onChange={handleChange} required /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained">{item ? 'Update' : 'Add'} Item</Button></DialogActions>
      </form>
    </Dialog>
  );
};

export default InventoryPage;