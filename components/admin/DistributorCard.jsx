const DistributorCard = ({bg,products,distributor}) => {
  return (
    <>
    
        <div className={`${bg?bg:"bg-slate-200"} rounded-lg`}>
            {products.length == 1 && <>
                <div className="grid grid-cols-3 p-3 gap-2">
                    <div className="">
                        <img src={products.img?products.img:" /dummy/Bobi bobi.png"} alt="" />
                    </div>
                    <div className="col-span-2">
                        <div className="text-xl font-semibold">
                            {products.productName?products.productName:"Nama"}
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                            <div className="">{products.qty?products.qty:"x0"}</div>
                            <div className="">{products.price?products.price:"Rp.0"}</div>
                        </div>
                        {products.createdAt?products.createdAt:"2024-01-01"}
                        <div className="text-end text-sm">
                            Total: {products.grandTotal?products.grandTotal:"Rp.0"}
                        </div>
                        <div className={`text-end font-bold text-sm ${products.status&&products.status == "Accepted"?"text-green-400":"text-red-700"}`}>
                            {products.status?products.status:"Declined"}
                        </div>
                    </div>
                    <hr className="border-1 border-black col-span-3"/>
                    <div className="col-span-3">
                        <div className="text-sm">
                            Notes from: {distributor?distributor:"Bobi"}
                        </div>
                        <div className="text-sm">{products.notes?products.notes:"No Notes Attached"}</div>
                    </div>
                </div>
            
            </>}
            {products.length > 1 && <>
            
            
            </>}
        </div>

    </>
  )
}

export default DistributorCard