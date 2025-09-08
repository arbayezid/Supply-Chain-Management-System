import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Timeline,
  Warning,
  CheckCircle,
  Schedule,
  Inventory,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';

const Forecasting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);
  const [forecastData, setForecastData] = useState(null);

  const periods = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
  ];

  useEffect(() => {
    generateForecast();
  }, [selectedPeriod, confidenceLevel, includeSeasonality]);

  const generateForecast = () => {
    // Mock forecast data - replace with actual API call
    const mockForecast = {
      historicalData: [120, 135, 142, 138, 156, 168, 175, 182, 190, 185, 200, 210],
      forecastData: [220, 235, 250, 265, 280, 295, 310, 325, 340, 355, 370, 385],
      confidenceUpper: [240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405],
      confidenceLower: [200, 215, 230, 245, 260, 275, 290, 305, 320, 335, 350, 365],
      accuracy: 87.5,
      trend: 'increasing',
      seasonality: 'moderate',
      recommendations: [
        {
          type: 'inventory',
          priority: 'high',
          message: 'Increase stock levels for Electronics category by 25%',
          impact: 'High',
          timeframe: '2 weeks',
        },
        {
          type: 'supplier',
          priority: 'medium',
          message: 'Negotiate better terms with TechCorp Solutions',
          impact: 'Medium',
          timeframe: '1 month',
        },
        {
          type: 'pricing',
          priority: 'low',
          message: 'Consider dynamic pricing for seasonal items',
          impact: 'Low',
          timeframe: '3 months',
        },
      ],
      categoryForecasts: [
        {
          category: 'Electronics',
          currentDemand: 150,
          predictedDemand: 185,
          growth: 23.3,
          confidence: 89,
        },
        {
          category: 'Clothing',
          currentDemand: 120,
          predictedDemand: 135,
          growth: 12.5,
          confidence: 76,
        },
        {
          category: 'Home & Garden',
          currentDemand: 90,
          predictedDemand: 110,
          growth: 22.2,
          confidence: 82,
        },
        {
          category: 'Sports',
          currentDemand: 75,
          predictedDemand: 95,
          growth: 26.7,
          confidence: 71,
        },
      ],
    };
    setForecastData(mockForecast);
  };

  const getTrendIcon = (trend) => {
    return trend === 'increasing' ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'default';
    }
  };

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Chart options for demand forecast
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [3, 3, 2, 2],
    },
    colors: ['#1976d2', '#2e7d32', '#ed6c02', '#ed6c02'],
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
      labels: { style: { colors: '#666' } },
    },
    yaxis: {
      labels: { style: { colors: '#666' } },
    },
    legend: {
      position: 'top',
      labels: { colors: '#333' },
    },
    grid: {
      borderColor: '#ddd',
      strokeDashArray: 5,
    },
  };

  const chartSeries = [
    {
      name: 'Historical Demand',
      data: forecastData.historicalData,
    },
    {
      name: 'Forecasted Demand',
      data: forecastData.forecastData,
    },
    {
      name: 'Confidence Upper',
      data: forecastData.confidenceUpper,
    },
    {
      name: 'Confidence Lower',
      data: forecastData.confidenceLower,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Demand Forecasting & Analytics
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Predictive analytics for inventory planning and demand management
      </Typography>

      {/* Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Forecast Period</InputLabel>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                label="Forecast Period"
              >
                {periods.map((period) => (
                  <MenuItem key={period.value} value={period.value}>
                    {period.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom>Confidence Level: {confidenceLevel}%</Typography>
            <Slider
              value={confidenceLevel}
              onChange={(e, value) => setConfidenceLevel(value)}
              min={70}
              max={95}
              step={5}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={includeSeasonality}
                  onChange={(e) => setIncludeSeasonality(e.target.checked)}
                />
              }
              label="Include Seasonality"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Forecast Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Analytics color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" color="primary" fontWeight="bold">
                {forecastData.accuracy}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Forecast Accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              {getTrendIcon(forecastData.trend)}
              <Typography variant="h6" color="success" fontWeight="bold">
                {forecastData.trend.charAt(0).toUpperCase() + forecastData.trend.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Demand Trend
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Timeline color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" color="info" fontWeight="bold">
                {forecastData.seasonality.charAt(0).toUpperCase() + forecastData.seasonality.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Seasonality
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Inventory color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" color="warning" fontWeight="bold">
                {forecastData.recommendations.filter(r => r.priority === 'high').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                High Priority Actions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Demand Forecast Chart */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Demand Forecast
        </Typography>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
        />
      </Paper>

      {/* Category Forecasts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Category Demand Forecasts
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Current Demand</TableCell>
                    <TableCell align="right">Predicted Demand</TableCell>
                    <TableCell align="right">Growth %</TableCell>
                    <TableCell align="center">Confidence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forecastData.categoryForecasts.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {category.category}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {category.currentDemand}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          {category.predictedDemand}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${category.growth > 0 ? '+' : ''}${category.growth}%`}
                          color={category.growth > 0 ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="textSecondary">
                          {category.confidence}%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              AI Recommendations
            </Typography>
            <Box sx={{ mt: 2 }}>
              {forecastData.recommendations.map((rec, index) => (
                <Card key={index} sx={{ mb: 2, border: `1px solid #e0e0e0` }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Chip
                        label={rec.priority}
                        color={getPriorityColor(rec.priority)}
                        size="small"
                      />
                      <Chip
                        label={rec.impact}
                        color={getImpactColor(rec.impact)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {rec.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Timeframe: {rec.timeframe}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Items */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Recommended Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Warning color="error" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Immediate Actions
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Review and adjust inventory levels for high-growth categories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule color="warning" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Short Term (1-2 months)
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Optimize supplier relationships and negotiate better terms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Long Term (3-6 months)
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Implement dynamic pricing strategies and expand product lines
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Forecasting;
