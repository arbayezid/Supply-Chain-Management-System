import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Paper, Button, TextField, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, Select, MenuItem, Alert, Snackbar, useTheme, InputAdornment, Tooltip
} from '@mui/material';
import {
  Add, Edit, Delete, Search, FilterList, ShoppingCart, CheckCircle,
  Schedule, LocalShipping, Print, Visibility, TrendingUp
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const Orders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]); // <-- API থেকে আসা আসল ডেটা এখানে থাকবে
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // --- ডাটাবেস থেকে আসল ডেটা আনার ফাংশন ---
  const fetchOrders = useCallback(() => {
    setLoading(true);
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders data:", error);
        setSnackbar({ open: true, message: 'Failed to load orders data.', severity: 'error' });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  // --- ফিল্টারিং লজিক (অপরিবর্তিত) ---
  const filterOrders = useCallback(() => {
    let filtered = orders;
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter(order => order.customerName === selectedCustomer);
    }
    setFilteredOrders(filtered);
  }, [searchTerm, selectedStatus, selectedCustomer, orders]);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, selectedStatus, selectedCustomer, orders, filterOrders]);

  // --- স্ট্যাটাস চিপ (অপরিবর্তিত) ---
  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', label: 'Pending', icon: <Schedule /> },
      processing: { color: 'info', label: 'Processing', icon: <ShoppingCart /> },
      shipped: { color: 'primary', label: 'Shipped', icon: <LocalShipping /> },
      delivered: { color: 'success', label: 'Delivered', icon: <CheckCircle /> },
      cancelled: { color: 'error', label: 'Cancelled', icon: <Delete /> },
    };
    const config = statusConfig[status] || { color: 'default', label: status, icon: null };
    return <Chip icon={config.icon} label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  const getPaymentStatusChip = (status) => (
    <Chip label={status === 'paid' ? 'Paid' : 'Pending'} color={status === 'paid' ? 'success' : 'warning'} size="small" variant="outlined" />
  );

  const handleAddOrder = () => {
    setEditingOrder(null);
    setOpenDialog(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOpenDialog(true);
  };

  // --- API ব্যবহার করে ডিলিট ---
  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios.delete(`/api/orders/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: 'Order deleted successfully', severity: 'success' });
          fetchOrders();
        })
        .catch(error => {
          console.error("Error deleting order:", error);
          setSnackbar({ open: true, message: 'Failed to delete order.', severity: 'error' });
        });
    }
  };

  // --- API ব্যবহার করে সেভ বা আপডেট ---
  const handleSaveOrder = (orderData) => {
    const request = editingOrder
      ? axios.put(`/api/orders/${editingOrder.id}`, orderData)
      : axios.post('/api/orders', orderData);

    request
      .then(() => {
        setSnackbar({ open: true, message: `Order ${editingOrder ? 'updated' : 'created'} successfully`, severity: 'success' });
        fetchOrders();
      })
      .catch(error => {
        console.error("Error saving order:", error);
        setSnackbar({ open: true, message: 'Failed to save order.', severity: 'error' });
      })
      .finally(() => setOpenDialog(false));
  };
  
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    processingOrders: orders.filter(order => order.status === 'processing').length,
    shippedOrders: orders.filter(order => order.status === 'shipped').length,
    deliveredOrders: orders.filter(order => order.status === 'delivered').length,
  };

  const customers = [...new Set(orders.map(order => order.customerName))];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const chartOptions = {
    chart: { type: 'donut', toolbar: { show: false } },
    colors: [ theme.palette.warning.main, theme.palette.info.main, theme.palette.primary.main, theme.palette.success.main ],
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    plotOptions: { pie: { donut: { size: '70%' } } },
    dataLabels: { enabled: false },
    legend: { position: 'right' }
  };
  const chartSeries = [ stats.pendingOrders, stats.processingOrders, stats.shippedOrders, stats.deliveredOrders ];

  if (loading) return <Typography sx={{ p: 3 }}>Loading orders...</Typography>;
  
  return (
    <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight="bold">Order Management</Typography>
            {/* "Add Item" লেখাটিকে "Add Order"-এ পরিবর্তন করা হলো */}
            <Button onClick={handleAddOrder} variant="contained" startIcon={<Add />} sx={{ borderRadius: 2 }}>Add Order</Button>
        </Box>

        {/* Statistics Cards (ডিজাইন অপরিবর্তিত) */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Total Orders</Typography><Typography variant="h4" fontWeight="bold">{stats.totalOrders}</Typography></Box></CardContent></Card></Grid>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Total Revenue</Typography><Typography variant="h4" fontWeight="bold">${stats.totalRevenue.toLocaleString()}</Typography></Box></CardContent></Card></Grid>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Pending</Typography><Typography variant="h4" fontWeight="bold" color="warning.main">{stats.pendingOrders}</Typography></Box></CardContent></Card></Grid>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Processing</Typography><Typography variant="h4" fontWeight="bold" color="info.main">{stats.processingOrders}</Typography></Box></CardContent></Card></Grid>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Shipped</Typography><Typography variant="h4" fontWeight="bold" color="primary.main">{stats.shippedOrders}</Typography></Box></CardContent></Card></Grid>
            <Grid item xs={12} sm={6} md={2}><Card><CardContent><Box><Typography color="textSecondary" variant="body2">Delivered</Typography><Typography variant="h4" fontWeight="bold" color="success.main">{stats.deliveredOrders}</Typography></Box></CardContent></Card></Grid>
        </Grid>
        
        {/* Charts and Quick Actions (ডিজাইন অপরিবর্তিত) */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} lg={8}><Paper sx={{ p: 3 }}><Typography variant="h6" gutterBottom fontWeight="bold">Order Status Distribution</Typography><ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={300} /></Paper></Grid>
            <Grid item xs={12} lg={4}><Paper sx={{ p: 3 }}><Typography variant="h6" gutterBottom fontWeight="bold">Quick Actions</Typography><Box sx={{ mt: 2 }}><Button fullWidth variant="outlined" startIcon={<Schedule />} sx={{ mb: 2 }} onClick={() => setSelectedStatus('pending')}>View Pending Orders</Button><Button fullWidth variant="outlined" startIcon={<ShoppingCart />} sx={{ mb: 2 }} onClick={() => setSelectedStatus('processing')}>View Processing Orders</Button><Button fullWidth variant="outlined" startIcon={<LocalShipping />} onClick={() => setSelectedStatus('shipped')}>View Shipped Orders</Button></Box></Paper></Grid>
        </Grid>
        
        {/* Filters and Search (ডিজাইন অপরিবর্তিত) */}
        <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}><TextField fullWidth placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} /></Grid>
                <Grid item xs={12} md={3}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}><MenuItem value="all">All Statuses</MenuItem>{statuses.map((status) => (<MenuItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} md={3}><FormControl fullWidth><InputLabel>Customer</InputLabel><Select value={selectedCustomer} label="Customer" onChange={(e) => setSelectedCustomer(e.target.value)}><MenuItem value="all">All Customers</MenuItem>{customers.map((customer) => (<MenuItem key={customer} value={customer}>{customer}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} md={2}><Button fullWidth variant="outlined" startIcon={<FilterList />} onClick={() => { setSearchTerm(''); setSelectedStatus('all'); setSelectedCustomer('all'); }}>Clear Filters</Button></Grid>
            </Grid>
        </Paper>

        {/* Orders Table (ডিজাইন অপরিবর্তিত) */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead><TableRow><TableCell>Order ID</TableCell><TableCell>Customer</TableCell><TableCell>Items</TableCell><TableCell>Total Amount</TableCell><TableCell>Status</TableCell><TableCell>Payment Status</TableCell><TableCell>Order Date</TableCell><TableCell>Expected Delivery</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
                    <TableBody>
                        {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell><Typography variant="body2" fontWeight="bold">{order.id}</Typography></TableCell>
                                <TableCell><Box><Typography variant="body2" fontWeight="bold">{order.customerName}</Typography><Typography variant="caption" color="textSecondary">{order.customerEmail}</Typography></Box></TableCell>
                                <TableCell><Typography variant="body2">{(order.items || []).length} item{(order.items || []).length !== 1 ? 's' : ''}</Typography><Typography variant="caption" color="textSecondary">{(order.items || []).map(item => item.name).join(', ')}</Typography></TableCell>
                                <TableCell><Typography variant="body2" fontWeight="bold">${(order.totalAmount || 0).toFixed(2)}</Typography></TableCell>
                                <TableCell>{getStatusChip(order.status)}</TableCell>
                                <TableCell>{getPaymentStatusChip(order.paymentStatus)}</TableCell>
                                <TableCell>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell>{order.expectedDelivery ? new Date(order.expectedDelivery).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell><Box sx={{ display: 'flex', gap: 1 }}><Tooltip title="View Details"><IconButton size="small" color="primary"><Visibility /></IconButton></Tooltip><Tooltip title="Edit Order"><IconButton size="small" color="primary" onClick={() => handleEditOrder(order)}><Edit /></IconButton></Tooltip><Tooltip title="Print Invoice"><IconButton size="small" color="primary"><Print /></IconButton></Tooltip><Tooltip title="Delete Order"><IconButton size="small" color="error" onClick={() => handleDeleteOrder(order.id)}><Delete /></IconButton></Tooltip></Box></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredOrders.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage) => setPage(newPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
        </Paper>

        <OrderDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveOrder} order={editingOrder} customers={customers} />
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert></Snackbar>
    </Box>
  );
};

// --- Order Dialog Component (ডিজাইন অপরিবর্তিত) ---
const OrderDialog = ({ open, onClose, onSave, order, customers }) => {
  const [formData, setFormData] = useState({ customerName: '', customerEmail: '', customerPhone: '', items: [{ name: '', quantity: 1, price: 0, sku: '' }], shippingAddress: '', paymentMethod: 'Credit Card', notes: '' });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || '',
        customerEmail: order.customerEmail || '',
        customerPhone: order.customerPhone || '',
        items: order.items || [{ name: '', quantity: 1, price: 0, sku: '' }],
        shippingAddress: order.shippingAddress || '',
        paymentMethod: order.paymentMethod || 'Credit Card',
        notes: order.notes || '',
      });
    } else {
      setFormData({ customerName: '', customerEmail: '', customerPhone: '', items: [{ name: '', quantity: 1, price: 0, sku: '' }], shippingAddress: '', paymentMethod: 'Credit Card', notes: '' });
    }
  }, [order]);

  const handleAddItem = () => setFormData(prev => ({ ...prev, items: [...prev.items, { name: '', quantity: 1, price: 0, sku: '' }] }));
  const handleRemoveItem = (index) => setFormData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  const handleItemChange = (index, field, value) => setFormData(prev => ({ ...prev, items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0);
    onSave({ ...formData, totalAmount });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{order ? 'Edit Order' : 'Create New Order'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Customer Name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} required margin="normal" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Customer Email" type="email" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} required margin="normal" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Customer Phone" value={formData.customerPhone} onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })} required margin="normal" /></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth margin="normal"><InputLabel>Payment Method</InputLabel><Select value={formData.paymentMethod} label="Payment Method" onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}><MenuItem value="Credit Card">Credit Card</MenuItem><MenuItem value="PayPal">PayPal</MenuItem><MenuItem value="Bank Transfer">Bank Transfer</MenuItem><MenuItem value="Cash">Cash</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12}><TextField fullWidth label="Shipping Address" value={formData.shippingAddress} onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })} required margin="normal" multiline rows={2} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} margin="normal" multiline rows={2} /></Grid>
            <Grid item xs={12}><Typography variant="h6" gutterBottom>Order Items</Typography>
              {formData.items.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}><TextField fullWidth label="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} required size="small" /></Grid>
                    <Grid item xs={12} md={2}><TextField fullWidth label="SKU" value={item.sku} onChange={(e) => handleItemChange(index, 'sku', e.target.value)} size="small" /></Grid>
                    <Grid item xs={12} md={2}><TextField fullWidth label="Quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))} required size="small" /></Grid>
                    <Grid item xs={12} md={2}><TextField fullWidth label="Price" type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))} required size="small" InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
                    <Grid item xs={12} md={2}><Button variant="outlined" color="error" size="small" onClick={() => handleRemoveItem(index)} disabled={formData.items.length === 1}>Remove</Button></Grid>
                  </Grid>
                </Box>
              ))}
              <Button variant="outlined" startIcon={<Add />} onClick={handleAddItem} sx={{ mt: 1 }}>Add Item</Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained">{order ? 'Update' : 'Create'} Order</Button></DialogActions>
      </form>
    </Dialog>
  );
};

export default Orders;