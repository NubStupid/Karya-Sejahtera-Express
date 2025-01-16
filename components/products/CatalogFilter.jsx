// components/products/CatalogFilter.js
import React from "react";
import { Box, TextField, Slider, Typography, Button } from "@mui/material";
import formatRupiah from "@/tools/formatrupiah";

const CatalogFilter = ({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
    return (
        <Box sx={{ padding: 2, backgroundColor: "#F0F0F0", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>Search</Typography>
            <TextField
                placeholder="Search by name"
                variant="filled"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>Filter</Typography>

            {/* Minimum Price Slider */}
            <Typography variant="body2">Minimum price</Typography>
            <Slider
                value={minPrice}
                onChange={(e, value) => setMinPrice(value)}
                min={0}
                max={100000}
                step={1000}
                sx={{ mb: 1 }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
                {formatRupiah(minPrice)}
            </Typography>

            {/* Maximum Price Slider */}
            <Typography variant="body2">Maximum price</Typography>
            <Slider
                value={maxPrice}
                onChange={(e, value) => setMaxPrice(value)}
                min={0}
                max={100000}
                step={1000}
                sx={{ mb: 1 }}
            />
            <Typography variant="body2">
                {formatRupiah(maxPrice)}
            </Typography>
        </Box>
    );
};

export default CatalogFilter;
