"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/user/ProductCard";
import Navbar from "../components/user/Navbar";
import { Container, Grid, Typography, Box, CircularProgress } from "@mui/material";
import Chat from "@/components/Chat";
import { useRouter } from "next/navigation";
import useAuth from "@/stores/store";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
        if(auth.user && auth.user.role == "admin")
            router.push('/admin');
        const fetchProducts = async () => {
            setIsLoading(true); 
            try {
                const response = await fetch("/api/products/getProduct");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
                console.log(data);
                
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: 4 }}>
                {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box 
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                                padding: 2,
                                borderRadius: "8px",
                                marginBottom: 4
                            }}
                        >
                            <Typography variant="h5" sx={{ flex: 1, textAlign: "left" }}>
                                Top Seller for Today:
                            </Typography>
                            <Grid container spacing={2} sx={{ flex: 3 }}>
                                {products.slice(0, 3).map((product) => (
                                    <Grid item xs={4} key={product.productId}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            All Products
                        </Typography>
                        <Grid container justifyContent="center" spacing={3}>
                            {products.map((product) => (
                                <Grid item xs={12} sm={6} md={3} key={product.productId} sx={{ display: "flex", justifyContent: "center" }}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>
            <Chat />
        </>
    );
};

export default MainPage;
