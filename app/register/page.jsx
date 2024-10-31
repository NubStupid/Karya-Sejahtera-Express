'use client'
import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    Container,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password dan Confirm Password tidak sama");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    role: "user",
                    profile: {
                        name: formData.name,
                        profpic: 'y',
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                    },
                    active: true,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Registrasi berhasil!");
                router.push("/login");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Registrasi gagal. Silakan coba lagi.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box sx={{ width: 300, height: 120, position: "relative" }}>
                    <Image src="/logo/KSXpress.png" alt="Logo" layout="fill" />
                </Box>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: "#ADD8E6",
                            color: "white",
                            "&:hover": { bgcolor: "#87CEEB" },
                        }}
                    >
                        Register
                    </Button>

                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="body2"
                    >
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                        >
                            Login here!
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
