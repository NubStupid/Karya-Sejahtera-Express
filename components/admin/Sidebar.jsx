"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import UnreadChat from "../UnreadChat";

export default function Sidebar()
{
    const path = usePathname();
    const [ unread, setUnread ] = useState(0);

    // const fetchChat = async () => {
    //     let chats = await fetch('http://localhost:3000/api/general/chats')
    //     chats = await chats.json()
    //     chats = chats.chats

    //     chats.forEach((c) => {
    //         if(c.messages.length > 0)
    //         {
    //             let ctr = c.messages.length - 1;
    //             while(ctr >= 0 && c.messages[ctr].read == false && c.messages[ctr].sender == "user")
    //             {
    //                 setUnread((u) => u+1);
    //                 ctr--;
    //             }
    //         }
    //     })
    // }

    // useEffect(() => {
    //     fetchChat();
    // }, [])

    // useEffect(() => {
    //     let socket = io('/admin');
        
    //     socket.on('connect', () => {
    //       console.log('Admin connected to server');
    //     });

    //     socket.on('new_user_message', () => {
    //         setUnread((u) => u+1);
    //     });
    
    //     return () => {
    //       socket.disconnect();
    //     };
    // }, []);
    return (
        <>
            <UnreadChat username="admin" setUnread={setUnread} />
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                {/* <h3><Link href="/admin" className={path == "/admin" ? "text-black" : ""}>Dashboard</Link></h3> */}
                <h3><Link href="/admin" className={path == "/admin" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/admin/transaction" className={path.includes("/admin/transaction") == true ? "text-black" : ""}>Transaction</Link></h3>
                <h3><Link href="/admin/request" className={path.includes("/admin/request") == true  ? "text-black":""}>Request</Link></h3>
                <h3><Link href="/admin/users" className={path == "/admin/users" ? "text-black" : ""}>Users</Link></h3>
                <h3>
                    {/* <Link href="/admin/chat" className={path == "/admin/chat" ? "text-black" : ""}>Chats</Link> */}
                    <Link href="/admin/chat">
                        <div className="flex">
                            <p>Chat</p>
                            {unread > 0 && 
                                <p className="bg-orange-primary text-white rounded-full h-6 w-6 text-center text-xs ms-auto my-auto p-1">{unread}</p>
                            }
                        </div>
                    </Link>
                </h3>
                
            </div>
        </>
    )
}

