"use client";
import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@mui/material";

const products = [
    {
        name: "Kerupuk Puli",
        price: "Rp7.000",
        img: "/productDistriputors/Kerupuk Puli.jpg",
    },
    {
        name: "Kerupuk Udang",
        price: "Rp10.000",
        img: "/productDistriputors/Kerupuk Puli.jpg",
        stok: 103,
        desc: "Kerupuk udang Padi Kapas mentah 250 gram",
    },
    {
        name: "Kerupuk Putih",
        price: "Rp7.000",
        img: "/productDistriputors/Kerupuk Puli.jpg",
    },
    {
        name: "Kerupuk Unyil",
        price: "Rp11.000",
        img: "/productDistriputors/Kerupuk Puli.jpg",
    },
];

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(products[1]);

    return (
        <Grid container spacing={3} sx={{ padding: 2 }}>
            {/* Sidebar */}
            <Grid
                item
                xs={4}
                sx={{
                    backgroundColor: "#cce5ff",
                    padding: 3,
                    maxHeight: "80vh", // Tentukan tinggi maksimum agar bisa di-scroll
                    overflow: "auto",
                    height: "80vh",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginBottom: 2, backgroundColor: '#FF914D' }}
                >
                    + Add Product
                </Button>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        onClick={() => setSelectedProduct(product)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 2,
                            backgroundColor: "#ffcc99",
                            cursor: "pointer",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image='/logo/KSXpress.png'
                            alt={product.name}
                            sx={{ width: 64, height: 64, marginLeft: 1 }}
                        />
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography>{product.price}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
            <Grid item xs={0.2} />
            {/* Detail Product */}
            <Grid item xs={7.8} sx={{ backgroundColor: "#b3e0ff", padding: '3' }}>
                <Typography variant="h3" gutterBottom>
                    Detail Product
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    <strong>Name:</strong> {selectedProduct.name}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    <strong>Price:</strong> {selectedProduct.price}
                </Typography>
                {selectedProduct.stok && (
                    <Typography sx={{fontSize: '20px'}}>
                        <strong>Stok:</strong> {selectedProduct.stok}
                    </Typography>
                )}
                {selectedProduct.desc && (
                    <Typography sx={{fontSize: '20px'}}>
                        <strong>Desc:</strong> {selectedProduct.desc}
                    </Typography>
                )}
                <Box sx={{ marginTop: 2 }}>
                    <img
                        src={selectedProduct.img}
                        alt={selectedProduct.name}
                        style={{ width: "150px" }}
                    />
                </Box>
                <Button variant="contained" color="error" sx={{ marginTop: 2 }}>
                    Delete
                </Button>
            </Grid>
        </Grid>
    );
}
