// pages/catalog.js
"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "@/components/user/Navbar";
import CatalogFilter from "@/components/products/CatalogFilter";
import CatalogCard from "@/components/products/CatalogCard";
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const auth = useAuth();
    const router = useRouter();

    const fetchProducts = async () => {
        const queryParams = new URLSearchParams({
            search,
            minPrice,
            maxPrice
        }).toString();

        const response = await fetch(`/api/products/getCatalogProducts?${queryParams}`);
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, [search, minPrice, maxPrice]);

    const handleAddToCart = async (productId) => {
        if (!auth.user) {
            router.push("/login");
            return;
        }

        await fetch(`/api/user/addToCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: auth.user.username,
                productId,
                qty: 1,
            }),
        });
        alert("Added to cart");
    };

    return (
        <>
            <Navbar />
            <Container sx={{ display: "flex", marginTop: 4 }}>
                <Box sx={{ width: "25%", marginRight: 4 }}>
                    <CatalogFilter
                        search={search}
                        setSearch={setSearch}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                    />
                </Box>
                <Box sx={{ width: "75%" }}>
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4}>
                                <CatalogCard product={product} onAddToCart={handleAddToCart} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Catalog;
