import React from "react";
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const sampleStock = [
  { name: "Product A", sku: "SKU001", stock: 120, category: "Electronics" },
  { name: "Product B", sku: "SKU002", stock: 15, category: "Apparel" },
  { name: "Product C", sku: "SKU003", stock: 0, category: "Accessories" },
];

const StockOverview = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Stock Overview</Typography>
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h3">120</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Stock Value</Typography>
          <Typography variant="h3">$50,000</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Low Stock Items</Typography>
          <Typography variant="h3" color="error">8</Typography>
        </Paper>
      </Grid>
    </Grid>
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>Recent Stock</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleStock.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default StockOverview;