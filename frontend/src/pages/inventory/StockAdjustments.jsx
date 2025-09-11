import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Grid } from "@mui/material";

const StockAdjustment = () => {
  const [items, setItems] = useState([]);
  const stompClient = useRef(null);

  const fetchData = () => {
    axios.get("/api/items")
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  };

  useEffect(() => {
    fetchData();

    stompClient.current = new Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        stompClient.current.subscribe("/topic/inventory", () => {
          fetchData();
        });
      },
    });
    stompClient.current.activate();

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
  }, []);

  const handleAdjust = (id, newQuantity) => {
    axios.patch(`/api/items/${id}/adjust`, { quantity: newQuantity });
  };

  return (
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
            {items.map((adj, idx) => (
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
};

export default StockAdjustment;