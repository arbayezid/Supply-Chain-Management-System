import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

// Sample data
const revenueData = [
  { date: "2025-09-01", amount: 1200, source: "Product Sales" },
  { date: "2025-09-02", amount: 800, source: "Service Income" },
  { date: "2025-09-03", amount: 1500, source: "Product Sales" },
  { date: "2025-09-04", amount: 900, source: "Consulting" },
  { date: "2025-09-05", amount: 1100, source: "Product Sales" },
];

// Chart data
const chartOptions = {
  chart: { type: "area", toolbar: { show: false } },
  xaxis: { categories: revenueData.map((d) => d.date) },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  colors: ["#4caf50"],
};
const chartSeries = [
  {
    name: "Revenue",
    data: revenueData.map((d) => d.amount),
  },
];

const RevenueOverview = () => (
  <Box p={3}>
    <Typography variant="h4" fontWeight="bold" mb={3}>
      Revenue Overview
    </Typography>

    {/* Summary Cards */}
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${revenueData.reduce((sum, d) => sum + d.amount, 0)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Highest Day
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${Math.max(...revenueData.map((d) => d.amount))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Daily Revenue
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${(revenueData.reduce((sum, d) => sum + d.amount, 0) / revenueData.length).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Chart */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Revenue Trend
      </Typography>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={320}
      />
    </Paper>

    {/* Table */}
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Revenue Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {revenueData.map((d, idx) => (
            <TableRow key={idx}>
              <TableCell>{d.date}</TableCell>
              <TableCell>{d.source}</TableCell>
              <TableCell>${d.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default RevenueOverview;