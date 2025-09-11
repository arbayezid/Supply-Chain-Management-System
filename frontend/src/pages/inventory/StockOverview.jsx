import {React, 'useEffect', useState } from 'react';
import {
  Box, Typography, Paper, Grid, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@mui/material';
import axios from 'axios';

// --- ডিবাগিং এর জন্য এই লাইনগুলো সাময়িকভাবে কমেন্ট করা হলো ---
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// আপনার ফাইলের নাম InventoryPage হলে কম্পোনেন্টের নামও InventoryPage রাখুন
const StockOverview = () => {
  const [overview, setOverview] = useState(null);

  const fetchData = () => {
    axios.get("/api/items/stock-overview")
      .then(res => {
        // সফলভাবে ডেটা পেলে Console-এ লগ করবে
        console.log("Successfully fetched stock overview data:", res.data);
        setOverview(res.data);
      })
      .catch(err => {
        // *** মূল পরিবর্তন এখানে ***
        // API কল ব্যর্থ হলে বিস্তারিত এরর Console-এ দেখাবে
        console.error("API call failed to fetch stock overview:", err);
        setOverview(null);
      });
  };

  useEffect(() => {
    fetchData();

    // --- ডিবাগিং এর জন্য WebSocket কোডটুকু সাময়িকভাবে কমেন্ট করা হলো ---
    /*
    const client = new Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        console.log("WebSocket Connected!");
        client.subscribe("/topic/inventory", fetchData);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };
    */
  }, []);

  if (!overview) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Stock Overview</Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h3">{overview.totalProducts}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Stock Value</Typography>
            <Typography variant="h3">${overview.totalStockValue?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography variant="h3" color="error">{overview.lowStockCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>Recently Updated</Typography>
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
            {overview.recentStock && overview.recentStock.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default StockOverview;