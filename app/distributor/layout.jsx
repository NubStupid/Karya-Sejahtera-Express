"use client"
// import { usePathname } from "next/navigation";
import Navbar from "@/components/distributor/Navbar";
import Sidebar from "@/components/distributor/Sidebar";
import useAuth from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function DistributorLayout({ children }) {
    const router = useRouter();
    const auth = useAuth();
    const [ authenticate, setAuthenticate ] = useState(false);
    useEffect(() => {
        if(!auth.user || auth.user.role != "distributor")
            router.push('/');
          else
            setAuthenticate(true);
    }, []);
    // const path = usePathname();
    return (
      <>
        {authenticate == true &&
          <div className="h-screen">
            {/* {path == "/distributor/chat" ? children : */}
              <div className="h-screen overflow-hidden">
                  <Navbar />
                  <div className="h-full flex">
                      <Sidebar />
                      <div className="w-full p-14 overflow-auto">
                          {children}
                      </div>
                  </div>
              </div>
            {/* } */}
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