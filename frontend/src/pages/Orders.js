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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  ShoppingCart,
  CheckCircle,
  Schedule,
  LocalShipping,
  Payment,
  Visibility,
  Print,
  Email,
  ExpandMore,
  Person,
  Phone,
  LocationOn,
  AttachMoney,
  Inventory,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { Link as RouterLink } from 'react-router-dom';

const Orders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data
  const mockOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      customerPhone: '+1-555-0123',
      items: [
        { name: 'Laptop Charger', quantity: 2, price: 29.99, sku: 'LAP-CHG-001' },
        { name: 'Wireless Mouse', quantity: 1, price: 19.99, sku: 'WRL-MSE-002' },
      ],
      totalAmount: 79.97,
      status: 'pending',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-20',
      shippingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      notes: 'Please deliver during business hours',
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      customerPhone: '+1-555-0456',
      items: [
        { name: 'Office Chair', quantity: 1, price: 199.99, sku: 'OFF-CHR-004' },
      ],
      totalAmount: 199.99,
      status: 'processing',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-25',
      shippingAddress: '456 Oak Ave, City, State 12345',
      paymentMethod: 'PayPal',
      paymentStatus: 'paid',
      notes: 'White color preferred',
    },
    {
      id: 'ORD-003',
      customerName: 'Bob Johnson',
      customerEmail: 'bob.johnson@email.com',
      customerPhone: '+1-555-0789',
      items: [
        { name: 'USB Cable', quantity: 5, price: 9.99, sku: 'USB-CBL-003' },
        { name: 'Desk Lamp', quantity: 1, price: 49.99, sku: 'DSK-LMP-005' },
      ],
      totalAmount: 99.94,
      status: 'shipped',
      orderDate: '2024-01-13',
      expectedDelivery: '2024-01-18',
      shippingAddress: '789 Pine Rd, City, State 12345',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      notes: 'Gift wrapping requested',
    },
    {
      id: 'ORD-004',
      customerName: 'Alice Brown',
      customerEmail: 'alice.brown@email.com',
      customerPhone: '+1-555-0321',
      items: [
        { name: 'Laptop Charger', quantity: 1, price: 29.99, sku: 'LAP-CHG-001' },
      ],
      totalAmount: 29.99,
      status: 'delivered',
      orderDate: '2024-01-12',
      deliveredDate: '2024-01-16',
      shippingAddress: '321 Elm St, City, State 12345',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      notes: '',
    },
  ];

  const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown'];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  useEffect(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, selectedStatus, selectedCustomer, orders]);

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    if (selectedCustomer !== 'all') {
      filtered = filtered.filter(order => order.customerName === selectedCustomer);
    }

    setFilteredOrders(filtered);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', label: 'Pending', icon: <Schedule /> },
      processing: { color: 'info', label: 'Processing', icon: <ShoppingCart /> },
      shipped: { color: 'primary', label: 'Shipped', icon: <LocalShipping /> },
      delivered: { color: 'success', label: 'Delivered', icon: <CheckCircle /> },
      cancelled: { color: 'error', label: 'Cancelled', icon: <Delete /> },
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

  const getPaymentStatusChip = (status) => {
    return (
      <Chip
        label={status === 'paid' ? 'Paid' : 'Pending'}
        color={status === 'paid' ? 'success' : 'warning'}
        size="small"
        variant="outlined"
      />
    );
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setOpenDialog(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOpenDialog(true);
  };

  const handleDeleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
    setSnackbar({
      open: true,
      message: 'Order deleted successfully',
      severity: 'success'
    });
  };

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      setOrders(prev => prev.map(order => 
        order.id === editingOrder.id ? { ...order, ...orderData } : order
      ));
      setSnackbar({
        open: true,
        message: 'Order updated successfully',
        severity: 'success'
      });
    } else {
      const newOrder = {
        ...orderData,
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        orderDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        paymentStatus: 'pending',
      };
      setOrders(prev => [...prev, newOrder]);
      setSnackbar({
        open: true,
        message: 'Order created successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const processingOrders = orders.filter(order => order.status === 'processing').length;
    const shippedOrders = orders.filter(order => order.status === 'shipped').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

    return { totalOrders, totalRevenue, pendingOrders, processingOrders, shippedOrders, deliveredOrders };
  };

  const stats = getOrderStats();

  // Chart options for order status distribution
  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
    },
    colors: [
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.primary.main,
      theme.palette.success.main,
    ],
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    plotOptions: {
      pie: { donut: { size: '70%' } },
    },
    dataLabels: { enabled: false },
  };

  const chartSeries = [
    stats.pendingOrders,
    stats.processingOrders,
    stats.shippedOrders,
    stats.deliveredOrders,
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Order Management
        </Typography>
        <Button
          component={RouterLink}
          to="/orders/new"
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add Item
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalOrders}
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
                  <ShoppingCart sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${stats.totalRevenue.toLocaleString()}
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

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Pending
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {stats.pendingOrders}
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
                  <Schedule sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Processing
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {stats.processingOrders}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.info.main,
                    borderRadius: '50%',
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Shipped
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {stats.shippedOrders}
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
                  <LocalShipping sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Delivered
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.deliveredOrders}
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
                  <CheckCircle sx={{ color: 'white' }} />
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
              Order Status Distribution
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
                startIcon={<Schedule />}
                sx={{ mb: 2 }}
                onClick={() => setSelectedStatus('pending')}
              >
                View Pending Orders
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ShoppingCart />}
                sx={{ mb: 2 }}
                onClick={() => setSelectedStatus('processing')}
              >
                View Processing Orders
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocalShipping />}
                onClick={() => setSelectedStatus('shipped')}
              >
                View Shipped Orders
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
              placeholder="Search orders..."
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
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Customer</InputLabel>
              <Select
                value={selectedCustomer}
                label="Customer"
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <MenuItem value="all">All Customers</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer} value={customer}>
                    {customer}
                  </MenuItem>
                ))}
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
                setSelectedStatus('all');
                setSelectedCustomer('all');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Expected Delivery</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.items.map(item => item.name).join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        ${order.totalAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(order.status)}</TableCell>
                    <TableCell>{getPaymentStatusChip(order.paymentStatus)}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.expectedDelivery}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Order">
                          <IconButton size="small" color="primary" onClick={() => handleEditOrder(order)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Print Invoice">
                          <IconButton size="small" color="primary">
                            <Print />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                          <IconButton size="small" color="error" onClick={() => handleDeleteOrder(order.id)}>
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
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      {/* Add/Edit Order Dialog */}
      <OrderDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveOrder}
        order={editingOrder}
        customers={customers}
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

// Order Dialog Component
const OrderDialog = ({ open, onClose, onSave, order, customers }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [{ name: '', quantity: 1, price: 0, sku: '' }],
    shippingAddress: '',
    paymentMethod: 'Credit Card',
    notes: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        items: order.items,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        notes: order.notes,
      });
    } else {
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        items: [{ name: '', quantity: 1, price: 0, sku: '' }],
        shippingAddress: '',
        paymentMethod: 'Credit Card',
        notes: '',
      });
    }
  }, [order]);

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0, sku: '' }]
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    onSave({ ...formData, totalAmount });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {order ? 'Edit Order' : 'Create New Order'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Email"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Phone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={formData.paymentMethod}
                  label="Payment Method"
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                >
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Shipping Address"
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                required
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            
            {/* Order Items */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              {formData.items.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Item Name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="SKU"
                        value={item.sku}
                        onChange={(e) => handleItemChange(index, 'sku', e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                        required
                        size="small"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemoveItem(index)}
                        disabled={formData.items.length === 1}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddItem}
                sx={{ mt: 1 }}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {order ? 'Update' : 'Create'} Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Orders;
