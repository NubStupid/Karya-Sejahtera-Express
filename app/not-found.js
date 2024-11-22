'use client'
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function Custom404() {
    const router = useRouter();
    router.push('/');
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
        </Box>
    )
}