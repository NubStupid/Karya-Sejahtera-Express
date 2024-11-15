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
import useAuth from "../../stores/store";

export default function Login() {
    const auth = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Login berhasil!");
                
                auth.login({username: result.data.username, role: result.data.role, profpic: result.data.profile.profpic});
                router.push("/");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Login gagal. Silakan coba lagi.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box sx={{ width: 300, height: 120, position: "relative" }}>
                    <Image src="/logo/KSXpress.png" alt="Logo" layout="fill" />
                </Box>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
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
                        Login
                    </Button>

                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="body2"
                    >
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                        >
                            Register here!
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
