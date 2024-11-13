"use client"; 

import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation"; 

const ProductCard = ({ product }) => {
    const router = useRouter();

    const handleViewProduct = () => {
        router.push(`/products/${product.productId}`);
    };
    
    return (
        <Card
            sx={{
                width: 200,
                height: 300, // Consistent card height
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
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 140, // Fixed height for image container
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
                <Box sx={{ mt: "auto" }}> {/* Ensures button stays at the bottom */}
                    <Button
                        variant="contained"
                        onClick={handleViewProduct}
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
                        View
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
