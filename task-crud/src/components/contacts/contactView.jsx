"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";

const ContactView = ({ sendMail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      from: "", 
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const response = await sendMail(data);
    if (!response.success) {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        padding: 3,
        borderRadius: 2,
        border: "1px solid #ddd",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" align="center">
        Contact
      </Typography>
      <Box variant="outlined" p={2} mt={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                label="Enter your name"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Enter your email"
                fullWidth
                {...register("from", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.from}
                helperText={errors.from?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Enter your message"
                fullWidth
                multiline
                rows={4}
                {...register("description", {
                  required: "Message is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
          </Grid>

          <Box mt={2} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>

          {error && (
            <Typography color="error" mt={2} align="center">
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ContactView;
