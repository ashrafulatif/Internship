"use client";
import { Box } from "@mui/material";
import React from "react";
import ContactView from "@/components/contacts/ContactView";
import sendMail from "@/actions/sendMail";

const ContactInfo = () => {
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
      <ContactView sendMail={sendMail} />
    </Box>
  );
};

export default ContactInfo;
