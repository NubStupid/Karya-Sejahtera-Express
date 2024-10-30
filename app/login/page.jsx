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

export default function Login() {
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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