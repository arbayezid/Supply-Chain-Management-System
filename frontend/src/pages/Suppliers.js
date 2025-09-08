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
  Rating,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Business,
  Star,
  TrendingUp,
  TrendingDown,
  Phone,
  Email,
  LocationOn,
  Visibility,
  Assessment,
  Description,
  Payment,
  Warning,
  CheckCircle,
  Error,
  AttachMoney,
  LocalShipping,
  Schedule,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';

const Suppliers = () => {
  const theme = useTheme();
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data
  const mockSuppliers = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      category: 'Electronics',
      contactPerson: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1-555-0101',
      address: '123 Tech Street, Silicon Valley, CA 94025',
      rating: 4.8,
      performance: 92,
      onTimeDelivery: 95,
      qualityScore: 94,
      costEffectiveness: 88,
      totalOrders: 156,
      totalSpent: 45678.90,
      contractStatus: 'active',
      contractEndDate: '2024-12-31',
      paymentTerms: 'Net 30',
      lastOrderDate: '2024-01-15',
      notes: 'Excellent supplier for electronic components. High quality and reliable delivery.',
    },
    {
      id: 2,
      name: 'OfficeFurniture Inc',
      category: 'Furniture',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@officefurniture.com',
      phone: '+1-555-0202',
      address: '456 Office Blvd, Business District, NY 10001',
      rating: 4.5,
      performance: 87,
      onTimeDelivery: 89,
      qualityScore: 91,
      costEffectiveness: 85,
      totalOrders: 89,
      totalSpent: 23456.78,
      contractStatus: 'active',
      contractEndDate: '2024-08-15',
      paymentTerms: 'Net 45',
      lastOrderDate: '2024-01-10',
      notes: 'Good quality furniture at competitive prices. Slightly longer delivery times.',
    },
  ];

  const categories = ['Electronics', 'Furniture', 'Lighting', 'Logistics', 'Packaging', 'Raw Materials'];
  const ratings = ['excellent', 'good', 'average', 'poor'];

  useEffect(() => {
    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  }, []);

  useEffect(() => {
    filterSuppliers();
  }, [searchTerm, selectedCategory, selectedRating, suppliers]);

  const filterSuppliers = () => {
    let filtered = suppliers;

    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(supplier => supplier.category === selectedCategory);
    }

    if (selectedRating !== 'all') {
      filtered = filtered.filter(supplier => {
        const rating = supplier.rating;
        if (selectedRating === 'excellent') return rating >= 4.5;
        if (selectedRating === 'good') return rating >= 4.0 && rating < 4.5;
        if (selectedRating === 'average') return rating >= 3.5 && rating < 4.0;
        if (selectedRating === 'poor') return rating < 3.5;
        return true;
      });
    }

    setFilteredSuppliers(filtered);
  };

  const getRatingChip = (rating) => {
    let color = 'default';
    let label = 'Unknown';

    if (rating >= 4.5) {
      color = 'success';
      label = 'Excellent';
    } else if (rating >= 4.0) {
      color = 'primary';
      label = 'Good';
    } else if (rating >= 3.5) {
      color = 'warning';
      label = 'Average';
    } else {
      color = 'error';
      label = 'Poor';
    }

    return (
      <Chip
        icon={<Star />}
        label={label}
        color={color}
        size="small"
        variant="outlined"
      />
    );
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getContractStatusChip = (status) => {
    const statusConfig = {
      active: { color: 'success', label: 'Active', icon: <CheckCircle /> },
      review: { color: 'warning', label: 'Under Review', icon: <Schedule /> },
      expired: { color: 'error', label: 'Expired', icon: <Warning /> },
      pending: { color: 'info', label: 'Pending', icon: <Schedule /> },
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

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setOpenDialog(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setOpenDialog(true);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
    setSnackbar({
      open: true,
      message: 'Supplier deleted successfully',
      severity: 'success'
    });
  };

  const handleSaveSupplier = (supplierData) => {
    if (editingSupplier) {
      setSuppliers(prev => prev.map(supplier => 
        supplier.id === editingSupplier.id ? { ...supplier, ...supplierData } : supplier
      ));
      setSnackbar({
        open: true,
        message: 'Supplier updated successfully',
        severity: 'success'
      });
    } else {
      const newSupplier = {
        ...supplierData,
        id: Date.now(),
        rating: 0,
        performance: 0,
        onTimeDelivery: 0,
        qualityScore: 0,
        costEffectiveness: 0,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: '',
      };
      setSuppliers(prev => [...prev, newSupplier]);
      setSnackbar({
        open: true,
        message: 'Supplier added successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  const getSupplierStats = () => {
    const totalSuppliers = suppliers.length;
    const totalSpent = suppliers.reduce((sum, supplier) => sum + supplier.totalSpent, 0);
    const averageRating = suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length;
    const activeContracts = suppliers.filter(supplier => supplier.contractStatus === 'active').length;
    const excellentSuppliers = suppliers.filter(supplier => supplier.rating >= 4.5).length;
    const poorSuppliers = suppliers.filter(supplier => supplier.rating < 3.5).length;

    return { totalSuppliers, totalSpent, averageRating, activeContracts, excellentSuppliers, poorSuppliers };
  };

  const stats = getSupplierStats();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Supplier Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddSupplier}
          sx={{ borderRadius: 2 }}
        >
          Add Supplier
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
                    Total Suppliers
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalSuppliers}
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
                  <Business sx={{ color: 'white' }} />
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
                    Total Spent
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${stats.totalSpent.toLocaleString()}
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
                  <AttachMoney sx={{ color: 'white' }} />
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
                    Avg Rating
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.averageRating.toFixed(1)}
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
                  <Star sx={{ color: 'white' }} />
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
                    Active Contracts
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.activeContracts}
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
                  <Description sx={{ color: 'white' }} />
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
                    Excellent
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.excellentSuppliers}
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
                    Poor
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {stats.poorSuppliers}
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
                  <TrendingDown sx={{ color: 'white' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search suppliers..."
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
              <InputLabel>Rating</InputLabel>
              <Select
                value={selectedRating}
                label="Rating"
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <MenuItem value="all">All Ratings</MenuItem>
                <MenuItem value="excellent">Excellent (4.5+)</MenuItem>
                <MenuItem value="good">Good (4.0-4.4)</MenuItem>
                <MenuItem value="average">Average (3.5-3.9)</MenuItem>
                <MenuItem value="poor">Poor (&lt;3.5)</MenuItem>
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
                setSelectedRating('all');
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Suppliers Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Supplier</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Performance</TableCell>
                <TableCell>Total Orders</TableCell>
                <TableCell>Total Spent</TableCell>
                <TableCell>Contract Status</TableCell>
                <TableCell>Last Order</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplier) => (
                  <TableRow key={supplier.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {supplier.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {supplier.contactPerson}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={supplier.category} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getRatingChip(supplier.rating)}
                        <Typography variant="body2">
                          {supplier.rating}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={supplier.performance}
                            color={getPerformanceColor(supplier.performance)}
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" minWidth={30}>
                          {supplier.performance}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {supplier.totalOrders}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        ${supplier.totalSpent.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{getContractStatusChip(supplier.contractStatus)}</TableCell>
                    <TableCell>{supplier.lastOrderDate || 'N/A'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Supplier">
                          <IconButton size="small" color="primary" onClick={() => handleEditSupplier(supplier)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Performance Review">
                          <IconButton size="small" color="info">
                            <Assessment />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Supplier">
                          <IconButton size="small" color="error" onClick={() => handleDeleteSupplier(supplier.id)}>
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
          count={filteredSuppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

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

      {/* Add/Edit Supplier Dialog */}
      <SupplierDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveSupplier}
        supplier={editingSupplier}
        categories={categories}
      />
    </Box>
  );
};

// Supplier Dialog Component
const SupplierDialog = ({ open, onClose, onSave, supplier, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    contractStatus: 'pending',
    contractEndDate: '',
    paymentTerms: 'Net 30',
    notes: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        category: supplier.category,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        contractStatus: supplier.contractStatus,
        contractEndDate: supplier.contractEndDate,
        paymentTerms: supplier.paymentTerms,
        notes: supplier.notes,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        contractStatus: 'pending',
        contractEndDate: '',
        paymentTerms: 'Net 30',
        notes: '',
      });
    }
  }, [supplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {supplier ? 'Edit Supplier' : 'Add New Supplier'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                label="Contact Person"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Contract Status</InputLabel>
                <Select
                  value={formData.contractStatus}
                  label="Contract Status"
                  onChange={(e) => setFormData({ ...formData, contractStatus: e.target.value })}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="review">Under Review</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contract End Date"
                type="date"
                value={formData.contractEndDate}
                onChange={(e) => setFormData({ ...formData, contractEndDate: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Terms</InputLabel>
                <Select
                  value={formData.paymentTerms}
                  label="Payment Terms"
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                >
                  <MenuItem value="Net 15">Net 15</MenuItem>
                  <MenuItem value="Net 30">Net 30</MenuItem>
                  <MenuItem value="Net 45">Net 45</MenuItem>
                  <MenuItem value="Net 60">Net 60</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {supplier ? 'Update' : 'Add'} Supplier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Suppliers;
