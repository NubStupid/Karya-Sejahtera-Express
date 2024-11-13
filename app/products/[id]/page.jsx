// /pages/products/[id]/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Typography, Button, Box, CardMedia, Grid, CircularProgress } from "@mui/material";
import Navbar from "@/components/user/Navbar";

const ProductDetail = () => {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Menambahkan state isLoading
    const user = ""; 

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    // Fungsi untuk mengambil data produk dan produk terkait dari API
    const fetchProductData = async (productId) => {
        setIsLoading(true); // Mulai loading
        try {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }

            const data = await response.json();
            setProduct(data.product);
            setRelatedProducts(data.relatedProducts);
        } catch (error) {
            console.error("Error fetching product data:", error);
        } finally {
            setIsLoading(false); // Selesai loading
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            router.push("/login");
        } else {
            alert("Product added to cart!");
        }
    };

    // Tampilkan loading spinner jika sedang memuat data
    if (isLoading) {
        return (
            <>
                <Navbar />
                <Container sx={{ marginTop: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </>
        );
    }

    // Jika produk tidak ditemukan
    if (!product) return <p>Product not found</p>;

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <CardMedia
                        component="img"
                        image={product.img || "/images/placeholder.png"}
                        alt={product.productName}
                        sx={{
                            width: 300,
                            height: 300,
                            borderRadius: "8px",
                            boxShadow: 2,
                        }}
                    />
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            {product.productName}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {product.desc}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                            Rp {product.price}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
                
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
                    Related Products
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {relatedProducts.map((related) => (
                        <Grid item xs={6} sm={4} md={3} key={related.productId}>
                            <Box
                                sx={{
                                    backgroundColor: "#FDD8A8",
                                    padding: 1,
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    boxShadow: 1,
                                    cursor: "pointer",
                                    ":hover": { boxShadow: 3 },
                                }}
                                onClick={() => router.push(`/products/${related.productId}`)}
                            >
                                <CardMedia
                                    component="img"
                                    image={related.img || "/images/placeholder.png"}
                                    alt={related.productName}
                                    sx={{ height: 140, objectFit: "cover", borderRadius: "8px" }}
                                />
                                <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                    {related.productName}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetail;
