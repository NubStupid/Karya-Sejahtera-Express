import Navbar from "@/components/distributor/Navbar";
import Sidebar from "@/components/distributor/Sidebar";

export default function DistributorLayout({ children }) {
    return (
      <>
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="h-full flex">
                <Sidebar />
                <div className="w-full p-14 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
      </>
    );
}