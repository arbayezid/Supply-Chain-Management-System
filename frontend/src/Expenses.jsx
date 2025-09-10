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
  Chip,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

// Sample data
const expensesData = [
  { date: "2025-09-01", amount: 400, category: "Supplies" },
  { date: "2025-09-02", amount: 250, category: "Utilities" },
  { date: "2025-09-03", amount: 600, category: "Salaries" },
  { date: "2025-09-04", amount: 150, category: "Transport" },
  { date: "2025-09-05", amount: 300, category: "Maintenance" },
];

// Chart data
const chartOptions = {
  chart: { type: "donut", toolbar: { show: false } },
  labels: [...new Set(expensesData.map((d) => d.category))],
  colors: ["#ff9800", "#4caf50", "#2196f3", "#f44336", "#9c27b0"],
  dataLabels: { enabled: false },
};
const chartSeries = chartOptions.labels.map(
  (cat) => expensesData.filter((d) => d.category === cat).reduce((sum, d) => sum + d.amount, 0)
);

const Expenses = () => (
  <Box p={3}>
    <Typography variant="h4" fontWeight="bold" mb={3}>
      Expenses
    </Typography>

    {/* Summary Cards */}
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${expensesData.reduce((sum, d) => sum + d.amount, 0)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Highest Expense
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${Math.max(...expensesData.map((d) => d.amount))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Daily Expense
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ${(expensesData.reduce((sum, d) => sum + d.amount, 0) / expensesData.length).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Chart */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Expenses by Category
      </Typography>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={320}
      />
    </Paper>

    {/* Table */}
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Expense Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesData.map((d, idx) => (
            <TableRow key={idx}>
              <TableCell>{d.date}</TableCell>
              <TableCell>
                <Chip label={d.category} color="primary" size="small" />
              </TableCell>
              <TableCell>${d.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default Expenses;