import React from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    Container,
} from "@mui/material";
import Image from "next/image";

export default function Register() {
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
                {/* Logo */}
                <Box sx={{ width: 300, height: 120, position: "relative" }}>
                    <Image src="/logo/KSXpress.png" alt="..." layout="fill" />
                </Box>

                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
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
