"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar()
{
    const path = usePathname();
    return (
        <>
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                <h3><Link href="/distributor" className={path == "/distributor" ? "text-black" : ""}>Dashboard</Link></h3>
                <h3><Link href="/distributor/products" className={path == "/distributor/products" ? "text-black" : ""}>Products</Link></h3>
                <h3><Link href="/distributor/transaction" className={path == "/distributor/transaction" ? "text-black" : ""}>Transaction</Link></h3>
                <h3><Link href="/distributor/chat" className={path == "/distributor/chat" ? "text-black" : ""}>Chat</Link></h3>
            </div>
        </>
    )
}

