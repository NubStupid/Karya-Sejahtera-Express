import { Avatar } from "@mui/material";
import ResponsiveButton from "../ResponsiveButton";
import ResponsiveImage from "../ResponsiveImage";

export default function Navbar()
{
    return (
        <>
           <div className="grid grid-cols-7 bg-orange-primary w-[100vw] p-5">
            <div className="texl-xl flex justify-center">

            <ResponsiveImage src="/logo/KDistributor.png" alt="KS Distributor"/>

            </div>
            <div className="texl-xl col-start-6 flex justify-end ms-5">
                <ResponsiveButton placeholder={"Back to Homepage"} href={"/"}/>
            </div>
            <div className="texl-xl flex justify-center">
                <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }}/>
            </div>
        </div>  
        </>
    )
}