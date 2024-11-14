import React from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import formatRupiah from "@/tools/formatrupiah";

const CartItem = ({ item, onUpdateQuantity, onDeleteItem }) => {
    const handleIncrease = () => {
        const newQty = Math.min(item.qty + 1, 20);
        onUpdateQuantity(item.productId, newQty);
    };

    const handleDecrease = () => {
        const newQty = Math.max(item.qty - 1, 1);
        onUpdateQuantity(item.productId, newQty);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const qty = Math.max(1, Math.min(20, Number(value) || 1)); // Ensure within 1-20
        onUpdateQuantity(item.productId, qty);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E0F7FA",
                padding: 2,
                borderRadius: "8px",
                marginBottom: 2,
            }}
        >
            <IconButton onClick={() => onDeleteItem(item.productId)}>
                <Delete />
            </IconButton>
            <Box
                component="img"
                src={item.img}
                alt={item.productName}
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "8px",
                    marginRight: 2,
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="body1">{formatRupiah(item.price)}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleDecrease} disabled={item.qty <= 1}>
                    <Remove />
                </IconButton>
                <TextField
                    value={item.qty}
                    onChange={handleQuantityChange}
                    inputProps={{
                        pattern: "[0-9]*",
                    }}
                    sx={{ width: 50, margin: "0 8px", textAlign: "center" }}
                />
                <IconButton onClick={handleIncrease} disabled={item.qty >= 20}>
                    <Add />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CartItem;
