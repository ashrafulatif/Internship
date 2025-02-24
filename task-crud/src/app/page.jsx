"use client";
import { Box } from "@mui/material";
import ShowDataTable from "../components/showDataTable";
import ChatView from "@/components/Chat/ChatView";

export default function Home() {
  return (
    <Box>
      {/* data table */}
      <ShowDataTable />
      <ChatView />
    </Box>
  );
}
