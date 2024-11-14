"use client"
import { usePathname } from "next/navigation";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";

export default function LoginLayout({ children }) {
    const path = usePathname();
    return (
      <>
        <div className="h-screen">
            <div className="h-screen overflow-hidden">
                <Navbar />
                <div className="h-full flex">
                    <Sidebar />
                    <div className="w-full p-14 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}