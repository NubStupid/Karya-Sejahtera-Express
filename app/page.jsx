// ProductsPage.jsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/user/ProductCard";
import Navbar from "../components/user/Navbar";
import { Container, Grid, Typography, Box, CircularProgress } from "@mui/material";
import Chat from "@/components/Chat";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); 
            try {
                const response = await fetch("/api/getProduct");
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
                                Top Seller for today:
                            </Typography>
                            <Grid container spacing={2} sx={{ flex: 3 }}>
                                {products.slice(0, 3).map((product) => (
                                    <Grid item xs={4} key={product.productId}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

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
            {/* <Link href="/chat">
                <Fab className="fixed bottom-20 right-20 bg-blue-primary w-16 h-16 text-white">
                    <ChatIcon />
                </Fab>
            </Link> */}
            <Chat />
        </>
    );
};

export default ProductsPage;
