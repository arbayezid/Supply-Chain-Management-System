import React, { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Grid, Button, Avatar, Divider, IconButton,
  TextField, InputAdornment, Tooltip
} from '@mui/material';
import { deepPurple, green } from '@mui/material/colors';
import { PersonAdd, Search, Edit, Delete, Email, Phone, Home } from '@mui/icons-material';

// Sample Data
const mockCustomers = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '123-456-7890',
    address: '123 Maple St, Springfield',
  },
  {
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '234-567-8901',
    address: '456 Oak Ave, Metropolis',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    phone: '345-678-9012',
    address: '789 Pine Ln, Gotham',
  },
   {
    name: 'Diana Miller',
    email: 'diana.m@example.com',
    phone: '456-789-0123',
    address: '101 Elm Ct, Star City',
  },
];

const CustomerCard = ({ customer, onEdit, onDelete }) => (
    <Paper
        variant="outlined"
        sx={{
            p: 2.5,
            borderRadius: '16px',
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
            }
        }}
    >
        <Avatar sx={{ bgcolor: deepPurple[500], width: 64, height: 64, margin: '0 auto 16px' }}>
            {customer.name.charAt(0)}
        </Avatar>
        <Typography variant="h6" fontWeight={700} gutterBottom>{customer.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', mb: 0.5 }}>
             <Email sx={{ fontSize: 16, mr: 1 }} />
             <Typography variant="body2">{customer.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
             <Phone sx={{ fontSize: 16, mr: 1 }} />
             <Typography variant="body2">{customer.phone}</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} /> {/* This pushes the footer to the bottom */}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={() => onEdit && onEdit(customer)}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<Delete />}
                onClick={() => onDelete && onDelete(customer)}
            >
                Delete
            </Button>
        </Box>
    </Paper>
);


const CustomerList = ({ customers = mockCustomers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#f9fafb' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
            <Typography variant="h4" fontWeight={700}>Customer Management</Typography>
            <Typography color="text.secondary">
                Manage your customer profiles and contact information.
            </Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAdd />}>
          Add Customer
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by customer name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          sx: { borderRadius: '12px', mb: 4, backgroundColor: 'white' }
        }}
      />

      {filteredCustomers.length > 0 ? (
        <Grid container spacing={3}>
          {filteredCustomers.map((customer, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <CustomerCard customer={customer} onEdit={onEdit} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ textAlign: 'center', p: 5, borderRadius: '12px' }}>
          <Typography variant="h6">No Customers Found</Typography>
          <Typography color="text.secondary">
            Your search for "{searchTerm}" did not match any customers.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CustomerList;