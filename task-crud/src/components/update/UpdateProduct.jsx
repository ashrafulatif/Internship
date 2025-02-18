"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "@/components/update/productForm";
import { Box, CircularProgress } from "@mui/material";

function UpdateProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null); // Manage product data state

  // Initialize react-hook-form
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch product details and set default values
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/product-management/find-product/${id}`
        );
        const product = response.data;
        setProductData(product); // Set fetched data

        // Set default values for form fields
        reset({
          productName: product.productName,
          productDescription: product.productDescription,
          price: product.price,
          stockQuantity: product.stockQuantity,
          releaseDate: product.releaseDate,
          category: product.category,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    const updatedProduct = {
      productName: data.productName,
      productDescription: data.productDescription,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      releaseDate: data.releaseDate,
      category: data.category,
    };

    try {
      await axios.patch(
        `http://localhost:1000/product-management/modify-product/${id}`,
        updatedProduct
      );

      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        router.push("../");
      }, 1000);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state or form once product data is fetched
  if (!productData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ProductForm
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        loading={loading}
      />
      <ToastContainer />
    </Box>
  );
}

export default UpdateProduct;
