"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: 600,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
}));

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen

  // Handle search input change
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // Handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      router.push(`/search?query=${query.trim()}`);
    }
  };

  // Redirect to home page
  const handleRedirectHome = () => {
    router.push("/");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", bgcolor: "primary.main" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Shop Icon and Title */}
        <Box
          display="flex"
          alignItems="center"
          onClick={handleRedirectHome}
          sx={{ cursor: "pointer" }}
        >
          <IconButton color="inherit">
            <StorefrontIcon />
          </IconButton>
          {!isMobile && ( // Hide text on mobile screens
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Next Shop
            </Typography>
          )}
        </Box>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products…"
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
        </Search>

        {/* Right: Menu or Icons */}
        {isMobile ? (
          <IconButton color="inherit" onClick={toggleMobileMenu}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center">
            <IconButton color="inherit">
              <LocalOfferIcon />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                Offers
              </Typography>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
        >
          {/* Close Button */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Offers" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
