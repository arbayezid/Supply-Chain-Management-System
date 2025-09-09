import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Link as MuiLink, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>Sign Up</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" name="name" fullWidth required margin="normal" value={form.name} onChange={handleChange} />
          <TextField label="Email" name="email" type="email" fullWidth required margin="normal" value={form.email} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth required margin="normal" value={form.password} onChange={handleChange} />
          <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth required margin="normal" value={form.confirmPassword} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
