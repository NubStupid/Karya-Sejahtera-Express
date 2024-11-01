// Navbar.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        handleMenuClose();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        handleMenuClose();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#00A4FF" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                {/* Left Section: Logo and Menu Icon */}
                <Box sx={{ display: "flex", alignItems: "center", marginLeft:6 }}>
                    <Box
                        component="img"
                        src="/logo/KSXpress.png"
                        alt="KSXpress"
                        sx={{
                            height: 40, // Logo height
                            width: "auto",
                            marginRight: 2,
                        }}
                    />
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{marginLeft:1}}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Right Section: Cart Icon and Avatar */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="inherit" aria-label="cart" sx={{ marginRight: 2 }}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton onClick={handleAvatarClick}>
                        <Avatar alt="Guest" src="" sx={{ width: 40, height: 40 }} />
                    </IconButton>
                </Box>

                {/* Menu for Login/Profile Options */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    {!isLoggedIn ? (
                        <>
                            <MenuItem onClick={handleLogin}>Login</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
