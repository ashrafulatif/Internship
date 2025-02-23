import React from "react";
import ContactInfo from "@/components/contacts/ContactInfo";
import { Box } from "@mui/material";

export const metadata = {
  title: "CRUD - Contact",
  description: "Contact with Admin.",
};

const Contact = () => {
  return (
    <Box>
      <ContactInfo />
    </Box>
  );
};

export default Contact;
