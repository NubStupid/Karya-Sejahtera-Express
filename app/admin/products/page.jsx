"use client";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@mui/material";

// const products = [
//     {
//         name: "Kerupuk Puli",
//         price: "Rp7.000",
//         img: "/productDistributors/Kerupuk_Puli.jpg",
//     },
//     {
//         name: "Kerupuk Udang",
//         price: "Rp10.000",
//         img: "/productDistributors/Kerupuk_Puli.jpg",
//         stok: 103,
//         desc: "Kerupuk udang Padi Kapas mentah 250 gram",
//     },
//     {
//         name: "Kerupuk Putih",
//         price: "Rp7.000",
//         img: "/productDistributors/Kerupuk_Puli.jpg",
//     },
//     {
//         name: "Kerupuk Unyil",
//         price: "Rp11.000",
//         img: "/productDistributors/Kerupuk_Puli.jpg",
//     },
// ];

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("http://localhost:3000/api/admin/products");
                const data = await resp.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        fetchData()
    } ,[]);
    
    const [selectedProduct, setSelectedProduct] = useState();
    const [mode, setMode] = useState(0)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stok, setStok] = useState(0)
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')

    const handleAdd = async (e) => {
        e.preventDefault()

        try{
            const resp = await fetch('http://localhost:3000/api/admin/products',{
                method: 'POST',
                body: {
                    productName: name,
                    desc: desc,
                    price: price,
                    img: img,
                    stock: stok
                },
            })
            const data = await resp.json();
            if(resp.ok){
                setName('');
                setDesc('');
                setPrice('');
                setImg('');
                setStok('');
            }
            else{
                alert("Error")
            }
        } catch(e){
            alert(e)
        }
    }

    return (
        <Grid container spacing={3} sx={{ padding: 2 }}>
            {/* Sidebar */}
            <Grid
                item
                xs={4}
                sx={{
                    backgroundColor: "#cce5ff",
                    padding: 3,
                    maxHeight: "80vh",
                    overflow: "auto",
                    height: "80vh",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginBottom: 2, backgroundColor: "#FF914D" }}
                    onClick={() => setMode(1)}
                >
                    + Add Product
                </Button>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        onClick={() => {
                            setSelectedProduct(product)
                            setMode(0)
                        }}
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
                            image="/productDistributors/Kerupuk_Puli.jpg"
                            alt={product.productName}
                            sx={{ width: 64, height: 64, marginLeft: 1 }}
                        />
                        <CardContent>
                            <Typography variant="h6">{product.productName}</Typography>
                            <Typography>{product.price}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
            <Grid item xs={0.2} />
            {/* Detail Product */}
            <Grid
                item
                xs={7.8}
                sx={{ backgroundColor: "#b3e0ff", padding: "3px" }}
            >
                {
                    selectedProduct && mode == 0 ? (
                        <div style={{ padding: "10px" }}>
                            <Typography variant="h3" gutterBottom>
                                Detail Product
                            </Typography>
                            <Typography sx={{ fontSize: "20px" }}>
                                <strong>Name:</strong> {selectedProduct.productName}
                            </Typography>
                            <Typography sx={{ fontSize: "20px" }}>
                                <strong>Price:</strong> {selectedProduct.price}
                            </Typography>
                            <Typography sx={{ fontSize: "20px" }}>
                                <strong>Stok:</strong> {selectedProduct.stock}
                            </Typography>
                            <Typography sx={{ fontSize: "20px" }}>
                                <strong>Desc:</strong> {selectedProduct.desc}
                            </Typography>
                            <Box sx={{ marginTop: 2 }}>
                                <img
                                    src=''
                                    alt=''
                                    style={{ width: "150px" }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginTop: 2 }}
                            >
                                Delete
                            </Button>
                        </div>
                    ) :
                    (!selectedProduct || selectedProduct) && mode == 1 ?
                    (
                        <div style={{ padding: "10px" }}>
                            <Typography variant="h3" gutterBottom>
                                Add Product
                            </Typography>
                            <form onSubmit={handleAdd}>
                                <Typography sx={{ fontSize: "20px" }}>
                                    <strong>Name:</strong> <input type="text" name="" id="" onChange={(e) => setName(e.target.value)}/>
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: "20px" }}>
                                    <strong>Price:</strong> <input type="text" name="" id="" onChange={(e) => setPrice(e.target.value)}/>
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: "20px" }}>
                                    <strong>Stok:</strong> <input type="text" name="" id="" onChange={(e) => setStok(e.target.value)}/>
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: "20px" }}>
                                    <strong>Desc:</strong> <input type="text" name="" id="" onChange={(e) => setDesc(e.target.value)}/>
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: "20px" }}>
                                    <strong>Image:</strong> <input type="text" name="" id="" onChange={(e) => setImg(e.target.value)}/>
                                </Typography>
                                <br />
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ marginTop: 2 }}
                                    type="submit"
                                >
                                    Add
                                </Button>
                            </form>
                        </div>
                    ) :
                    (
                        <div></div>
                    )
                }
            </Grid>
        </Grid>
    );
}
