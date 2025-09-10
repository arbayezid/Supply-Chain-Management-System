import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Grid, Paper, TextField, InputAdornment, Button,
  Chip, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses,
  styled, Avatar, Divider, IconButton
} from '@mui/material';
import {
  Search, Check, LocalShipping, Route, Home, Receipt, Replay
} from '@mui/icons-material';

// Sample Data with product images
const mockOrdersWithImages = [
  {
    id: 'ORD-ALPHA-721',
    orderDate: '2025-08-25',
    totalAmount: 125.50,
    status: 'Delivered',
    deliveredDate: '2025-08-28',
    items: [
      { name: 'Wireless Earbuds', quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
      { name: 'Phone Case', quantity: 1, image: 'https://images.unsplash.com/photo-1592753054366-31c34a054a2a?w=100' },
    ],
  },
  {
    id: 'ORD-BETA-453',
    orderDate: '2025-09-01',
    totalAmount: 215.00,
    status: 'Shipped',
    expectedDelivery: '2025-09-05',
    items: [
      { name: 'Smart Watch', quantity: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100' },
    ],
  },
  {
    id: 'ORD-GAMMA-982',
    orderDate: '2025-09-03',
    totalAmount: 49.99,
    status: 'Processing',
    expectedDelivery: '2025-09-08',
    items: [
      { name: 'Coffee Mug', quantity: 2, image: 'https://images.unsplash.com/photo-1511920183353-3c9c35a96a55?w=100' },
    ],
  },
];

// Custom styled Stepper Connector
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIcon = (props) => {
  const { active, completed, className } = props;
  const icons = {
    1: <Check />,
    2: <LocalShipping />,
    3: <Route />,
    4: <Home />,
  };

  return (
    <Box
      ownerState={{ active }}
      className={className}
      sx={{
        backgroundColor: (theme) => (completed || active) ? theme.palette.success.main : theme.palette.grey[300],
        zIndex: 1,
        color: '#fff',
        width: 32,
        height: 32,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icons[String(props.icon)]}
    </Box>
  );
};


const OrderCard = ({ order }) => {
  const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const statusStepMap = {
    'Processing': 0,
    'Shipped': 1,
    'Out for Delivery': 2,
    'Delivered': 3,
  };
  const activeStep = statusStepMap[order.status] ?? 0;

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" fontWeight={700}>Order #{order.id}</Typography>
          <Typography variant="body2" color="text.secondary">Placed on {order.orderDate}</Typography>
        </Grid>
        <Grid item>
          <Chip label={order.status} color={order.status === 'Delivered' ? 'success' : 'info'} />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ my: 3 }}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          {order.items.map(item => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Avatar variant="rounded" src={item.image} sx={{ width: 56, height: 56, mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Typography variant="body2" color="text.secondary">Total Amount</Typography>
          <Typography variant="h5" fontWeight={700}>${order.totalAmount.toFixed(2)}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button startIcon={<Receipt />} variant="outlined" size="small" sx={{ mr: 1 }}>View Invoice</Button>
            <Button startIcon={<Replay />} variant="contained" size="small">Reorder</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}


const OrderHistory = ({ orders = mockOrdersWithImages }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, searchTerm]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} mb={1}>My Orders</Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Track your orders, view invoices, and reorder your favorite items.
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by Order ID or Product Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          sx: { borderRadius: '12px', mb: 4 }
        }}
      />

      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
      ) : (
        <Paper sx={{ textAlign: 'center', p: 5, borderRadius: '12px' }}>
          <Typography variant="h6">No orders found</Typography>
          <Typography color="text.secondary">Looks like you haven't placed any orders yet.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default OrderHistory;