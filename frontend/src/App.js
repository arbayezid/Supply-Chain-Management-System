import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import theme from './theme';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/Inventory';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import Revenue from './pages/Revenue';
import AddItem from './pages/inventory/AddItem';
import Categories from './pages/inventory/Categories';
import LowStockAlerts from './pages/inventory/LowStockAlerts';
import StockAdjustments from './pages/inventory/StockAdjustments';
import Login from './pages/auth/Login';
import Signup from './pages//auth/Signup';
import Home from './pages/Home';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import './App.css';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar onMenuClick={handleSidebarToggle} isMobile={isMobile} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', overflow: 'auto', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory/overview" element={<InventoryPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/home" element={<Home />} />
              {/* Inventory sub-routes */}
              <Route path="/inventory/add" element={<AddItem />} />
              <Route path="/inventory/categories" element={<Categories />} />
              <Route path="/inventory/alerts" element={<LowStockAlerts />} />
              <Route path="/inventory/adjustments" element={<StockAdjustments />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
