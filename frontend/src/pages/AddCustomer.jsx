import React, { useState } from "react";
import {
  Box, Paper, Typography, Grid, TextField, Button, Snackbar, Alert,
  Avatar, InputAdornment, Divider
} from "@mui/material";
import { PersonAdd, PersonOutline, MailOutline, PhoneOutlined, HomeOutlined, RestartAlt } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const AddCustomer = ({ onCustomerAdded }) => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const [form, setForm] = useState(initialFormState);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleReset = () => {
    setForm(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setSnackbar({ open: true, message: "Name, email, and phone are required fields.", severity: "error" });
      return;
    }
    if (onCustomerAdded) onCustomerAdded(form);
    setSnackbar({ open: true, message: "Customer added successfully!", severity: "success" });
    setForm(initialFormState);
  };

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f4f6f8' }}>
      <Paper
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 700,
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: blue[500], width: 48, height: 48, mr: 2 }}>
            <PersonAdd />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Create New Customer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details below to add a new customer.
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>CONTACT INFORMATION</Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonOutline /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MailOutline /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneOutlined /></InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
            
            <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>ADDITIONAL DETAILS</Typography>
                <TextField
                    fullWidth
                    label="Full Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><HomeOutlined /></InputAdornment>,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleReset}
                  startIcon={<RestartAlt />}
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ px: 4 }}
                >
                  Save Customer
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCustomer;