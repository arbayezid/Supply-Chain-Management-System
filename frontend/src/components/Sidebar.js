import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Business,
  LocalShipping,
  Analytics,
  Settings,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  AttachMoney,
  Timeline,
  Assessment,
  Receipt,
  Store,
  Category,
  LocationOn,
  Speed,
  Notifications,
  Security,
  Help,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [expandedItems, setExpandedItems] = useState({
    inventory: false,
    orders: false,
    suppliers: false,
    shipments: false,
    analytics: false,
  });

  const handleItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleExpandClick = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
      primary: true,
    },
    {
      title: 'Inventory Management',
      icon: <Inventory />,
      path: '/inventory',
      primary: true,
      children: [
        { title: 'Stock Overview', path: '/inventory/overview' },
        { title: 'Add Item', path: '/inventory/add' },
        { title: 'Categories', path: '/inventory/categories' },
        { title: 'Low Stock Alerts', path: '/inventory/alerts' },
        { title: 'Stock Adjustments', path: '/inventory/adjustments' },
      ]
    },
    {
      title: 'Order Management',
      icon: <ShoppingCart />,
      path: '/orders',
      primary: true,
      children: [
        { title: 'All Orders', path: '/orders/all' },
        { title: 'New Order', path: '/orders/new' },
        { title: 'Pending Orders', path: '/orders/pending' },
        { title: 'Order History', path: '/orders/history' },
      ]
    },
    {
      title: 'Customer Management',
      icon: <People />,
      path: '/customers',
      primary: true,
      children: [
        { title: 'Customer List', path: '/customers/list' },
        { title: 'Add Customer', path: '/customers/add' },
      ]
    },
    {
      title: 'Supplier Management',
      icon: <Business />,
      path: '/suppliers',
      primary: true,
      children: [
        { title: 'Supplier List', path: '/suppliers/list' },
        { title: 'Add Supplier', path: '/suppliers/add' },
        { title: 'Supplier Performance', path: '/suppliers/performance' },
        { title: 'Contracts', path: '/suppliers/contracts' },
      ]
    },
    {
      title: 'Shipment & Logistics',
      icon: <LocalShipping />,
      path: '/shipments',
      primary: true,
      children: [
        { title: 'Active Shipments', path: '/shipments/active' },
        { title: 'Shipment History', path: '/shipments/history' },
        { title: 'Tracking', path: '/shipments/tracking' },
        { title: 'Shipping Rates', path: '/shipments/rates' },
      ]
    },
    {
      title: 'Financial Management',
      icon: <AttachMoney />,
      path: '/finance',
      primary: true,
      children: [
        { title: 'Revenue Overview', path: '/finance/revenue' },
        { title: 'Expenses', path: '/finance/expenses' },
        { title: 'Invoices', path: '/finance/invoices' },
        { title: 'Payments', path: '/finance/payments' },
      ]
    },
    {
      title: 'Analytics & Reports',
      icon: <Analytics />,
      path: '/analytics',
      primary: true,
      children: [
        { title: 'Performance Dashboard', path: '/analytics/performance' },
        { title: 'Sales Reports', path: '/analytics/sales' },
        { title: 'Inventory Reports', path: '/analytics/inventory' },
        { title: 'Supplier Reports', path: '/analytics/suppliers' },
        { title: 'Custom Reports', path: '/analytics/custom' },
      ]
    },
    {
      title: 'Settings',
      icon: <Settings />,
      path: '/settings',
      primary: false,
      children: [
        { title: 'General Settings', path: '/settings/general' },
        { title: 'User Management', path: '/settings/users' },
        { title: 'System Preferences', path: '/settings/preferences' },
        { title: 'Backup & Restore', path: '/settings/backup' },
      ]
    },
  ];

  const renderMenuItem = (item, level = 0) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.title?.toLowerCase().replace(/\s+/g, '')] || false;

    if (hasChildren) {
      return (
        <Box key={item.title}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleExpandClick(item.title.toLowerCase().replace(/\s+/g, ''))}
              sx={{
                pl: 2 + level * 2,
                backgroundColor: isActive ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title} 
                primaryTypographyProps={{ 
                  fontWeight: item.primary ? 600 : 400,
                  color: isActive ? 'primary.main' : 'inherit'
                }}
              />
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(child.path)}
                    sx={{
                      pl: 4 + level * 2,
                      backgroundColor: location.pathname === child.path ? 'action.selected' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemText 
                      primary={child.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: location.pathname === child.path ? 'primary.main' : 'inherit'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      );
    }

    return (
      <ListItem key={item.title} disablePadding>
        <ListItemButton
          onClick={() => handleItemClick(item.path)}
          sx={{
            pl: 2 + level * 2,
            backgroundColor: isActive ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.title}
            primaryTypographyProps={{ 
              fontWeight: item.primary ? 600 : 400,
              color: isActive ? 'primary.main' : 'inherit'
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          Supply Chain Pro
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Management System
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ overflow: 'auto', height: 'calc(100% - 100px)' }}>
        <List>
          {menuItems.map((item) => renderMenuItem(item))}
        </List>
      </Box>

      {/* Footer */}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
