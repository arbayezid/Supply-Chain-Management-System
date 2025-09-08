import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  LinearProgress,
  Rating,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory,
  ShoppingCart,
  People,
  Business,
  LocalShipping,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Notifications,
  Warning,
  CheckCircle,
  Error,
  Visibility,
  Add,
  Assessment,
  Timeline,
  Speed,
  LocationOn,
  Schedule,
  Star,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';

// A custom hook for more granular breakpoint checking
const useBreakpoints = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  return { isXs, isSm, isMd, isLg };
};

const Dashboard = () => {
  const theme = useTheme();
  const { isXs, isSm, isMd, isLg } = useBreakpoints();

  // Mock data remains the same
  const dashboardData = {
    inventory: {
      total: 1247,
      lowStock: 23,
      outOfStock: 5,
      healthy: 1219,
    },
    orders: {
      total: 156,
      pending: 12,
      processing: 8,
      shipped: 89,
      delivered: 47,
    },
    suppliers: {
      total: 45,
      active: 42,
      underReview: 2,
      inactive: 1,
    },
    shipments: {
      inTransit: 23,
      delivered: 89,
      delayed: 3,
      onTime: 86,
    },
    revenue: {
      currentMonth: 125000,
      previousMonth: 118000,
      growth: 5.9,
      target: 150000,
    },
    customers: {
      total: 234,
      new: 12,
      returning: 222,
      satisfaction: 4.6,
    },
  };

  // Chart configurations with responsive adjustments
  const supplyChainChartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: (value) => `${value}K`,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 5,
    },
    tooltip: {
      theme: theme.palette.mode,
    },
    legend: {
        position: isXs ? 'bottom' : 'top',
    }
  };

  const supplyChainChartSeries = [
    {
      name: 'Orders',
      data: [31, 40, 28, 51, 42, 109],
    },
    {
      name: 'Shipments',
      data: [11, 32, 45, 32, 34, 52],
    },
  ];

  const inventoryChartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: ['Healthy Stock', 'Low Stock', 'Out of Stock'],
    colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Items',
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
  };

  const inventoryChartSeries = [
    dashboardData.inventory.healthy,
    dashboardData.inventory.lowStock,
    dashboardData.inventory.outOfStock,
  ];

  const StatCard = ({ title, value, subtitle, icon, color, trend, trendValue }) => (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography 
              color="textSecondary" 
              gutterBottom 
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Typography 
              variant={isXs ? "h5" : "h4"}
              fontWeight="bold" 
              color={color}
            >
              {value}
            </Typography>
            {subtitle && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                {trend === 'up' && <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />}
                {trend === 'down' && <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />}
                {trendValue && (
                  <Typography variant="caption" sx={{ color: trend === 'up' ? 'success.main' : 'error.main' }}>
                    {trendValue}
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">{subtitle}</Typography>
              </Stack>
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

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            p: 2,
            display: 'inline-flex',
            mb: 2,
          }}
        >
          {React.cloneElement(icon, { sx: { color: 'white', fontSize: 28 } })}
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const AlertItem = ({ type, message, time, priority }) => {
    const icons = {
      success: <CheckCircle color="success" />,
      warning: <Warning color="warning" />,
      error: <Error color="error" />,
      info: <Notifications color="info" />,
    };

    return (
      <ListItem sx={{ px: 0, py: 1.5 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>{icons[type] || <Notifications />}</ListItemIcon>
        <ListItemText
          primary={message}
          secondary={time}
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: priority === 'high' ? 'bold' : 'normal',
          }}
        />
        {priority === 'high' && (
          <Chip label="High" size="small" color="error" variant="outlined" sx={{ ml: 1 }} />
        )}
      </ListItem>
    );
  };

  return (
    // FIX 1: Constrain the max width to 'lg' to prevent excessive stretching.
    <Container maxWidth="lg" disableGutters sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant={isXs ? "h5" : "h4"}
          fontWeight="bold" 
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          Supply Chain Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary"
        >
          Real-time insights into your supply chain operations.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {/* FIX 2: Use fractional values like 2.4 to create a 5-column layout on large screens, preventing gaps. */}
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total Inventory"
            value={dashboardData.inventory.total.toLocaleString()}
            subtitle="items"
            icon={<Inventory />}
            color="primary.main"
            trend="up"
            trendValue="+2.3%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Active Orders"
            value={dashboardData.orders.total}
            subtitle="this month"
            icon={<ShoppingCart />}
            color="secondary.main"
            trend="up"
            trendValue="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Total Suppliers"
            value={dashboardData.suppliers.total}
            subtitle="partners"
            icon={<Business />}
            color="success.main"
            trend="up"
            trendValue="+5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="In Transit"
            value={dashboardData.shipments.inTransit}
            subtitle="shipments"
            icon={<LocalShipping />}
            color="info.main"
            trend="down"
            trendValue="-3%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Monthly Revenue"
            value={`$${dashboardData.revenue.currentMonth.toLocaleString()}`}
            subtitle="this month"
            icon={<AttachMoney />}
            color="warning.main"
            trend="up"
            trendValue="+5.9%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <StatCard
            title="Customers"
            value={dashboardData.customers.total}
            subtitle="total"
            icon={<People />}
            color="#6e4b95" // Custom color example
            trend="up"
            trendValue="+8%"
          />
        </Grid>
      </Grid>
      
      {/* Quick Actions */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Apply the same lg={2.4} fix here for consistency */}
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="Add Item" description="New inventory" icon={<Add />} color="primary.main" />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="New Order" description="Create order" icon={<ShoppingCart />} color="secondary.main" />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="Add Supplier" description="New partner" icon={<Business />} color="success.main" />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="Track" description="Find shipment" icon={<LocationOn />} color="info.main" />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="Reports" description="View analytics" icon={<Assessment />} color="warning.main" />
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2.4}>
                <QuickActionCard title="Performance" description="Check KPIs" icon={<Timeline />} color="error.main" />
            </Grid>
        </Grid>
      </Box>

      {/* Charts & Details */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Supply Chain Overview</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Monthly orders vs. shipments</Typography>
              <Box sx={{ height: 350 }}>
                <ReactApexChart options={supplyChainChartOptions} series={supplyChainChartSeries} type="area" height="100%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Inventory Status</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Stock distribution</Typography>
              <Box sx={{ height: 350 }}>
                <ReactApexChart options={inventoryChartOptions} series={inventoryChartSeries} type="donut" height="100%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Order Status Breakdown</Typography>
                    <Stack spacing={2}>
                        {[
                            { label: 'Pending', value: dashboardData.orders.pending, percent: '7.7%', color: 'warning' },
                            { label: 'Processing', value: dashboardData.orders.processing, percent: '5.1%', color: 'info' },
                            { label: 'Shipped', value: dashboardData.orders.shipped, percent: '57.1%', color: 'primary' },
                            { label: 'Delivered', value: dashboardData.orders.delivered, percent: '30.1%', color: 'success' },
                        ].map(item => (
                            <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2">{item.label}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">{item.value}</Typography>
                                    <Chip label={item.percent} size="small" color={item.color} variant="outlined" />
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={6}>
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Performance Metrics</Typography>
                     <Stack spacing={3}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">On-Time Delivery</Typography>
                                <Typography variant="body2" fontWeight="bold">{dashboardData.shipments.onTime}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={dashboardData.shipments.onTime} color="success" sx={{ height: 8, borderRadius: 4 }} />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Customer Satisfaction</Typography>
                                <Typography variant="body2" fontWeight="bold">{dashboardData.customers.satisfaction}/5.0</Typography>
                            </Box>
                            <Rating value={dashboardData.customers.satisfaction} readOnly precision={0.1} size="small" />
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Activity & Alerts</Typography>
                    <List disablePadding>
                        <AlertItem type="success" message="Order #12345 delivered successfully" time="2m ago" />
                        <Divider />
                        <AlertItem type="warning" message="Low stock: Product XYZ has 5 items left" time="15m ago" priority="high" />
                        <Divider />
                        <AlertItem type="info" message="New supplier 'TechCorp' registered" time="1h ago" />
                        <Divider />
                        <AlertItem type="error" message="Shipment #789 delayed (weather)" time="3h ago" priority="high" />
                    </List>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;