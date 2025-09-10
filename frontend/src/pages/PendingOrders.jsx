import React from "react";
import { Box, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import Orders from "./Orders";

const PendingOrders = ({ orders = [], onComplete }) => (
  <Box p={3}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Pending Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.filter(o => o.status === "pending").length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">No pending orders</TableCell>
            </TableRow>
          ) : (
            orders.filter(o => o.status === "pending").map((order, idx) => (
              <TableRow key={order.id || idx}>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items.map(i => i.name).join(", ")}</TableCell>
                <TableCell>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => onComplete && onComplete(order.id)}
                  >
                    Mark as Completed
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default PendingOrders;

// Example in your parent component or router
<PendingOrders orders={Orders} />