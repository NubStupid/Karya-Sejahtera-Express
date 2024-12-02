"use client";

import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Avatar, Box, Container, IconButton, Modal, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import useAuth from "@/stores/store";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const EditProfile = () => {
    const router = useRouter();
    const auth = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        profilePic: "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png"
    });
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const cropperRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (auth.user) {
                    const response = await fetch(`/api/user/getUser?username=${auth.user.username}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData({
                            username: data.username,
                            name: data.profile.name,
                            email: data.profile.email,
                            phone: data.profile.phone,
                            address: data.profile.address,
                            password: "",
                            profilePic: data.profile.profpic
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [auth.user]);

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

            const result = await response.json();
            console.log("Result from server:", result);

            if (response.ok) {
                alert("Profile updated successfully!");
                auth.login({
                    username: auth.user.username,
                    role: auth.user.role,
                    profpic: userData.profilePic,
                });
                router.push("/");
            } else {
                const serverErrors = result.errors || {};
                setErrors(serverErrors);

                if (serverErrors.email) {
                    setUserData(prevData => ({ ...prevData, email: "" }));
                }
                if (serverErrors.phone) {
                    setUserData(prevData => ({ ...prevData, phone: "" }));
                }
                if (serverErrors.address) {
                    setUserData(prevData => ({ ...prevData, address: "" }));
                }
                if (serverErrors.password) {
                    setUserData(prevData => ({ ...prevData, password: "" }));
                }
                alert(`Error: ${JSON.stringify(serverErrors)}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Update failed. Please try again.");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file.");
                return;
            }
            if (file.size > 3145728) { // 3MB in bytes
                alert("File size should not exceed 3MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const getCroppedImage = () => {
        const cropper = cropperRef.current?.cropper; // Ensure cropper instance is available
        if (cropper) {
            const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
            setUserData((prevData) => ({
                ...prevData,
                profilePic: croppedImageUrl
            }));
            setOpen(false);  // Close the modal after cropping
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <Container maxWidth="md" sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={handleBack} sx={{ position: "absolute", top: 20, left: 20 }}>
                <ArrowBackIcon />
            </IconButton>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <img src="/logo/KSXpress.png" alt="KSXpress Logo" style={{ height: 60, marginBottom: 20 }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", p: 4, width: "100%", maxWidth: 800 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 8 }}>
                    <Avatar src={userData.profilePic} sx={{ width: 200, height: 200, mb: 2 }} />
                    <Button variant="outlined" component="label">
                        + Add Photo
                        <input type="file" hidden onChange={handleImageUpload} />
                    </Button>
                </Box>
                <Box sx={{ width: "100%", maxWidth: 400 }}>
                    <TextField
                        label="Username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button variant="contained" onClick={handleSave} fullWidth sx={{ mt: 2, backgroundColor: "#00A4FF" }}>
                        Edit
                    </Button>
                </Box>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" component="h2">
                        Crop Your Image
                    </Typography>
                    {image && (
                        <Cropper
                            src={image}
                            style={{ width: "100%", height: 400 }}
                            preview=".img-preview"
                            ref={cropperRef}
                            guides={false}
                        />
                    )}
                    <Button onClick={getCroppedImage} sx={{ mt: 2 }} variant="contained">
                        Crop and Save
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default EditProfile;
