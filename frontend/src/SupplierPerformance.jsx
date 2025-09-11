import React from 'react';
import {
  Box, Paper, Typography, Grid, Card, CardContent, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, TableContainer, Avatar
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { Business, Assignment, StarBorder, Speed } from '@mui/icons-material';
import { blue, green, amber, red } from '@mui/material/colors';


// Sample data (remains the same)
const suppliers = [
  { name: "ABC Supplies", totalOrders: 120, onTimeDeliveries: 110, lateDeliveries: 10, qualityScore: 95, status: "Excellent" },
  { name: "Global Traders", totalOrders: 80, onTimeDeliveries: 60, lateDeliveries: 20, qualityScore: 82, status: "Good" },
  { name: "QuickParts", totalOrders: 60, onTimeDeliveries: 45, lateDeliveries: 15, qualityScore: 75, status: "Average" },
  { name: "SupplyPro", totalOrders: 40, onTimeDeliveries: 30, lateDeliveries: 10, qualityScore: 60, status: "Poor" },
];

// Chart data (remains the same)
const chartOptions = {
  chart: { type: "bar", toolbar: { show: false }, stacked: true },
  plotOptions: { bar: { horizontal: false, columnWidth: "40%", borderRadius: 4 } },
  dataLabels: { enabled: false },
  xaxis: { categories: suppliers.map((s) => s.name), labels: { style: { colors: '#666' } } },
  yaxis: { labels: { style: { colors: '#666' } } },
  colors: [green[500], red[400]],
  legend: { position: "top", horizontalAlign: 'right' },
  tooltip: { y: { formatter: (val) => `${val} orders` } },
  grid: { borderColor: '#f1f1f1' },
};
const chartSeries = [
  { name: "On-Time Deliveries", data: suppliers.map((s) => s.onTimeDeliveries) },
  { name: "Late Deliveries", data: suppliers.map((s) => s.lateDeliveries) },
];

const statusColor = (status) => {
  switch (status) {
    case "Excellent": return "success";
    case "Good": return "info";
    case "Average": return "warning";
    default: return "error";
  }
};

const SummaryCard = ({ title, value, icon, color }) => (
    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: color, width: 48, height: 48, mr: 2 }}>{icon}</Avatar>
                <Box>
                    <Typography variant="h5" fontWeight="bold">{value}</Typography>
                    <Typography color="text.secondary">{title}</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);


const SupplierPerformance = () => {
    const totalSuppliers = suppliers.length;
    const totalOrders = suppliers.reduce((sum, s) => sum + s.totalOrders, 0);
    const totalOnTime = suppliers.reduce((sum, s) => sum + s.onTimeDeliveries, 0);
    const avgQuality = (suppliers.reduce((sum, s) => sum + s.qualityScore, 0) / totalSuppliers).toFixed(1);
    const onTimeRate = ((totalOnTime / totalOrders) * 100).toFixed(1);

    return (
        // The only change is here: removed the `p` prop from this Box.
        <Box> 
            <Typography variant="h4" fontWeight="bold" mb={1}>Supplier Performance</Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Track and analyze the performance of your supply partners.
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Total Suppliers" value={totalSuppliers} icon={<Business />} color={blue[500]} /></Grid>
                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Total Orders" value={totalOrders} icon={<Assignment />} color={amber[500]} /></Grid>
                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Avg. Quality Score" value={`${avgQuality}%`} icon={<StarBorder />} color={red[500]} /></Grid>
                <Grid item xs={12} sm={6} md={3}><SummaryCard title="On-Time Rate" value={`${onTimeRate}%`} icon={<Speed />} color={green[500]} /></Grid>
            </Grid>

            {/* Chart */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Delivery Performance
                </Typography>
                <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={320} />
            </Paper>

            {/* Table */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Supplier Details
                </Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="supplier performance table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Supplier</TableCell>
                                <TableCell>Total Orders</TableCell>
                                <TableCell>On-Time</TableCell>
                                <TableCell>Late</TableCell>
                                <TableCell>Quality Score</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((s) => (
                                <TableRow key={s.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{s.name}</TableCell>
                                    <TableCell>{s.totalOrders}</TableCell>
                                    <TableCell sx={{ color: green[600] }}>{s.onTimeDeliveries}</TableCell>
                                    <TableCell sx={{ color: red[600] }}>{s.lateDeliveries}</TableCell>
                                    <TableCell>{s.qualityScore}%</TableCell>
                                    <TableCell>
                                        <Chip label={s.status} color={statusColor(s.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default SupplierPerformance;