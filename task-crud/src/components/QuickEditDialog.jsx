import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const QuickEditDialog = ({ open, handleClose, product, onProductUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    productName: "",
    category: "",
    price: "",
    stockQuantity: "",
  });

  // Update state when product changes
  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:1000/product-management/modify-product/${product.productId}`,
        updatedProduct
      );
      toast.success("Product updated successfully!");
      onProductUpdate(updatedProduct); // Update the parent state
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          name="productName"
          fullWidth
          margin="dense"
          value={updatedProduct.productName || ""}
          onChange={handleChange}
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          value={updatedProduct.category || ""}
          onChange={handleChange}
        />
        <TextField
          label="Price ($)"
          name="price"
          fullWidth
          margin="dense"
          type="number"
          value={updatedProduct.price || ""}
          onChange={handleChange}
        />
        <TextField
          label="Stock"
          name="stockQuantity"
          fullWidth
          margin="dense"
          type="number"
          value={updatedProduct.stockQuantity || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickEditDialog;
