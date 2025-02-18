"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productSchema from "@/utils/productSchema";
import CreateForm from "@/components/create/createForm";

const AddProduct = () => {
  //initialize react hook  form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema), //zod integretation
    defaultValues: {
      productName: "",
      productDescription: "",
      price: "",
      stockQuantity: "",
      releaseDate: "",
      category: "",
      features: ["Whaterproof", "Wireless", "Fast charging"],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:1000/product-management/add-product",
        data
      );
      console.log("Product Created:", response.data);

      toast.success("Product created successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        router.push("./");
      }, 1000);

      reset(); // Reset form after submission
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <CreateForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        loading={loading}
        error={error}
      />
      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default AddProduct;
