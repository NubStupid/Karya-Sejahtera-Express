"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HistoryTransactions from "@/components/transactions/HistoryTransactions";
import useAuth from "@/stores/store";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "@/components/user/Navbar";

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.user) {
            router.push("/login");
            return;
        }

        const fetchTransactions = async () => {
            try {
                const transactionResponse = await fetch(`/api/transactions/getTransactions?username=${auth.user.username}`);
                if (!transactionResponse.ok) throw new Error("Failed to fetch transactions");
                const transactionsData = await transactionResponse.json();

                const productResponse = await fetch(`/api/products/getProduct`);
                if (!productResponse.ok) throw new Error("Failed to fetch products");
                const productsData = await productResponse.json();

                const enrichedTransactions = transactionsData.map(transaction => {
                    const enrichedProducts = transaction.products.map(product => {
                        const productDetails = productsData.find(p => p.productId === product.productId) || {};
                        return {
                            ...product,
                            productName: productDetails.productName || product.productId,
                            img: productDetails.img || "/path-to-placeholder-image.png",
                        };
                    });
                    return { ...transaction, products: enrichedProducts };
                });

                setTransactions(enrichedTransactions);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchTransactions();
    }, [auth.user, router]);

    return (
        <>
        <div>
            <Navbar/>
            {transactions.length > 0 ? (
                <HistoryTransactions transactions={transactions} />
            ) : (
                <Box
                    sx={{
                        textAlign: "center",
                        marginTop: 5,
                        padding: 3,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        History Transaksi tidak ada!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/catalog")}
                        sx={{ textTransform: "none", backgroundColor: "#00A4FF" }}
                    >
                        Mulai Belanja
                    </Button>
                </Box>
            )}
        </div>
        </>
    );
};

export default HistoryPage;
