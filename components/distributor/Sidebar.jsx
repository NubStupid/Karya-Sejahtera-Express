export default function Sidebar({route})
{
    return (
        <>
            <div className="bg-sky-300 w-60 p-4 text-white text-xl font-semibold">
                <h3 className={route == "Dashboard" && "text-black"}>Dashboard</h3>
                <h3 className={route == "Catalog" && "text-black"}>Catalog</h3>
                <h3 className={route == "Transaction" && "text-black"}>Transaction</h3>
                <h3 className={route == "Chat" && "text-black"}>Chat</h3>
            </div>
        </>
    )
}

