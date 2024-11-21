"use client"
import { usePathname } from "next/navigation";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function AdminLayout({ children }) {
    const path = usePathname();
    const router = useRouter();
    const auth = useAuth();
    const [ authenticate, setAuthenticate ] = useState(false);
    useEffect(() => {
        if(!auth.user || auth.user.role != "admin")
            router.push('/');
          else
            setAuthenticate(true);
    }, []);
    return (
      <>
      {authenticate == true &&
          <div className="h-screen">
            {path == "/admin/chat" ? children :
              <div className="h-screen overflow-hidden">
                  <Navbar />
                  <div className="h-full flex">
                      <Sidebar />
                      <div className="w-full p-14 overflow-auto">
                          {children}
                      </div>
                  </div>
              </div>
            }
          </div>
        }
        {authenticate == false &&
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
              <CircularProgress />
          </Box>
        }
      </>
    );
}