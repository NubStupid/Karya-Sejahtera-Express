// components/products/CatalogCard.js
"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuth from "@/stores/store";

const CatalogCard = ({ product, onAddToCart }) => {
    const router = useRouter();
    const auth = useAuth();

    const handleViewProduct = () => {
        router.push(`/products/${product.productId}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!auth.user) {
            router.push("/login");
            return;
        }
        onAddToCart(product.productId);
    };

    return (
        <Card
            sx={{
                width: 200,
                height: 300,
                backgroundColor: "#FDD8A8",
                padding: 1,
                borderRadius: "8px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                ":hover": {
                    boxShadow: 6,
                },
            }}
            onClick={handleViewProduct}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 140,
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image={product.img || "/images/placeholder.png"}
                    alt={product.productName}
                    sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingTop: 2 }}>
                <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                >
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Rp{product.price.toLocaleString()}
                </Typography>
                <Box sx={{ mt: "auto" }}>
                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: "#FF914D",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            ":hover": {
                                backgroundColor: "#FF7A2C",
                            },
                            width: "100%",
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CatalogCard;
