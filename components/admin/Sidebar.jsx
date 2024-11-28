"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import UnreadChat from "../UnreadChat";

export default function Sidebar()
{
    const path = usePathname();
    const [ unread, setUnread ] = useState(0);

    return (
        <>
            <UnreadChat username="admin" setUnread={setUnread} />
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                <h3><Link href="/admin" className={path == "/admin" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/admin/transaction" className={path.includes("/admin/transaction") == true ? "text-black" : ""}>Transaction</Link></h3>
                <h3><Link href="/admin/request" className={path.includes("/admin/request") == true  ? "text-black":""}>Request</Link></h3>
                <h3><Link href="/admin/users" className={path == "/admin/users" ? "text-black" : ""}>Users</Link></h3>
                <h3>
                    <Link href="/admin/chat">
                        <div className="flex">
                            <p>Chat</p>
                            {unread > 0 && 
                                <p className="bg-orange-primary text-white rounded-full h-5 w-5 text-center text-sm ms-auto my-auto">{unread}</p>
                            }
                        </div>
                    </Link>
                </h3>
                
            </div>
        </>
    )
}

