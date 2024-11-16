import React, { useState } from "react";
import { Fab } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import Link from "next/link";
import useAuth from "@/stores/store";
import UnreadChat from "./UnreadChat";

export default function Chat() {
    const auth = useAuth();
    const [unread, setUnread] = useState(0);

    if (!auth.user) {
        return null;
    }

    return (
        <>
            <div className="fixed bottom-20 right-20">
                {auth.user.role == "admin" && <UnreadChat username="admin" setUnread={setUnread} />}
                {auth.user.role != "admin" && <UnreadChat username={auth.user.username} setUnread={setUnread} />}
                <Link href="/chat" style={{ zIndex: 0 }}>
                    <Fab className="bg-blue-primary w-16 h-16" sx={{ color: "white", zIndex: 0 }}>
                        <ChatIcon />
                        {unread > 0 && 
                            <p className="fixed bg-orange-primary text-white rounded-full h-6 w-6 text-center" style={{ bottom: 115, right: 75 }}>
                                {unread}
                            </p>
                        }
                    </Fab>
                </Link>
            </div>
        </>
    );
}
