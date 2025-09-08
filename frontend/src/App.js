import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import theme from './theme';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Items from './pages/Items';
import InventoryPage, { Login, Signup } from './pages/Inventory';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import Revenue from './pages/Revenue';
import AddItem from './pages/inventory/AddItem';
import Categories from './pages/inventory/Categories';
import LowStockAlerts from './pages/inventory/LowStockAlerts';
import StockAdjustments from './pages/inventory/StockAdjustments';
import './App.css';

// Component Giao diện chính chứa Sidebar và TopBar
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          onMenuClick={handleSidebarToggle}
          isMobile={isMobile}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3, // Thêm một chút padding cho nội dung
            mt: '64px', // Chiều cao của TopBar
            overflow: 'auto',
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {/* Các trang con sẽ được hiển thị ở đây */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Route cho Login và Signup sẽ không có layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Các route khác sẽ sử dụng MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/items" element={<Items />} />

            {/* Các route con */}
            <Route path="/inventory/*" element={<InventoryPage />} />
            <Route path="/orders/*" element={<Orders />} />
            <Route path="/suppliers/*" element={<Suppliers />} />
            <Route path="/customers" element={<div>Customers Page - Coming Soon</div>} />
            <Route path="/shipments" element={<div>Shipments Page - Coming Soon</div>} />
            <Route path="/finance" element={<div>Finance Page - Coming Soon</div>} />
            <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
            <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
            <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
            <Route path="/inventory/overview" element={<InventoryPage />} />
            <Route path="/inventory/add" element={<AddItem />} />
            <Route path="/inventory/categories" element={<Categories />} />
            <Route path="/inventory/alerts" element={<LowStockAlerts />} />
            <Route path="/inventory/adjustments" element={<StockAdjustments />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;