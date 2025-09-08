import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const categories = [
  { name: "Electronics", items: 40 },
  { name: "Apparel", items: 30 },
  { name: "Accessories", items: 50 },
];

const Categories = () => (
  <Box p={3}>
    <Typography variant="h4" gutterBottom>Categories</Typography>
    <Paper sx={{ p: 2, mb: 2 }}>
      <Button variant="contained" color="primary">Add New Category</Button>
    </Paper>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell>Number of Items</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.name}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.items}</TableCell>
              <TableCell>
                <Button size="small" color="primary">Edit</Button>
                <Button size="small" color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default Categories;