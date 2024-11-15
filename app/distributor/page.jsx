"use client"
import { Box, Button, Card, CardContent, CardMedia, Stack, TextField, Typography  } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Form from 'next/form'
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Products()
{
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(0);
    const [detail, setDetail] = useState();
    const [image, setImage] = useState();
    const [edit, setEdit] = useState(0);

    const fetchData = async(id) => {        
        let res;
        if(id)
        {
            res = await fetch('http://localhost:3000/api/distributor/?id=' + id)
            res = await res.json()
            setDetail(res.products[0])
        }
        else
        {            
            res = await fetch('http://localhost:3000/api/distributor')
            res = await res.json()
            setProducts(res.products)
        }
    }

    useEffect(() => {
        fetchData(id);
    }, [id])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png") {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const base64String = reader.result;
                    setImage(base64String);
                };
            } else {
                alert("Hanya file JPG atau PNG yang diperbolehkan.");
                event.target.value = null;
            }
        }
    };

    const updateData = async (data) => {
        const productName = data.get("productName"), desc = data.get("desc"), price = data.get("price"), img = image;
        if(id)
        {
            await fetch('http://localhost:3000/api/distributor', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, productName, desc, price, img}),
            });
            setEdit(0);
            fetchData();
            fetchData(id);
        }
        else
        {
            let pid, username = "john_doe"
            pid = await fetch('http://localhost:3000/api/distributor', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, productName, desc, price, img}),
            });
            pid = await pid.json()
            setEdit(0);
            fetchData();
            setId(pid.id);
        }
    }

    const deleteData = async () => {
        await fetch('http://localhost:3000/api/distributor', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        setId(0)
        setDetail()
        setEdit(0)
    }
    
    return (
        <div className="flex h-5/6">
            <div className="bg-sky-200 p-10 ms-auto me-14 w-6/12 overflow-scroll rounded-md">
                {edit == 0 && 
                    <Button variant="contained" className="bg-orange-primary w-full" onClick={() => {setEdit(1), setId(0), setDetail(), setImage()}}>+ Add</Button>
                }
                
                {products && products.map((p) => {
                    return (
                        <Button key={p.productDId} sx={{mt: 2, p: 2}} className="bg-orange-secondary flex text-left w-full" onClick={() => {setEdit(0), setId(p.productDId), fetchData(p.productDId), setImage()}}>
                            <Box>
                                <Image
                                    src={p.img}
                                    alt={p.productName}
                                    width={100}
                                    height={100}
                                    objectFit="contain"
                                    style={{width: 120, height: 120}}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', textTransform: 'capitalize' }} className="text-black me-auto">
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="h6">
                                        {p.productName}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                    >
                                        {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", trailingZeroDisplay: "stripIfInteger"}).format(p.price)}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Button>
                    )
                })}
            </div>
            <div className="bg-sky-200 p-10 w-full me-auto rounded-md">
                {id == 0 && edit == 0 && 
                    <div className="text-center mt-52 text-gray-500">
                        <Typography variant="h4">
                            Pilih salah satu produk!
                        </Typography>
                    </div>
                }
                {edit == 1 &&
                    <div>
                        <Form action={updateData}>
                            <Typography variant="h4" sx={{mb: 3}}>
                                {id == 0 && "Add Product"}
                                {id != 0 && "Update Product"}
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    required fullWidth
                                    id="outlined-required"
                                    label="Nama"
                                    name="productName"
                                    variant="filled"
                                    className="mt-5 bg-white"
                                    defaultValue={detail && detail.productName}
                                />
                                <TextField
                                    required fullWidth
                                    id="outlined-required"
                                    label="Harga"
                                    name="price"
                                    variant="filled"
                                    className="bg-white mt-5"
                                    defaultValue={detail && detail.price}
                                />
                                <TextField
                                    required fullWidth
                                    id="outlined-required"
                                    label="Deskripsi"
                                    name="desc"
                                    variant="filled"
                                    className="bg-white mt-5"
                                    defaultValue={detail && detail.desc}
                                />
                                <div className="flex">
                                    <input type="file"
                                        accept="image/jpeg, image/png"
                                        name="img"
                                        style={{ display: 'none' }}
                                        id="upload-button"
                                        onChange={handleFileChange}
                                        required />
                                    <label htmlFor="upload-button" className="me-4">
                                        <Button variant="contained" component="span" className="bg-orange-primary">
                                            <FileUploadIcon /> Upload Image
                                        </Button>
                                    </label>
                                    {image &&
                                        <Image
                                            src={image}
                                            alt="uploaded image"
                                            height={150}
                                            width={150}
                                            objectFit="contain"
                                            style={{width: 200, height: 200}}
                                        /> 
                                    }
                                </div>
                            </Stack>
                            <div className="fixed bottom-24 right-20">
                                <Button variant="contained" className="bg-green-success" type="submit" onClick={() => {
                                    if(!image)
                                        alert("Gambar produk belum diupload!");
                                }}>Save</Button>
                                <Button variant="contained" sx={{ml: 1}} className="ms-3 bg-red-danger" onClick={() => setEdit(0)}>Cancel</Button>
                            </div>
                        </Form>
                    </div>
                }
                {edit == 0 && detail && 
                    <div>
                        <Typography variant="h4" className="font-semibold">
                            Detail Product
                        </Typography>
                        <div className="flex mt-3">
                            <div className="w-fit me-3">
                                <p className="mt-2">Nama</p>
                                <p className="mt-2">Harga</p>
                                <p className="mt-2">Deskripsi</p>
                                <p className="mt-2">Gambar</p>
                            </div>
                            <div>
                                <p className="mt-2">: {detail.productName}</p>
                                <p className="mt-2">: {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", trailingZeroDisplay: "stripIfInteger"}).format(detail.price)}</p>
                                <p className="mt-2">: {detail.desc}</p>
                                <p className="mt-2 flex">:
                                    <Image
                                        src={detail.img}
                                        alt={detail.productName}
                                        width={200}
                                        height={200}
                                        className="ms-1"
                                        objectFit="contain"
                                        style={{width: 200, height: 200}}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="fixed bottom-24 right-20">
                            <Button variant="contained" className="bg-green-success" onClick={() => {setEdit(1), setImage(detail.img)}}>Edit</Button>
                            <Button variant="contained" sx={{ml: 1}} className="bg-red-danger" onClick={deleteData}>Delete</Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}