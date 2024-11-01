// ProductCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
    return (
        <Card sx={{
            width: 200,
            backgroundColor: "#FFA07A",
            borderRadius: "8px",
            padding: 1,
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}>
            <CardMedia
                component="img"
                image={product.img}
                alt={product.productName}
                sx={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {product.productName}
                </Typography>
            </CardContent>
            <Button variant="contained" color="warning" sx={{ borderRadius: "8px", marginBottom: 1 }}>
                View
            </Button>
        </Card>
    );
};

export default ProductCard;
