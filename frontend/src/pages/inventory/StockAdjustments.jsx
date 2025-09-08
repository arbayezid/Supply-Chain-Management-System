import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Grid } from "@mui/material";

const adjustments = [
  { date: "2025-09-01", product: "Product A", type: "Add", qty: 20, note: "New shipment" },
  { date: "2025-09-02", product: "Product B", type: "Remove", qty: 5, note: "Damaged" },
];

const StockAdjustments = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Stock Adjustments</Typography>
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Add Adjustment</Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField label="Product" fullWidth required />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField label="Type" select SelectProps={{ native: true }} fullWidth required>
              <option value="Add">Add</option>
              <option value="Remove">Remove</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField label="Quantity" type="number" fullWidth required />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Note" fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>Add</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>Adjustment History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adjustments.map((adj, idx) => (
            <TableRow key={idx}>
              <TableCell>{adj.date}</TableCell>
              <TableCell>{adj.product}</TableCell>
              <TableCell>{adj.type}</TableCell>
              <TableCell>{adj.qty}</TableCell>
              <TableCell>{adj.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default StockAdjustments;