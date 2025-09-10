import React, { useState, useMemo } from 'react';
import {
  Box, Paper, Typography, Grid, Button, Avatar, Divider,
  TextField, InputAdornment
} from '@mui/material';
import { teal } from '@mui/material/colors';
import { Apartment, Search, Edit, Delete, Email, Phone, Person } from '@mui/icons-material';

// Sample Data
const mockSuppliers = [
  {
    name: 'John Smith',
    company: 'Global Tech Inc.',
    email: 'john.s@globaltech.com',
    phone: '555-0101',
    address: '100 Innovation Drive, Techville',
  },
  {
    name: 'Maria Garcia',
    company: 'Evergreen Paper Co.',
    email: 'maria.g@evergreen.com',
    phone: '555-0102',
    address: '200 Forest Rd, Woodsville',
  },
  {
    name: 'Chen Wei',
    company: 'Precision Parts Ltd.',
    email: 'chen.w@precision.com',
    phone: '555-0103',
    address: '300 Metal St, Industry City',
  },
   {
    name: 'Fatima Al-Sayed',
    company: 'Creative Textiles',
    email: 'fatima.a@creativetex.com',
    phone: '555-0104',
    address: '400 Weavers Lane, Fabric Town',
  },
];

const SupplierCard = ({ supplier, onEdit, onDelete }) => (
    <Paper
        variant="outlined"
        sx={{
            p: 2.5,
            borderRadius: '16px',
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: teal[500], width: 48, height: 48, mr: 2 }}>
                <Apartment />
            </Avatar>
            <Box>
                <Typography variant="h6" fontWeight={700}>{supplier.company}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Person sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">{supplier.name}</Typography>
                </Box>
            </Box>
        </Box>
        
        <Divider sx={{ my: 1 }} />

        <Box sx={{ flexGrow: 1, my: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', mb: 1 }}>
                 <Email sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
                 <Typography variant="body2">{supplier.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                 <Phone sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
                 <Typography variant="body2">{supplier.phone}</Typography>
            </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={() => onEdit && onEdit(supplier)}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<Delete />}
                onClick={() => onDelete && onDelete(supplier)}
            >
                Delete
            </Button>
        </Box>
    </Paper>
);


const SupplierList = ({ suppliers = mockSuppliers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#f9fafb' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
            <Typography variant="h4" fontWeight={700}>Supplier Directory</Typography>
            <Typography color="text.secondary">
                Find and manage your supplier partners.
            </Typography>
        </Box>
        <Button variant="contained" startIcon={<Apartment />} sx={{ backgroundColor: teal[600], '&:hover': { backgroundColor: teal[700] } }}>
          Add Supplier
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by supplier or company name..."
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

      {filteredSuppliers.length > 0 ? (
        <Grid container spacing={3}>
          {filteredSuppliers.map((supplier, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <SupplierCard supplier={supplier} onEdit={onEdit} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ textAlign: 'center', p: 5, borderRadius: '12px' }}>
          <Typography variant="h6">No Suppliers Found</Typography>
          <Typography color="text.secondary">
            Your search did not match any suppliers. Try a different term.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SupplierList;