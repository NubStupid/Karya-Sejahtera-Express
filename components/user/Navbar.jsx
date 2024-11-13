// Navbar.jsx
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null); // State untuk menyimpan data pengguna
    const router = useRouter();

    // Ambil data pengguna jika user login
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/getUser?username=jane_smith`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data); 
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []); // Hanya panggil sekali saat komponen di-mount

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setUser({ 
            username: "jane_smith",
            profile: {
                name: "Jane Smith",
                profpic: "https://i.pinimg.com/236x/c7/b8/40/c7b84086ac60dd7179507eebb764ed33.jpg"
            }
        });
        handleMenuClose();
    };

    const handleLogout = () => {
        setUser(null); // Menghapus data pengguna dari state
        handleMenuClose();
    };

    const handleProfile = () => {
        router.push('/user/editprofile');
        handleMenuClose();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#00A4FF" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                {/* Left Section: Logo and Menu Icon */}
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: 6 }}>
                    <Box
                        component="img"
                        src="/logo/KSXpress.png"
                        alt="KSXpress"
                        sx={{
                            height: 40,
                            width: "auto",
                            marginRight: 2,
                            cursor: "pointer"
                        }}
                        onClick={() => router.push('/')}
                    />
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginLeft: 1 }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Right Section: Cart Icon and Avatar */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="inherit" aria-label="cart" sx={{ marginRight: 2 }}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton onClick={handleAvatarClick}>
                        <Avatar
                            alt={user ? user.profile.name : "Guest"}
                            src={user ? user.profile.profpic : "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png"}
                            sx={{ width: 40, height: 40 }}
                        />
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
                    {!user ? (
                        <Box>
                            <MenuItem onClick={handleLogin}>Login</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
                        </Box>
                    ) : (
                        <Box>
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Box>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
