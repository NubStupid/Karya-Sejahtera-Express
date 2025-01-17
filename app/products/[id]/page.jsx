// /pages/products/[id]/page.js
'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Typography, Button, Box, CardMedia, Grid, CircularProgress, IconButton } from "@mui/material";
import Navbar from "@/components/user/Navbar";
import useAuth from "@/stores/store"; // Import your auth store
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import formatRupiah from "@/tools/formatrupiah";

const ProductDetail = () => {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const auth = useAuth(); // Get auth data
    const user = auth.user;

    useEffect(() => {
        if(auth.user && auth.user.role == "admin")
            router.push('/admin');
    }, []);

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    // Function to fetch product and related product data from the API
    const fetchProductData = async (productId) => {
        setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            router.push('/login');
        } else {
            try {
                const response = await fetch('/api/user/addToCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.username,
                        productId: product.productId,
                        qty: quantity,
                    }),
                });

                if (response.ok) {
                    alert('Product added to cart!');
                    setQuantity(1); // Reset quantity to 1 after adding to cart
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        }
    };

    const handleIncrement = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

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
                            {formatRupiah(product.price)}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Stock: {product.stock}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ mx: 2 }}>
                                {quantity}
                            </Typography>
                            <IconButton onClick={handleIncrement} disabled={quantity >= product.stock}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
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
