import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Link as MuiLink, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/"); // Dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField label="Email" name="email" type="email" fullWidth required margin="normal" value={form.email} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth required margin="normal" value={form.password} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <MuiLink component={Link} to="/signup">Sign Up</MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
