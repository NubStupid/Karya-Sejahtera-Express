"use client"
import { usePathname } from "next/navigation";
import Navbar from "@/components/distributor/Navbar";
import Sidebar from "@/components/distributor/Sidebar";

export default function DistributorLayout({ children }) {
    const path = usePathname();
    return (
      <>
        <div className="h-screen">
          {path == "/distributor/chat" ? children :
            <div className="h-screen">
                <Navbar />
                <div className="h-full flex">
                    <Sidebar />
                    <div className="w-full p-14">
                        {children}
                    </div>
                </div>
            </div>
          }
        </div>
      </>
    );
}