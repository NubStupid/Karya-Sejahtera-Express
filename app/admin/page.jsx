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
    TextField,
} from "@mui/material";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(
                    "http://localhost:3000/api/admin/products"
                );
                const data = await resp.json();
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        fetchData();
    }, []);

    const [selectedProduct, setSelectedProduct] = useState();
    const [mode, setMode] = useState(0);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        desc: "",
        price: 0,
        stock: 0,
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeEdit = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSelectedProduct({
            ...selectedProduct,
            [name]: value,
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (
            formData.name == "" ||
            formData.price == 0 ||
            formData.stock == 0 ||
            formData.desc == "" ||
            file == null
        ) {
            alert("Semua field harus diisi!");
            return;
        }

        try {
            const resp = await fetch(
                "http://localhost:3000/api/admin/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productName: formData.productName,
                        desc: formData.desc,
                        price: formData.price,
                        img: file,
                        stock: formData.stock,
                    }),
                }
            );
            const data = await resp.json();
            if (resp.ok) {
                alert("Berhasil menambah data");
                window.location.reload();
            } else {
                alert("Error: " + data.error);
            }
        } catch (e) {
            alert("Error: ", e);
        }
    };
    const handleUpdate = async (productId) => {
        try {
            console.log("Product ID: ", productId);
            const resp = await fetch(
                "http://localhost:3000/api/admin/products",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: productId,
                        productName: selectedProduct.productName,
                        desc: selectedProduct.desc,
                        price: selectedProduct.price,
                        img: file,
                        stock: selectedProduct.stock,
                    }),
                }
            );
            if (!resp.ok) {
                const errorData = await resp.json();
                alert("Error updating product:", errorData.error);
                return;
            }
            const data = await resp.json();
            console.log("Product updated successfully:", data);
            // window.location.reload();
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    const handleDelete = async (productId) => {
        try {
            console.log("Product ID: ", productId);
            const resp = await fetch(
                "http://localhost:3000/api/admin/products",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId: productId }),
                }
            );

            if (!resp.ok) {
                const errorData = await resp.json();
                alert("Error deleting product:", errorData.error);
                return;
            }

            const data = await resp.json();
            console.log("Product deleted successfully:", data);
            window.location.reload();
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Cek format file (opsional, untuk validasi tambahan di JS)
            const validFormats = ["image/png", "image/jpeg"];
            if (validFormats.includes(selectedFile.type)) {
                // Konversi file ke Base64
                const reader = new FileReader();
                reader.onload = () => {
                    setFile(reader.result);
                    console.log(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                alert("Hanya file PNG atau JPG yang diperbolehkan.");
                setFile(null);
            }
        }
    };

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
                            setSelectedProduct(product);
                            setMode(0);
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
                            image={product.img}
                            alt={product.productName}
                            sx={{ width: 64, height: 64, marginLeft: 1 }}
                        />
                        <CardContent>
                            <Typography variant="h6">
                                {product.productName}
                            </Typography>
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
                {selectedProduct && mode == 0 ? (
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
                            <img src="" alt="" style={{ width: "150px" }} />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            onClick={() => setMode(2)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 2, marginLeft: 1 }}
                            onClick={() =>
                                handleDelete(selectedProduct.productId)
                            }
                        >
                            Delete
                        </Button>
                    </div>
                ) : (!selectedProduct || selectedProduct) && mode == 1 ? (
                    <div style={{ padding: "10px" }}>
                        <Typography variant="h3" gutterBottom>
                            Add Product
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleAdd}>
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="productName"
                                    id="productName"
                                    autoFocus
                                    fullWidth
                                    label="Product Name"
                                    onChange={handleChange}
                                    value={formData.productName}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="price"
                                    id="price"
                                    label="Price"
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.price}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="stock"
                                    id="stock"
                                    label="Stock"
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.stock}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="desc"
                                    id="desc"
                                    label="Description"
                                    fullWidth
                                    onChange={handleChange}
                                    value={formData.desc}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    type="file"
                                    name="img"
                                    id="img"
                                    fullWidth
                                    inputProps={{
                                        accept: "image/png, image/jpeg",
                                    }}
                                    onChange={handleFileChange}
                                />
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
                        </Box>
                    </div>
                ) : mode == 2 ? (
                    <div style={{ padding: "10px" }}>
                        <Typography variant="h3" gutterBottom>
                            Edit Product
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleUpdate(selectedProduct.productId)}
                        >
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="productName"
                                    id="productName"
                                    autoFocus
                                    fullWidth
                                    label="Product Name"
                                    onChange={handleChangeEdit}
                                    value={selectedProduct.productName}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="price"
                                    id="price"
                                    label="Price"
                                    fullWidth
                                    onChange={handleChangeEdit}
                                    value={selectedProduct.price}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="stock"
                                    id="stock"
                                    label="Stock"
                                    fullWidth
                                    onChange={handleChangeEdit}
                                    value={selectedProduct.stock}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    name="desc"
                                    id="desc"
                                    label="Description"
                                    fullWidth
                                    onChange={handleChangeEdit}
                                    value={selectedProduct.desc}
                                />
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: "20px" }}>
                                <TextField
                                    type="file"
                                    name="img"
                                    id="img"
                                    fullWidth
                                    inputProps={{
                                        accept: "image/png, image/jpeg",
                                    }}
                                    onChange={handleFileChange}
                                />
                            </Typography>
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                                type="submit"
                            >
                                Edit
                            </Button>
                        </Box>
                    </div>
                ) : (
                    <div></div>
                )}
            </Grid>
        </Grid>
    );
}
