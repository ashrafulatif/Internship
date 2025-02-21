"use client";
import { Box } from "@mui/material";
import React from "react";
import ContactView from "@/components/contacts/ContactView";
import sendMail from "@/actions/sendMail";

const ContactInfo = () => {
  return (
    <Box>
      <ContactView sendMail={sendMail} />
    </Box>
  );
};

export default ContactInfo;
