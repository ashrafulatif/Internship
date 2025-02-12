"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/c/6317-f370-4f95-86f6"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  console.log(products);

  return (
    <TableContainer component={Paper}  sx={{ width: "90%", justifyContent: "center", margin: "auto", marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Initiative</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Creator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.settingName}</TableCell>
              <TableCell>{product.modeOfInitiative}</TableCell>
              <TableCell>${product.budget}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                {new Date(product.createdDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{product.creator}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
