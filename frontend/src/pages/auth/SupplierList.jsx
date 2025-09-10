import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const SupplierList = ({ suppliers = [], onEdit, onDelete }) => (
  <Box p={3}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Supplier List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No suppliers found
              </TableCell>
            </TableRow>
          ) : (
            suppliers.map((supplier, idx) => (
              <TableRow key={idx}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.company}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit && onEdit(supplier)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete && onDelete(supplier)}>
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

export default SupplierList;