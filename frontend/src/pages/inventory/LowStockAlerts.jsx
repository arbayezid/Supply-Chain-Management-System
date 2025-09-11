import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const LowStockAlerts = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const stompClient = useRef(null);

  const fetchData = () => {
    axios.get("/api/items/low-stock?threshold=5")
      .then(res => setLowStockItems(res.data))
      .catch(() => setLowStockItems([]));
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

  return (
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
              <TableRow key={item.id || item.sku}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku || item.id}</TableCell>
                <TableCell>
                  <Typography color={item.quantity === 0 ? "error" : "warning.main"}>
                    {item.quantity}
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
};

export default LowStockAlerts;