import Link from "next/link";
import { Avatar } from "@mui/material";
import { Typography  } from "@mui/material";
import { ArrowBackIosNew } from '@mui/icons-material';

export default function Chat()
{
    return (
        <>
           <div className="grid grid-cols-7 bg-blue-primary w-[100vw] p-5">
            <div className="texl-xl flex justify-center">
                <Link href="/distributor">
                    <ArrowBackIosNew className="h-full me-4" />
                </Link>
                <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }} />
                <Typography component="div" variant="h6" className="h-full ms-4 pt-2">Admin</Typography>
            </div>
            <div className="texl-xl flex justify-center">
            </div>
        </div>  
        </>
    )
}