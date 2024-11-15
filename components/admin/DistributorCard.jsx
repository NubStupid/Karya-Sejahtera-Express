const DistributorCard = ({products,created,distributor,total,notes,index}) => {
  return (
    <>
    
        <div className="" key={index+"B"}>
            {products.length == 1 && <>
                <div className={`${products[0].status == "Accepted"?"bg-green-300":products[0].status == "Declined"?"bg-red-200":"bg-yellow-200"} rounded-lg p-3 grid grid-cols-3 mt-5 border-2 border-slate-400`}>
                    <div className="">
                        <img src={products[0].img?products[0].img:" /dummy/Bobi bobi.png"} alt="" />
                    </div>
                    <div className="col-span-2">
                        <div className="text-xl font-semibold">
                            {products[0].productName?products[0].productName:"Nama"}
                        </div>
                        <div className="grid grid-cols-2 text-sm">
                            <div className="">{products[0].qty?products[0].qty:"x0"}</div>
                            <div className="">{products[0].price?products[0].price:"Rp.0"}</div>
                        </div>
                        {created?created.substring(0,10):"2024-01-01"}
                        <div className="text-end text-sm">
                            Total: {total?total:"Rp.0"}
                        </div>
                        <div className={`text-end font-bold text-sm ${products[0].status&&products[0].status == "Accepted"?"text-green-700":products[0].status == "Declined"?"text-red-700":"text-yellow-300"}`}>
                            {products[0].status?products[0].status:"Declined"}
                        </div>
                    </div>
                    <hr className="border-1 border-black col-span-3 my-2"/>
                    <div className="col-span-3">
                        <div className="text-sm">
                            Notes from: {distributor?distributor:"Bobi"}
                        </div>
                        <div className="text-sm">{notes?notes:"No Notes Attached"}</div>
                    </div>
                </div>
            
            </>}
            {products.length > 1 && <>
                <div key={index+"A"} className="grid grid-cols-1 mt-5 border-2 border-slate-400 rounded-lg" >
                    {products.map((p,index)=>{
                        return (<>
                            <div key={index} className={`${p.status == "Accepted"?"bg-green-300":p.status == "Declined"?"bg-red-200":"bg-yellow-100"} p-3 ${index == 0?"rounded-t-lg":index == products.length-1?"rounded-b-lg":""}`}>
                                <div className="text-xl font-semibold my-1">
                                    {p.productName}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="text-sm">x{p.qty}</div>
                                    <div className="text-sm">Rp.{p.price}</div>
                                </div>
                                <div className="text-end text-sm mt-2">
                                    Subtotal : Rp. {p.subtotal}
                                </div>
                                <div className={`text-end font-bold text-sm ${p.status&&p.status == "Accepted"?"text-green-700":p.status == "Declined"?"text-red-700":"text-yellow-300"}`}>
                                    {p.status?p.status:"Declined"}
                                </div>
                                {index == products.length-1 && 
                                <>
                                    <hr className="border-1 border-black my-2" />
                                    <div className="text-sm font-bold text-end">
                                        Total : Rp.{total}
                                    </div>
                                    <div className="text-sm">
                                        Notes from {distributor}:
                                    </div>
                                    <div className="text-sm">
                                        {notes?notes:"No Notes Attached"}
                                    </div>
                                </>}
                            </div>
                        
                        </>)
                    })}
                </div>
            </>}
        </div>

    </>
  )
}

export default DistributorCard