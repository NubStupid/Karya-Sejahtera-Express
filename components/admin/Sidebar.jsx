"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar()
{
    const path = usePathname();
    return (
        <>
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                {/* <h3><Link href="/admin" className={path == "/admin" ? "text-black" : ""}>Dashboard</Link></h3> */}
                <h3><Link href="/admin" className={path == "/admin" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/admin/transaction" className={path.includes("/admin/transaction") == true ? "text-black" : ""}>Transaction</Link></h3>
                <h3><Link href="/admin/request" className={path.includes("/admin/request") == true  ? "text-black":""}>Request</Link></h3>
                <h3><Link href="/admin/users" className={path == "/admin/users" ? "text-black" : ""}>Users</Link></h3>
                <h3><Link href="/admin/chat" className={path == "/admin/chat" ? "text-black" : ""}>Chats</Link></h3>
            </div>
        </>
    )
}

