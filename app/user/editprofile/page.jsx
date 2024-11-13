// components/user/EditProfile.jsx
"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Avatar, Box, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        profilePic: "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png" // Placeholder default image
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/getUser?username=jane_smith`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        username: data.username,
                        name: data.profile.name,
                        email: data.profile.email,
                        phone: data.profile.phone,
                        address: data.profile.address,
                        password: "", // Kosongkan password untuk keamanan
                        profilePic: data.profile.profpic
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleBack = () => {
        router.back();
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/user/updateUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
                router.push("/"); // Redirect to homepage or another page
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Logo Section in Center */}
            <IconButton onClick={handleBack} sx={{ position: "absolute", top: 20, left: 20 }}>
                <ArrowBackIcon />
            </IconButton>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <img src="/logo/KSXpress.png" alt="KSXpress Logo" style={{ height: 60, marginBottom: 20 }} />
            </Box>

            {/* Profile Edit Section */}
            <Box sx={{ display: "flex", alignItems: "center", p: 4, width: "100%", maxWidth: 800 }}>
                
                {/* Left Section: Profile Picture */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 8 }}>
                    <Avatar src={userData.profilePic} sx={{ width: 200, height: 200, mb: 2 }} />
                    <Button variant="outlined" component="label">
                        + Add Photo
                        <input type="file" hidden onChange={(e) => setUserData({ ...userData, profilePic: URL.createObjectURL(e.target.files[0]) })} />
                    </Button>
                </Box>
                
                {/* Right Section: User Info Form */}
                <Box sx={{ width: "100%", maxWidth: 400 }}>
                    <TextField
                        label="Username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleSave} fullWidth sx={{ mt: 2, backgroundColor: "#00A4FF" }}>
                        Edit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditProfile;
