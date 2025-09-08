import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  useTheme,
  InputAdornment,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Inventory,
  Warning,
  CheckCircle,
  Error,
  Visibility,
  LocalOffer,
  Category,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';

const InventoryPage = () => {
  const theme = useTheme();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data
  const mockInventory = [
    {
      id: 1,
      name: 'Laptop Charger',
      sku: 'LAP-CHG-001',
      category: 'Electronics',
      quantity: 5,
      minQuantity: 10,
      price: 29.99,
      supplier: 'TechCorp Solutions',
      location: 'Warehouse A',
      status: 'low_stock',
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      sku: 'WRL-MSE-002',
      category: 'Electronics',
      quantity: 25,
      minQuantity: 15,
      price: 19.99,
      supplier: 'TechCorp Solutions',
      location: 'Warehouse A',
      status: 'in_stock',
      lastUpdated: '2024-01-14',
    },
    {
      id: 3,
      name: 'USB Cable',
      sku: 'USB-CBL-003',
      category: 'Electronics',
      quantity: 0,
      minQuantity: 20,
      price: 9.99,
      supplier: 'CableCo',
      location: 'Warehouse B',
      status: 'out_of_stock',
      lastUpdated: '2024-01-13',
    },
    {
      id: 4,
      name: 'Office Chair',
      sku: 'OFF-CHR-004',
      category: 'Furniture',
      quantity: 8,
      minQuantity: 5,
      price: 199.99,
      supplier: 'OfficeFurniture Inc',
      location: 'Warehouse C',
      status: 'in_stock',
      lastUpdated: '2024-01-12',
    },
    {
      id: 5,
      name: 'Desk Lamp',
      sku: 'DSK-LMP-005',
      category: 'Furniture',
      quantity: 12,
      minQuantity: 8,
      price: 49.99,
      supplier: 'Lighting Solutions',
      location: 'Warehouse C',
      status: 'in_stock',
      lastUpdated: '2024-01-11',
    },
  ];

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Home & Garden', 'Sports'];
  const statuses = ['in_stock', 'low_stock', 'out_of_stock'];

  useEffect(() => {
    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
  }, []);

  useEffect(() => {
    filterInventory();
  }, [searchTerm, selectedCategory, selectedStatus, inventory]);

  const filterInventory = () => {
    let filtered = inventory;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredInventory(filtered);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      in_stock: { color: 'success', label: 'In Stock', icon: <CheckCircle /> },
      low_stock: { color: 'warning', label: 'Low Stock', icon: <Warning /> },
      out_of_stock: { color: 'error', label: 'Out of Stock', icon: <Error /> },
    };

    const config = statusConfig[status];
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
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
    setInventory(prev => prev.filter(item => item.id !== id));
    setSnackbar({
      open: true,
      message: 'Item deleted successfully',
      severity: 'success'
    });
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      setInventory(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ));
      setSnackbar({
        open: true,
        message: 'Item updated successfully',
        severity: 'success'
      });
    } else {
      const newItem = {
        ...itemData,
        id: Date.now(),
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setInventory(prev => [...prev, newItem]);
      setSnackbar({
        open: true,
        message: 'Item added successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  const getInventoryStats = () => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const lowStockItems = inventory.filter(item => item.status === 'low_stock').length;
    const outOfStockItems = inventory.filter(item => item.status === 'out_of_stock').length;

    return { totalItems, totalValue, lowStockItems, outOfStockItems };
  };

  const stats = getInventoryStats();

  // Chart options for inventory overview
  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports'],
    plotOptions: {
      pie: { donut: { size: '70%' } },
    },
    dataLabels: { enabled: false },
  };

  const chartSeries = [44, 55, 13, 33];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Inventory Management
        </Typography>
        <Button
          component={Link}
          to="/inventory/add"
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add Item
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Items
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalItems}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Inventory sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Value
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${stats.totalValue.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Low Stock Items
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {stats.lowStockItems}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Warning sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Out of Stock
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {stats.outOfStockItems}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Error sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Inventory Overview
            </Typography>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Warning />}
                sx={{ mb: 2 }}
                onClick={() => setSelectedStatus('low_stock')}
              >
                View Low Stock Items
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Error />}
                sx={{ mb: 2 }}
                onClick={() => setSelectedStatus('out_of_stock')}
              >
                View Out of Stock
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Category />}
                onClick={() => setSelectedCategory('all')}
              >
                View All Categories
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="in_stock">In Stock</MenuItem>
                <MenuItem value="low_stock">Low Stock</MenuItem>
                <MenuItem value="out_of_stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Inventory Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.sku} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={item.quantity <= item.minQuantity ? 'error.main' : 'inherit'}
                        fontWeight="bold"
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{getStatusChip(item.status)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Item">
                          <IconButton size="small" color="primary" onClick={() => handleEditItem(item)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Item">
                          <IconButton size="small" color="error" onClick={() => handleDeleteItem(item.id)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredInventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      {/* Add/Edit Item Dialog */}
      <InventoryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveItem}
        item={editingItem}
        categories={categories}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Inventory Dialog Component
const InventoryDialog = ({ open, onClose, onSave, item, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    minQuantity: '',
    price: '',
    supplier: '',
    location: '',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        quantity: '',
        minQuantity: '',
        price: '',
        supplier: '',
        location: '',
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Quantity"
                type="number"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {item ? 'Update' : 'Add'} Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InventoryPage;
export { Login, Signup };
