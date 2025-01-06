import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Divider } from "@mui/material";
import Navbar from "@/components/user/Navbar";
import formatRupiah from "@/tools/formatrupiah";

const HistoryTransactions = ({ transactions }) => {
    return (
        <>
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
                                padding: 2,
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h6" align="right" sx={{ color: "#000", fontWeight: "bold" }}>
                                {transaction.status}
                            </Typography>
                            <CardContent>
                                {transaction.products.map((product, index) => (
                                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <Avatar src={product.img} alt={product.productName} sx={{ width: 50, height: 50, mr: 2 }} />
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{product.productName}</Typography>
                                            <Typography variant="body2">x{product.qty}</Typography>
                                        </Box>
                                        <Box sx={{ ml: "auto", textAlign: "right" }}>
                                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>{formatRupiah(product.subtotal)}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography variant="body2">Total</Typography>
                                        <Typography variant="body2">Total Quantity</Typography>
                                        <Typography variant="body2">Payment</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: "right" }}>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>{formatRupiah(transaction.grandTotal)}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>{transaction.products.reduce((acc, product) => acc + product.qty, 0)}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>{transaction.payment}</Typography>
                                    </Box>
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
