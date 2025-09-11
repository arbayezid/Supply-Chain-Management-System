import React from 'react';
import {
  Box, Typography, Paper, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Divider
} from '@mui/material';

const Invoice = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxRate = 0.05; // উদাহরণস্বরূপ 5% ট্যাক্স
  const tax = subtotal * taxRate;
  const shipping = 10.00; // উদাহরণস্বরূপ ফ্ল্যাট শিপিং রেট
  const total = subtotal + tax + shipping;

  return (
    <Box ref={ref} sx={{ p: 4, width: '210mm', minHeight: '297mm', margin: 'auto' }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Grid item>
            <Typography variant="h4" fontWeight="bold" color="primary">INVOICE</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Supply Chain Co.</Typography>
            <Typography variant="body2">123 Business Rd, Dhaka</Typography>
            <Typography variant="body2">contact@supplychain.com</Typography>
          </Grid>
        </Grid>

        {/* Order Details */}
        <Grid container justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">BILL TO</Typography>
            <Typography fontWeight="bold">{order.customerName}</Typography>
            <Typography>{order.shippingAddress}</Typography>
            <Typography>{order.customerEmail}</Typography>
            <Typography>{order.customerPhone}</Typography>
          </Grid>
          <Grid item sx={{ textAlign: 'right' }}>
            <Typography><strong>Invoice #:</strong> {order.id}</Typography>
            <Typography><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Items Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Description</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="caption" color="textSecondary">SKU: {item.sku}</Typography>
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        {/* Totals */}
        <Grid container justifyContent="flex-end">
          <Grid item xs={6} md={4}>
            <Box sx={{ pr: 2 }}>
              <Grid container justifyContent="space-between"><Typography>Subtotal:</Typography><Typography>${subtotal.toFixed(2)}</Typography></Grid>
              <Grid container justifyContent="space-between"><Typography>Tax ({(taxRate * 100).toFixed(0)}%):</Typography><Typography>${tax.toFixed(2)}</Typography></Grid>
              <Grid container justifyContent="space-between"><Typography>Shipping:</Typography><Typography>${shipping.toFixed(2)}</Typography></Grid>
              <Divider sx={{ my: 1 }} />
              <Grid container justifyContent="space-between"><Typography variant="h6" fontWeight="bold">Total:</Typography><Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography></Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2">Thank you for your business!</Typography>
        </Box>
      </Paper>
    </Box>
  );
});

export default Invoice;