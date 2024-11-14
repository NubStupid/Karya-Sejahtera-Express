import React, { useState } from "react";
import { AppBar, Fab, Toolbar, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from '@mui/icons-material/Chat';
import Link from "next/link";
import UnreadChat from "./UnreadChat";
import useAuth from "@/stores/store";

export default function Chat() {
    const auth = useAuth();
    const [ unread, setUnread ] = useState(0)
    const [ user, setUser ] = useState({username: auth.user.username, role: auth.user.role})

    return (
        <>
            <UnreadChat username={user.username} setUnread={setUnread} />
            <Link href="/chat">
                <Fab className="fixed bottom-20 right-20 bg-blue-primary w-16 h-16 text-white">
                    <ChatIcon />
                </Fab>
            </Link>
        </>
    );
}
