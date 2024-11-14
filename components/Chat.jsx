import React, { useState } from "react";
import { Fab } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import Link from "next/link";
import useAuth from "@/stores/store";
import UnreadChat from "./UnreadChat";

export default function Chat() {
    const auth = useAuth();
    const [ unread, setUnread ] = useState(0)

    return (
        <>
            <div className="fixed bottom-20 right-20">
                <UnreadChat username={auth.user.username} setUnread={setUnread} />
                <Link href="/chat" style={{zIndex: 0}}>
                    <Fab className="bg-blue-primary w-16 h-16" sx={{color: "white", zIndex: 0}}>
                        <ChatIcon />
                        <p className="fixed bg-orange-primary text-white rounded-full h-5 w-5 text-center text-sm" style={{bottom: 117, right: 78}}>{unread}</p>
                    </Fab>
                </Link>
            </div>
        </>
    );
}
