"use client";
import { Box } from "@mui/material";
import ShowDataTable from "../components/showDataTable";
import ChatPopup from "@/components/Chat/ChatPopup";

export default function Home() {
  return (
    <Box>
      {/* data table */}
      <ShowDataTable />
      <ChatPopup/>
    </Box>
  );
}
