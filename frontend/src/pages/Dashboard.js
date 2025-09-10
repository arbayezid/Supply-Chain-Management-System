import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  Chip,
  LinearProgress,
  Rating,
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  People,
  Business,
  LocalShipping,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Add,
  Assessment,
  Timeline,
  LocationOn,
  Schedule,
  Speed,
  CheckCircle,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/dashboard/summary')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Example chart data (you can fetch from backend if needed)
  const supplyChainChartOptions = {
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#1976d2', '#9c27b0'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 100] } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { labels: { formatter: (value) => `${value}K` } },
    grid: { borderColor: '#eee', strokeDashArray: 5 },
    legend: { position: 'top' }
  };
  const supplyChainChartSeries = [
    { name: 'Orders', data: [31, 40, 28, 51, 42, 109] },
    { name: 'Shipments', data: [11, 32, 45, 32, 34, 52] },
  ];

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>No data found</div>;

  // Example: If you want to show inventory chart, you can fetch inventory stats from backend and use here
  const inventoryChartOptions = {
    chart: { type: 'donut', toolbar: { show: false } },
    labels: ['Healthy Stock', 'Low Stock', 'Out of Stock'],
    colors: ['#2e7d32', '#ed6c02', '#d32f2f'],
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
    legend: { position: 'bottom', horizontalAlign: 'center' },
    plotOptions: { pie: { donut: { size: '60%', labels: { show: true, total: { show: true, label: 'Total Items' } } } } },
  };
  // Example static, replace with backend data if available
  const inventoryChartSeries = [stats.healthyStock || 0, stats.lowStock || 0, stats.outOfStock || 0];

  const StatCard = ({ title, value, subtitle, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">{subtitle}</Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { color: 'white', fontSize: 28 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" disableGutters sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
          Supply Chain Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Real-time insights into your supply chain operations.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            subtitle="orders"
            icon={<ShoppingCart />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            subtitle="revenue"
            icon={<AttachMoney />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Pending"
            value={stats.pendingOrders}
            subtitle="orders"
            icon={<Schedule />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Processing"
            value={stats.processingOrders}
            subtitle="orders"
            icon={<Speed />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Shipped"
            value={stats.shippedOrders}
            subtitle="orders"
            icon={<LocalShipping />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Delivered"
            value={stats.deliveredOrders}
            subtitle="orders"
            icon={<CheckCircle />}
            color="success.main"
          />
        </Grid>
      </Grid>

      {/* Example Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Supply Chain Overview</Typography>
              <Box sx={{ height: 350 }}>
                <ReactApexChart options={supplyChainChartOptions} series={supplyChainChartSeries} type="area" height="100%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Inventory Status</Typography>
              <Box sx={{ height: 350 }}>
                <ReactApexChart options={inventoryChartOptions} series={inventoryChartSeries} type="donut" height="100%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;