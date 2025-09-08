import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const lowStockItems = [
  { name: "Product B", sku: "SKU002", stock: 3 },
  { name: "Product C", sku: "SKU003", stock: 0 },
];

const LowStockAlerts = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Low Stock Alerts</Typography>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lowStockItems.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>
                <Typography color={item.stock === 0 ? "error" : "warning.main"}>
                  {item.stock}
                </Typography>
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small" color="primary">Restock</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default LowStockAlerts;