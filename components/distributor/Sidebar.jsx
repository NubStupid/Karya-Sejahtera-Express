"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import UnreadChat from "../UnreadChat";
import useAuth from "@/stores/store";

export default function Sidebar()
{
    const path = usePathname();
    const auth = useAuth();

    const [ unread, setUnread ] = useState(0)
    const [ user, setUser ] = useState({username: auth.user.username, role: auth.user.role})

    return (
        <>
            <UnreadChat username={user.username} setUnread={setUnread} />
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                <h3><Link href="/distributor" className={path == "/distributor" ? "text-black" : ""}>Dashboard</Link></h3>
                <h3><Link href="/distributor/products" className={path == "/distributor/products" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/distributor/transaction" className={path.includes("/distributor/transaction") == true ? "text-black" : ""}>Transaction</Link></h3>
                {/* <h3><Link href="/distributor/request" className={path.includes("/distributor/request") == true  ? "text-black":""}>Request</Link></h3> */}
                <h3>
                    <Link href="/chat">
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

