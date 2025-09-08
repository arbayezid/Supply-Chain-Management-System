import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';

const Revenue = () => {
  const theme = useTheme();
  const [revenueData] = useState({
    monthly: [31000, 40000, 28000, 51000, 42000, 109000, 95000, 87000, 120000, 98000, 110000, 125000],
    categories: ['Electronics', 'Clothing', 'Food', 'Home & Garden', 'Sports'],
    categoryRevenue: [45000, 32000, 28000, 22000, 18000],
    topProducts: [
      { name: 'Laptop Pro X1', revenue: 12500, growth: 15.2 },
      { name: 'Wireless Headphones', revenue: 8900, growth: 8.7 },
      { name: 'Smart Watch', revenue: 7200, growth: 22.1 },
      { name: 'Gaming Mouse', revenue: 6800, growth: -3.2 },
      { name: 'USB-C Cable', revenue: 5200, growth: 12.5 },
    ],
  });

  // Monthly Revenue Chart
  const monthlyChartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: [theme.palette.primary.main],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
        style: { colors: theme.palette.text.secondary },
      },
    },
    tooltip: {
      y: { formatter: (value) => `$${value.toLocaleString()}` },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 5,
    },
  };

  const monthlyChartSeries = [
    {
      name: 'Monthly Revenue',
      data: revenueData.monthly,
    },
  ];

  // Category Revenue Chart
  const categoryChartOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: revenueData.categories,
    plotOptions: {
      pie: {
        donut: { size: '60%' },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: theme.palette.text.primary },
    },
  };

  const categoryChartSeries = revenueData.categoryRevenue;

  // Key Metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$1,234,567',
      change: 23.5,
      icon: <AttachMoney />,
      color: theme.palette.success.main,
    },
    {
      title: 'Monthly Growth',
      value: '+15.3%',
      change: 15.3,
      icon: <TrendingUp />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Average Order Value',
      value: '$156.78',
      change: 8.7,
      icon: <ShoppingCart />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Customer Lifetime Value',
      value: '$2,450',
      change: 12.1,
      icon: <People />,
      color: theme.palette.warning.main,
    },
  ];

  const StatCard = ({ title, value, change, icon, color }) => {
    const isPositive = change >= 0;
    
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {isPositive ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                )}
                <Typography
                  variant="body2"
                  color={isPositive ? 'success.main' : 'error.main'}
                  sx={{ fontWeight: 600 }}
                >
                  {Math.abs(change)}%
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                  vs last month
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '50%',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.cloneElement(icon, { sx: { color: 'white' } })}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Revenue Analytics
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Track your financial performance and revenue growth
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...metric} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Monthly Revenue Trend */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Monthly Revenue Trend
            </Typography>
            <ReactApexChart
              options={monthlyChartOptions}
              series={monthlyChartSeries}
              type="area"
              height={300}
            />
          </Paper>
        </Grid>

        {/* Category Revenue Distribution */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Revenue by Category
            </Typography>
            <ReactApexChart
              options={categoryChartOptions}
              series={categoryChartSeries}
              type="donut"
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Top Performing Products */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Top Performing Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Growth</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenueData.topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          ${product.revenue.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${product.growth > 0 ? '+' : ''}${product.growth}%`}
                          color={product.growth > 0 ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={product.growth > 0 ? 'Growing' : 'Declining'}
                          color={product.growth > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Revenue Insights */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Revenue Insights
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: 'Best Month', value: 'December', amount: '$125,000' },
                { label: 'Worst Month', value: 'March', amount: '$28,000' },
                { label: 'Average Monthly', value: 'Revenue', amount: '$82,880' },
                { label: 'Growth Rate', value: 'Year over Year', amount: '+23.5%' },
              ].map((insight, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      {insight.label}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {insight.value}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    {insight.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Revenue;
