import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ResponsiveButton from "../ResponsiveButton";
import ResponsiveImage from "../ResponsiveImage";
import useAuth from "@/stores/store";

export default function Navbar() {
    const auth = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.user && auth.user.username) {
                try {
                    const response = await fetch(`/api/user/getUser?username=${auth.user.username}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [auth.user]);

    return (
        <>
            <div className="grid grid-cols-7 bg-orange-primary w-[100vw] p-5">
                <div className="texl-xl flex justify-center">
                    <ResponsiveImage src="/logo/KSXpress_monochrome.png" alt="KS Distributor" />
                </div>
                <div className="texl-xl col-start-6 flex justify-end ms-5">
                    <ResponsiveButton placeholder={"Logout"} href={"/logout"} />
                </div>
                <div className="texl-xl flex justify-center">
                    <Avatar
                        alt={user ? user.profile.name : "Guest"}
                        src={user ? user.profile.profpic : ""}
                        sx={{ width: 50, height: 50 }}
                    />
                </div>
            </div>
        </>
    );
}
