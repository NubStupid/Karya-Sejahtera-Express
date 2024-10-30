import { Avatar, Button } from "@mui/material";
import Image from "next/image";

export default function Navbar()
{
    return (
        <>
            <div className="grid grid-cols-7 bg-orange-primary w-[100vw] p-5">
                <div className="texl-xl flex justify-center">
                    <Image
                        src="/logo/KDistributor.png"
                        alt="Next.js logo"
                        width={130}
                        height={20}
                        priority
                    />
                </div>
                <div className="texl-xl col-start-6 flex justify-end ms-5">
                    <Button variant="contained" className="bg-blue-primary rounded-lg">Back to Homepage</Button>
                </div>
                <div className="texl-xl flex justify-center">
                    <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }}/>
                </div>
            </div>
        </>
    )
}