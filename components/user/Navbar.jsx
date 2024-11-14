import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = useAuth();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.user && auth.user.username) {
                try {
                    const response = await fetch(`/api/user/getUser?username=${auth.user.username}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [auth.user]);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        router.push('/login');
        handleMenuClose();
    };

    const handleRegister = () => {
        router.push('/register');
        handleMenuClose();
    };

    const handleLogout = () => {
        auth.logout();
        setUser(null);
        handleMenuClose();
    };

    const handleProfile = () => {
        router.push('/user/editprofile');
        handleMenuClose();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#00A4FF" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: 6 }}>
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

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {user && (
                        <IconButton color="inherit" aria-label="cart" sx={{ marginRight: 2 }} onClick={() => router.push('/user/cart')}>
                            <ShoppingCartIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={handleAvatarClick}>
                        <Avatar alt="Guest" src="" sx={{ width: 40, height: 40 }} />
                    </IconButton>
                </Box>

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
