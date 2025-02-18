import UpdateProduct from "@/components/update/UpdateProduct";
import { Box } from "@mui/material";
import React from "react";

export const metadata = {
  title: "CRUD - Update Product",
  description: "Update a existing product in the system.",
};

const Update = () => {
  return (
    <Box>
      <UpdateProduct />
    </Box>
  );
};

export default Update;
