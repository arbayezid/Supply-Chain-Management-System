import React from 'react';
import {
  Box, Paper, Typography, Grid, Button, Divider, Avatar, List,
  ListItem, ListItemText, Tooltip, IconButton
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { HourglassTop, ArrowForward, Info, Cancel } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

// Sample Data updated to have 2 items in each order
const mockOrders = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        items: [
            { name: 'Laptop Charger', quantity: 1 },
            { name: 'Wireless Mouse', quantity: 1 }
        ],
        orderDate: '2025-09-09T10:00:00Z',
        status: 'pending',
        totalAmount: 79.97,
    },
    {
        id: 'ORD-005',
        customerName: 'Samantha Ray',
        items: [
            { name: 'Bluetooth Speaker', quantity: 1 },
            { name: 'Portable Power Bank', quantity: 1 } // Added a second item
        ],
        orderDate: '2025-09-08T14:30:00Z',
        status: 'pending',
        totalAmount: 165.00, // Updated total amount
    },
];

const PendingOrderCard = ({ order, onProcess }) => {
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const timeAgo = formatDistanceToNow(new Date(order.orderDate), { addSuffix: true });

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderRadius: '12px',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
                // Flex properties for equal height
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {/* Card Header */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 48, height: 48, mr: 2 }}>
                            {order.customerName.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>{order.customerName}</Typography>
                            <Typography variant="body2" color="text.secondary">Order ID: {order.id}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                     <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: { sm: 'flex-end'} }}>
                        <HourglassTop sx={{ fontSize: 16, mr: 0.5 }} />
                        Pending for {timeAgo}
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            {/* Card Body - This part will grow to fill space */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Items ({totalItems})</Typography>
                <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
                    {order.items.map(item => (
                        <ListItem key={item.name} disableGutters>
                            <ListItemText
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider sx={{ mt: 2 }} />

            {/* Card Footer */}
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Box>
                    <Tooltip title="View Details"><IconButton color="primary"><Info /></IconButton></Tooltip>
                    <Tooltip title="Cancel Order"><IconButton color="error"><Cancel /></IconButton></Tooltip>
                </Box>
                <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => onProcess && onProcess(order.id)}
                >
                    Process Order
                </Button>
            </Box>
        </Paper>
    );
};


const PendingOrders = ({ orders = mockOrders, onProcessOrder }) => {
    const pendingOrders = orders.filter(o => o.status === "pending");

    return (
        <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#f9f9f9' }}>
            <Box mb={4}>
                <Typography variant="h4" fontWeight={700}>Pending Orders</Typography>
                <Typography color="text.secondary">
                    You have {pendingOrders.length} order(s) waiting to be processed.
                </Typography>
            </Box>

            {pendingOrders.length === 0 ? (
                <Paper sx={{ textAlign: 'center', p: 5, borderRadius: '12px' }}>
                    <HourglassTop sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6">All Caught Up!</Typography>
                    <Typography color="text.secondary">There are no pending orders at the moment.</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {pendingOrders.map((order) => (
                        <Grid item xs={12} md={6} lg={4} key={order.id}>
                            <PendingOrderCard order={order} onProcess={onProcessOrder} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default PendingOrders;
