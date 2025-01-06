'use client'
import React from "react";
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
export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(
                    "/api/admin/users"
                );
                const data = await resp.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (username) => {
        try {
            console.log("Username:  ", username);
            const resp = await fetch(
                'http://localhost:3000/api/admin/users',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username }),
                }
            )
    
            if (!resp.ok) {
                const errorData = await resp.json();
                alert('Error banning user:', errorData.error);
                return;
            }
    
            const data = await resp.json();
            console.log('User banned successfully:', data);
            window.location.reload();
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const handleUpdate = async (username) => {
        try {
            console.log('Username: ', username);
            const resp = await fetch(
                'http://localhost:3000/api/admin/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: username})
                }
            )

            if (!resp.ok){
                const errorData = await resp.json()
                alert('Error updating user: ', errorData.error)
                return
            }

            const data = await resp.json()
            console.log('User updated successfully: ', data);
            window.location.reload()
        } catch (error) {
            console.log('Error: ', error);
        }
    }
    return (
        <div>
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
                    {users.map((user, index) => (
                        <Card
                            key={index}
                            onClick={() => {
                                setSelectedUser(user);
                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 2,
                                backgroundColor: "#ffcc99",
                                cursor: "pointer",
                                padding: 3
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/productDistributors/Kerupuk_Puli.jpg"
                                alt={user.username}
                                sx={{ width: 128, height: 128, marginLeft: 1 }}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {user.username}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={0.2} />
                {/* Detail User */}
                <Grid
                    item
                    xs={7.8}
                    sx={{ backgroundColor: "#b3e0ff", padding: "3px" }}
                >
                    {selectedUser ? (
                        <div style={{ padding: "10px" }}>
                            <Typography variant="h3" gutterBottom>
                                Detail User
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px' }}>
                                <strong>Username:</strong>{" "}
                                {selectedUser.username}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Name:</strong> {selectedUser.profile.name}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Role:</strong> {selectedUser.role}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Email:</strong> {selectedUser.profile.email}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Phone:</strong> {selectedUser.profile.phone}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Address:</strong> {selectedUser.profile.address}
                            </Typography>
                            <Typography sx={{ fontSize: "24px", marginBottom: '10px'  }}>
                                <strong>Status:</strong> {selectedUser.active ? 'Active' : 'Banned'}
                            </Typography>
                            {
                                selectedUser.role == 'customer' ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2, marginLeft: 0, marginRight: 1, width: '20%'}}
                                        onClick={() =>
                                            handleUpdate(selectedUser.username)
                                        }
                                    >
                                        Make Distributor
                                    </Button>
                                ) : 
                                selectedUser.role == 'distributor' ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2, marginLeft: 0, marginRight: 1, width: '20%'}}
                                        onClick={() =>
                                            handleUpdate(selectedUser.username)
                                        }
                                    >
                                        Make Customer
                                    </Button>
                                ) :
                                (
                                    <div></div>
                                )
                            }
                            {
                                selectedUser.active ? (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ marginTop: 2, marginLeft: 0, width: '20%'}}
                                        onClick={() =>
                                            handleDelete(selectedUser.username)
                                        }
                                    >
                                        Ban
                                    </Button>
                                )
                                :
                                (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{ marginTop: 2, marginLeft: 0, width: '20%'}}
                                        onClick={() =>
                                            handleDelete(selectedUser.username)
                                        }
                                    >
                                        Unban
                                    </Button>
                                )
                            }
                        </div>
                    ) : (
                        <div></div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
