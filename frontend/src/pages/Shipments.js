import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Schedule as PendingIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Update as UpdateIcon,
  Notifications as NotificationsIcon,
  DirectionsCar as InTransitIcon,
  Warehouse as WarehouseIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchShipments();
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(fetchShipments, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockShipments = [
        {
          id: '1',
          trackingNumber: 'TRK-001-2024',
          orderNumber: 'ORD-001',
          customerName: 'John Doe',
          status: 'in_transit',
          currentLocation: 'Chicago, IL',
          estimatedDelivery: '2024-01-22',
          actualDelivery: null,
          carrier: 'FedEx',
          service: 'Express',
          origin: 'San Francisco, CA',
          destination: 'New York, NY',
          weight: '2.5 kg',
          dimensions: '30x20x15 cm',
          timeline: [
            {
              timestamp: '2024-01-20 10:30 AM',
              status: 'Order Placed',
              location: 'San Francisco, CA',
              description: 'Order has been placed and confirmed',
            },
            {
              timestamp: '2024-01-20 2:15 PM',
              status: 'Picked Up',
              location: 'San Francisco, CA',
              description: 'Package picked up by carrier',
            },
            {
              timestamp: '2024-01-21 9:45 AM',
              status: 'In Transit',
              location: 'Chicago, IL',
              description: 'Package arrived at sorting facility',
            },
          ],
        },
        {
          id: '2',
          trackingNumber: 'TRK-002-2024',
          orderNumber: 'ORD-002',
          customerName: 'Jane Smith',
          status: 'delivered',
          currentLocation: 'Delivered',
          estimatedDelivery: '2024-01-20',
          actualDelivery: '2024-01-20 3:30 PM',
          carrier: 'UPS',
          service: 'Ground',
          origin: 'Los Angeles, CA',
          destination: 'Miami, FL',
          weight: '1.8 kg',
          dimensions: '25x18x12 cm',
          timeline: [
            {
              timestamp: '2024-01-18 11:20 AM',
              status: 'Order Placed',
              location: 'Los Angeles, CA',
              description: 'Order has been placed and confirmed',
            },
            {
              timestamp: '2024-01-18 4:30 PM',
              status: 'Picked Up',
              location: 'Los Angeles, CA',
              description: 'Package picked up by carrier',
            },
            {
              timestamp: '2024-01-19 8:15 AM',
              status: 'In Transit',
              location: 'Phoenix, AZ',
              description: 'Package arrived at sorting facility',
            },
            {
              timestamp: '2024-01-20 2:45 PM',
              status: 'Out for Delivery',
              location: 'Miami, FL',
              description: 'Package is out for delivery',
            },
            {
              timestamp: '2024-01-20 3:30 PM',
              status: 'Delivered',
              location: 'Miami, FL',
              description: 'Package delivered successfully',
            },
          ],
        },
        {
          id: '3',
          trackingNumber: 'TRK-003-2024',
          orderNumber: 'ORD-003',
          customerName: 'Bob Johnson',
          status: 'pending',
          currentLocation: 'Warehouse',
          estimatedDelivery: '2024-01-25',
          actualDelivery: null,
          carrier: 'DHL',
          service: 'Standard',
          origin: 'Seattle, WA',
          destination: 'Boston, MA',
          weight: '3.2 kg',
          dimensions: '35x25x20 cm',
          timeline: [
            {
              timestamp: '2024-01-19 9:15 AM',
              status: 'Order Placed',
              location: 'Seattle, WA',
              description: 'Order has been placed and confirmed',
            },
            {
              timestamp: '2024-01-19 3:45 PM',
              status: 'Processing',
              location: 'Seattle, WA',
              description: 'Package is being prepared for shipment',
            },
          ],
        },
      ];
      setShipments(mockShipments);
    } catch (err) {
      console.error('Failed to fetch shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'in_transit': return 'primary';
      case 'out_for_delivery': return 'secondary';
      case 'delivered': return 'success';
      case 'delayed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <PendingIcon />;
      case 'processing': return <WarehouseIcon />;
      case 'in_transit': return <InTransitIcon />;
      case 'out_for_delivery': return <ShippingIcon />;
      case 'delivered': return <DeliveredIcon />;
      case 'delayed': return <NotificationsIcon />;
      default: return <PendingIcon />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'in_transit': return 'In Transit';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    fetchShipments();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Shipment Tracking
        </Typography>
        <Button
          variant="outlined"
          startIcon={<UpdateIcon />}
          onClick={handleRefresh}
          sx={{ borderRadius: 2 }}
        >
          Refresh
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by tracking number, order number, or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Shipment Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {shipments.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Shipments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="warning" fontWeight="bold">
              {shipments.filter(s => s.status === 'pending').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Pending
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="info" fontWeight="bold">
              {shipments.filter(s => s.status === 'in_transit').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              In Transit
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="success" fontWeight="bold">
              {shipments.filter(s => s.status === 'delivered').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Delivered
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Shipments List */}
      <Grid container spacing={3}>
        {filteredShipments.map((shipment) => (
          <Grid item xs={12} key={shipment.id}>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Shipment Header */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {shipment.trackingNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Order: {shipment.orderNumber} | Customer: {shipment.customerName}
                      </Typography>
                    </Box>
                    <Chip
                      icon={getStatusIcon(shipment.status)}
                      label={getStatusLabel(shipment.status)}
                      color={getStatusColor(shipment.status)}
                      variant="outlined"
                      size="medium"
                    />
                  </Box>
                </Grid>

                {/* Shipment Details */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Shipment Details
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <LocationIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Origin"
                            secondary={shipment.origin}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <HomeIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Destination"
                            secondary={shipment.destination}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ShippingIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Carrier"
                            secondary={`${shipment.carrier} - ${shipment.service}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Current Location"
                            secondary={shipment.currentLocation}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Delivery Information */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Delivery Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Schedule color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Estimated Delivery"
                            secondary={shipment.estimatedDelivery}
                          />
                        </ListItem>
                        {shipment.actualDelivery && (
                          <ListItem>
                            <ListItemIcon>
                              <CheckCircle color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Actual Delivery"
                              secondary={shipment.actualDelivery}
                            />
                          </ListItem>
                        )}
                        <ListItem>
                          <ListItemIcon>
                            <LocationIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Weight"
                            secondary={shipment.weight}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Dimensions"
                            secondary={shipment.dimensions}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Timeline */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Tracking Timeline
                      </Typography>
                      <Timeline position="right">
                        {shipment.timeline.map((event, index) => (
                          <TimelineItem key={index}>
                            <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                              {event.timestamp}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              {index < shipment.timeline.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                              <Typography variant="h6" component="span">
                                {event.status}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {event.location}
                              </Typography>
                              <Typography variant="body2">
                                {event.description}
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {filteredShipments.length === 0 && !loading && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No shipments found matching your search criteria.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Shipments;
