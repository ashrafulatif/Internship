"use client";
import { Box, Button, colors } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShowDataTable from "../components/showDataTable";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleAdd = () => {
    router.push("/add");
  };
  return (
    <Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
        Add New
      </Button>
      <ShowDataTable />
    </Box>
  );
}
