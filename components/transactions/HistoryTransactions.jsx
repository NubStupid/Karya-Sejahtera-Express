import React from "react";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import Navbar from "@/components/user/Navbar";
import formatRupiah from "@/tools/formatRupiah";

const HistoryTransactions = ({ transactions }) => {
    return (
        <>
            <Navbar />
            <Box sx={{ padding: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>History Transaction</Typography>
                {transactions.map((transaction) => (
                    <Box key={transaction.transId} sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#555" }}>
                            {new Date(transaction.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </Typography>
                        <Card 
                            sx={{
                                backgroundColor: transaction.status === "Success" ? "#C8FACD" : transaction.status === "Pending" ? "#FFF59D" : "#FFE7D9",
                                mt: 1,
                                padding: 2
                            }}
                        >
                            <CardContent>
                                {transaction.products.map((product, index) => (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <Avatar src={product.img || "/path-to-placeholder-image.png"} alt={product.productId} sx={{ width: 50, height: 50, mr: 2 }} />
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{product.productId}</Typography>
                                            <Typography variant="body2">x{product.qty}</Typography>
                                        </Box>
                                        <Box sx={{ ml: "auto", textAlign: "right" }}>
                                            <Typography variant="body2">{formatRupiah(product.subtotal)}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid #ddd" }}>
                                    <Typography variant="body2">Total: {formatRupiah(transaction.grandTotal)}</Typography>
                                    <Typography variant="body2">Status: {transaction.status}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default HistoryTransactions;
