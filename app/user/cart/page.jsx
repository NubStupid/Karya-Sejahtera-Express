"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "@/components/user/Navbar";
import useAuth from "@/stores/store";
import CartItem from "@/components/user/CartItem";
import formatRupiah from "@/tools/formatrupiah";

const Cart = () => {
    const router = useRouter();
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!auth.user) {
            router.push("/login");
            return;
        }

        const fetchCart = async () => {
            try {
                const response = await fetch(`/api/user/getUserCart?username=${auth.user.username}`);
                const data = await response.json();
                setCart(data.cart);
                calculateTotal(data.cart);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCart();
    }, [auth.user]);

    useEffect(() => {
        const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const clientKey = process.env.MIDTRANS_CLIENT_KEY
        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key' , clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0);
        setTotal(totalAmount);
    };

    const updateQuantity = async (productId, newQty) => {
        const updatedCart = cart.map((item) =>
            item.productId === productId ? { ...item, qty: newQty } : item
        );
        setCart(updatedCart);
        calculateTotal(updatedCart);

        await fetch(`/api/user/updateCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: auth.user.username,
                productId,
                qty: newQty - cart.find((item) => item.productId === productId).qty,
            }),
        });
    };

    const deleteItem = async (productId) => {
        const updatedCart = cart.filter((item) => item.productId !== productId);
        setCart(updatedCart);
        calculateTotal(updatedCart);

        await fetch(`/api/user/deleteCartItem`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: auth.user.username,
                productId,
            }),
        });
    };

    const checkout = async () => {
        const data = {
            totalPrice: total
        }
        const res = await fetch('http://localhost:3000/api/transaction', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const req = await res.json()
        window.snap.pay(req.token)
    }

    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Cart</Typography>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item) => (
                            <CartItem
                                key={item.productId || item._id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onDeleteItem={deleteItem}
                            />
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3, padding: 2, backgroundColor: "#FFF3E0", borderRadius: "8px" }}>
                            <Typography variant="h5">Total {formatRupiah(total)}</Typography>
                            {/* <Button variant="contained" color="warning" onClick={() => router.push('/checkout')}> */}
                            <Button variant="contained" color="warning" onClick={checkout}>
                                Checkout ({cart.reduce((sum, item) => sum + item.qty, 0)})
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
                        <Typography variant="h6">Cart kosong, yuk isi cartnya di catalog!</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => router.push('/')}
                            sx={{ marginTop: 2 }}
                        >
                            Kembali ke Homepage
                        </Button>
                    </Box>
                )}
            </Container>
        </>
    );
};

export default Cart;
