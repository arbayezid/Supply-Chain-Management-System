import React, { useState } from "react";
import {
  Box, Paper, Typography, Grid, TextField, Button, Snackbar, Alert,
  Avatar, InputAdornment, Divider
} from "@mui/material";
import { Apartment, PersonOutline, MailOutline, PhoneOutlined, HomeOutlined, RestartAlt } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const AddSupplier = ({ onSupplierAdded }) => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
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
    if (!form.name || !form.email || !form.phone || !form.company) {
      setSnackbar({ open: true, message: "Please fill all required fields.", severity: "error" });
      return;
    }
    if (onSupplierAdded) onSupplierAdded(form);
    setSnackbar({ open: true, message: "Supplier added successfully!", severity: "success" });
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
          <Avatar sx={{ bgcolor: teal[500], width: 48, height: 48, mr: 2 }}>
            <Apartment />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Register New Supplier
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Provide the details for the new supplier partner.
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>SUPPLIER INFORMATION</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier Name"
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
                label="Company Name"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Apartment /></InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>CONTACT DETAILS</Typography>
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
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Company Address"
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
                  sx={{ px: 4, backgroundColor: teal[600], '&:hover': { backgroundColor: teal[700] } }}
                >
                  Save Supplier
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

export default AddSupplier;