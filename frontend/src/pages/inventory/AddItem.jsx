import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box, Typography, Paper, Grid, TextField, FormControl,
  InputLabel, Select, MenuItem, Button, InputAdornment, Stack,
} from "@mui/material";

const categories = ["Electronics", "Furniture", "Clothing", "Home & Garden", "Sports"];

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [item, setItem] = useState({
    name: "", sku: "", category: "", quantity: 0,
    price: 0, supplier: "", location: "",
  });

  useEffect(() => {
    if (isEditing) {
      // API endpoint টি আপনার ব্যাকএন্ড অনুযায়ী /api/items/{id} হতে পারে
      axios.get(`/api/items/${id}`)
        .then((res) => { if (res.data) setItem(res.data); })
        .catch((err) => console.error("Failed to fetch item", err));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`/api/items/${id}`, item)
      : axios.post("/api/items", item);

    request
      .then(() => {
        console.log("Item saved successfully! Navigating to /inventory/overview...");
        // *** পরিবর্তন এখানে ***
        // সঠিক রুটে রিডাইরেক্ট করা হচ্ছে
        navigate("/inventory/overview");
      })
      .catch((err) => console.error("Error saving item:", err));
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          {isEditing ? "Edit Item" : "Add New Inventory Item"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Item Name" name="name" value={item.name} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="SKU" name="sku" value={item.sku} onChange={handleChange} required /></Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={item.category} label="Category" onChange={handleChange}>
                  {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Quantity" type="number" name="quantity" value={item.quantity} onChange={handleChange} required InputProps={{ inputProps: { min: 0 } }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Price" type="number" name="price" value={item.price} onChange={handleChange} required InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, inputProps: { min: 0 } }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Supplier" name="supplier" value={item.supplier} onChange={handleChange} required /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Location" name="location" value={item.location} onChange={handleChange} /></Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            {/* *** পরিবর্তন এখানে *** */}
            <Button variant="outlined" color="secondary" onClick={() => navigate("/inventory/overview")}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">{isEditing ? "Update Item" : "Add Item"}</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddItem;