import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";

// Example categories, replace with your actual categories if needed
const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Home & Garden",
  "Sports",
];

const AddItem = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    minQuantity: "",
    price: "",
    supplier: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can call onSave(formData) or your API here
    // For now, just log the data
    console.log("New Item Data:", formData);
    // Optionally, reset the form
    setFormData({
      name: "",
      sku: "",
      category: "",
      quantity: "",
      minQuantity: "",
      price: "",
      supplier: "",
      location: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Add New Inventory Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value === "" ? "" : parseInt(e.target.value),
                  })
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Quantity"
                type="number"
                value={formData.minQuantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minQuantity: e.target.value === "" ? "" : parseInt(e.target.value),
                  })
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value === "" ? "" : parseFloat(e.target.value),
                  })
                }
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
                margin="normal"
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button
              variant="text"
              color="primary"
              onClick={onCancel ? onCancel : () => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Item
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddItem;