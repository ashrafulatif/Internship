"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import axios from "axios";

const AddAdvocacy = () => {
  const [settingName, setSettingName] = useState("");
  const [modeOfInitiative, setModeOfInitiative] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Active");
  const [createdDate, setCreatedDate] = useState("");
  const [creator] = useState("Ashraful Haque"); // Static value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      settingName,
      modeOfInitiative,
      budget,
      status,
      createdDate,
      creator,
    };

    try {
      const response = await axios.post(
        "https://dummyjson.com/c/7e86-ff63-4101-9bf2",
        data
      );
      console.log("Advocacy Created:", response.data);
      //clear the form
      setSettingName("");
      setModeOfInitiative("");
      setBudget("");
      setCreatedDate("");
    } catch (err) {
      console.error("Error adding advocacy:", err);
      setError("Failed to create advocacy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Centers the form vertically and horizontally
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600, // Limits the form width
          padding: 3,
          borderRadius: 2,
          border: "1px solid #ddd", // Border around the form
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" align="center">
          Create a new Advocacy Settings
        </Typography>
        <Box variant="outlined" p={2} mt={2}>
          <Typography variant="h6" align="center">
            Form Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={2}>
              {/* Setting Name Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Setting Name"
                  fullWidth
                  value={settingName}
                  onChange={(e) => setSettingName(e.target.value)}
                  required
                />
              </Grid>

              {/* Mode of Initiative Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Mode of Initiative</InputLabel>
                  <Select
                    value={modeOfInitiative}
                    onChange={(e) => setModeOfInitiative(e.target.value)}
                  >
                    <MenuItem value="Web Development">Web Development</MenuItem>
                    <MenuItem value="Mobile Development">
                      Mobile Development
                    </MenuItem>
                    <MenuItem value="Digital Marketing">
                      Digital Marketing
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Budget Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Budget"
                  fullWidth
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  type="number"
                />
              </Grid>

              {/* Status Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Created Date Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Created Date"
                  fullWidth
                  type="datet"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
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

            {/* Error message */}
            {error && (
              <Typography color="error" mt={2} align="center">
                {error}
              </Typography>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdvocacy;
