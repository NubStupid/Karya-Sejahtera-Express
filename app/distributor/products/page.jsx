"use client"
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography  } from "@mui/material";
import Form from 'next/form'
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Products()
{
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();
    const [detail, setDetail] = useState();
    const [edit, setEdit] = useState(0);

    const fetchData = async() => {
        
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

    const updateData = async (data) => {
        const productName = data.get("productName"), desc = data.get("desc"), price = data.get("price"), img = data.get("img");
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
        <div className="flex h-full">
            <div className="bg-sky-200 p-10 ms-auto me-14 w-6/12 overflow-scroll rounded-md">
                <Button variant="contained bg-orange-primary w-full" onClick={() => {setEdit(1), setId(0), setDetail()}}>+ Add</Button>
                {/* <button className="bg-orange-primary py-2 w-full rounded-md">+ Add</button> */}
                {/* {console.log(data.products)} */}
                {/* console.log(products); */}
                
                {products && products.map((p) => {
                    return (
                        <Button key={p.productDId} sx={{ display: 'flex' }} className="mt-5 bg-orange-secondary p-3" onClick={() => {setEdit(0), setId(p.productDId), fetchData(p.productDId)}}>
                            <Box>
                                {/* component="img"
                                sx={{ width: 100 }}
                                image="/productDistributors/Kerupuk Puli.jpg"
                                alt="Live from space album cover" */}
                                <Image
                                    src="/productDistributors/Kerupuk Puli.jpg"
                                    alt={p.productName}
                                    width={200}
                                    height={200}
                                    // objectFit="contain" // Ensures the image fits within the box
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6">
                                        {p.productName}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR", trailingZeroDisplay: "stripIfInteger"}).format(p.price)}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Button>
                    )
                })}
            </div>
            <div className="bg-sky-200 p-10 w-full me-auto">
                {id == 0 && edit == 0 && 
                    <div className="text-center align-middle">
                        <Typography variant="h4">
                            Pilih salah satu produk!
                        </Typography>
                    </div>
                }
                {edit == 1 &&
                    <div>
                        <Form action={updateData}>
                            <Typography variant="h4">
                                {id == 0 && "Add Product"}
                                {id != 0 && "Update Product"}
                            </Typography>
                            <h4></h4>
                            <TextField
                                required fullWidth
                                id="outlined-required"
                                label="Nama"
                                name="productName"
                                variant="filled"
                                className="mt-5 bg-white"
                                defaultValue={detail && detail.productName}
                                //     input: {
                                    // slotProps={{
                                //         disableUnderline: true
                                //     },
                                // }}
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
                                label="Image"
                                name="img"
                                variant="filled"
                                className="bg-white mt-5"
                                defaultValue={detail && detail.img}
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
                            <div className="mt-36 text-right">
                                <Button variant="contained" className="bg-green-500 ms-auto" type="submit">Save</Button>
                                <Button variant="contained" className="ms-3 bg-red-600" onClick={() => setEdit(0)}>Cancel</Button>
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
                                <p className="mt-2">: {detail.price}</p>
                                <p className="mt-2">: {detail.desc}</p>
                                <p className="mt-2 flex">:
                                    <Image
                                        src={detail.img}
                                        alt={detail.productName}
                                        width={200}
                                        height={200}
                                        className="ms-1"
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="mt-36 text-right">
                            <Button variant="contained" className="bg-green-500" onClick={() => setEdit(1)}>Edit</Button>
                            <Button variant="contained" className="ms-3 bg-red-600" onClick={deleteData}>Delete</Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}