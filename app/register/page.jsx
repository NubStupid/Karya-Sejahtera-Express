'use client';

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
import Joi from "joi";

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

    const [errors, setErrors] = useState({});

    // Joi validation schema
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().messages({
            "string.empty": "Username harus diisi.",
            "string.min": "Username minimal 3 karakter.",
            "string.max": "Username maksimal 30 karakter.",
        }),
        name: Joi.string().min(3).required().messages({
            "string.empty": "Nama harus diisi.",
            "string.min": "Nama minimal 3 karakter.",
        }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": "Email harus diisi.",
            "string.email": "Format email tidak valid.",
        }),
        phone: Joi.string()
            .pattern(/^\+?\d{10,15}$/)
            .required()
            .messages({
                "string.empty": "Nomor telepon harus diisi.",
                "string.pattern.base": "Nomor telepon harus terdiri dari 10-15 digit.",
            }),
        address: Joi.string().required().messages({
            "string.empty": "Alamat harus diisi.",
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": "Kata sandi harus diisi.",
            "string.min": "Kata sandi minimal 6 karakter.",
        }),
        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Konfirmasi kata sandi tidak cocok.",
                "string.empty": "Konfirmasi kata sandi harus diisi.",
            }),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset error field on change
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach((detail) => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    role: "customer",
                    profile: {
                        name: formData.name,
                        profpic: "conto", // Default profile picture
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
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nama"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        error={!!errors.name}
                        helperText={errors.name}
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
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Nomor Telepon"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Alamat"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Kata Sandi"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Konfirmasi Kata Sandi"
                        type="password"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
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
                        Daftar
                    </Button>

                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="body2"
                    >
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                        >
                            Login di sini!
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
