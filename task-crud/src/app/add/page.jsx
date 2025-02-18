import AddProduct from "@/components/create/CreateProduct";
import { Box } from "@mui/material";
import React from "react";

export const metadata = {
  title: "CRUD - Add Product",
  description: "Create a new product in the system.",
};

const CreateProduct = () => {
  return (
    <Box>
      <AddProduct />
    </Box>
  );
};

export default CreateProduct;
