import Navbar from "../../../components/distributor/Navbar.jsx"
import Sidebar from "../../../components/distributor/Sidebar.jsx"

export default function Products()
{
    return (
        <div className="h-screen">
            <Navbar />
            <div className="flex h-full">
                <Sidebar route="Catalog"/>
                <div className="p-14 flex w-full">
                    <div className="bg-sky-200 p-10 ms-auto me-14 w-4/12">
                    <button>+ Add Product</button>
                    </div>
                    <div className="bg-sky-200 p-10 w-7/12 me-auto">asdfasdf</div>
                </div>
            </div>
        </div>
    )
}