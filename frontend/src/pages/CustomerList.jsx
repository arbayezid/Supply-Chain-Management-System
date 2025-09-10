import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CustomerList = ({ customers = [], onEdit, onDelete }) => (
  <Box p={3}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Customer List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length === 0 ? (
           
           <TableRow>
              <TableCell colSpan={5} align="center">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer, idx) => (
              <TableRow key={idx}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit && onEdit(customer)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete && onDelete(customer)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default CustomerList;