import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Drawer, List, ListItem, Button, Box, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAuth from "@/stores/store";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
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

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { label: "Homepage", route: "/" },
        { label: "Catalog", route: "/catalog" },
        { label: "History", route: "user/history" },
    ];

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#00A4FF" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    
                    {/* Hamburger Menu Icon on the Left */}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    
                    {/* Logo on the Right */}
                    <Box
                        component="img"
                        src="/logo/KSXpress.png"
                        alt="KSXpress"
                        sx={{
                            height: 42.91995784712134,
                            width: "auto",
                            marginRight: 152.5,
                            cursor: "pointer"
                        }}
                    />

                    {/* Cart Icon and Avatar */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {user && (
                            <IconButton color="inherit" aria-label="cart" sx={{ marginRight: 2 }} onClick={() => router.push('/user/cart')}>
                                <ShoppingCartIcon />
                            </IconButton>
                        )}
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar
                                alt={user ? user.profile.name : "Guest"}
                                src={user ? user.profile.profpic : "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png"}
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for Side Menu */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, backgroundColor: "#fff", height: "100%", paddingTop: 2, marginLeft:3, marginRight:3 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {/* Logo inside Drawer */}
                    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        <img src="/logo/KSXpress.png" alt="KSXpress" style={{ height: "50px" }} />
                    </Box>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem 
                                key={item.label} 
                                disablePadding
                                sx={{ justifyContent: "center", marginBottom:1 }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => router.push(item.route)}
                                    sx={{
                                        backgroundColor: router.pathname === item.route ? "#1E90FF" : "#87CEFA",
                                        color: "#000",
                                        marginBottom: 1,
                                        textTransform: "none",
                                        fontWeight: router.pathname === item.route ? "bold" : "normal",
                                        fontSize:18,
                                        borderBottom: router.pathname === item.route ? "2px solid #000" : "none",
                                        "&:hover": {
                                            backgroundColor: "#00BFFF",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Profile Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {!auth.user ? (
                    <Box>
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                        <MenuItem onClick={handleRegister}>Register</MenuItem>
                    </Box>
                ) : (
                    <Box>
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Box>
                )}
            </Menu>
        </>
    );
}
