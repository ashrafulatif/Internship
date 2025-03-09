import BangladeshMap from "@/components/BangladeshMap/BangladeshMap";
import { Box, Typography } from "@mui/material";
import React from "react";

const MapBN = () => {
  return (
    <Box
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   height: "100vh",
      // }}
    >
      <Typography variant="h2">Bangladesh Map</Typography>
      <BangladeshMap />
    </Box>
  );
};

export default MapBN;
