"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FieldUpload from "./FieldUpload";
import Button from "@mui/material/Button";
import { Box, Typography, Paper } from "@mui/material";

const ImageUpload = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          mx: "auto",
          mt: 5,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Upload Your Image
        </Typography>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <FieldUpload name="image" />
          </Box>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </FormProvider>
  );
};

export default ImageUpload;