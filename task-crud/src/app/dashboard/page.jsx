import LogoutButton from "@/components/auth/logout/LogoutButton";
import { Box, Typography, Container, Button } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Welcome!
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Here you can manage your account, view your data, and perform other
            actions.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              View Profile
            </Button>
            <Button variant="contained" color="secondary">
              Settings
            </Button>
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <LogoutButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
