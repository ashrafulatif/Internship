"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "secondary.main", py: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              We provide high-quality products with the best customer service.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Home
            </Typography>
            <Typography variant="body2">Shop</Typography>
            <Typography variant="body2">Contact</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "gray", my: 2 }} />

        {/* Copyright Section */}
        <Typography variant="body2" textAlign="center">
          © {new Date().getFullYear()} Next Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
