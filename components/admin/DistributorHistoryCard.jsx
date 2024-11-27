
const DistributorHistoryCard = (props) => {
  return (
    <>
    
        <div className="container my-3 border border-black border-2">
            {props.product.length == 1 && <>
                <div className="bg-orange-ternary grid grid-cols-5 p-5">
                    <div className=""><img src={props.product[0].img} alt="" className="w-[150px] h-[150px] object-cover" onError={(e)=>e.target.src = "https://i.pinimg.com/originals/f2/a3/b9/f2a3b9f1eefe06e590be00dafc6133ac.jpg"}/></div>
                    <div className="col-span-3">
                        <div className="grid grid rows-3 grid-flow-cols">
                            <div className="p-3 text-xl font-semibold">{props.product[0].productName}</div>
                            <div className="p-3 ">
                                <div className="grid grid-cols-3">
                                    <div className="">
                                        Quantity: {props.product[0].qty}
                                    </div>
                                    <div className="">
                                        Price: Rp. {props.product[0].price}
                                    </div>
                                    <div className="">
                                        Subtotal: Rp. {props.product[0].subtotal}
                                    </div>
                                </div>
                            </div>
                            <hr className="border border-black"/>
                            <div className="p-3 ">
                                <grid className="grid grid-cols-2">
                                    <div className="">
                                        Status: <span className={props.product[0].status == "Accepted"?"text-green-600 font-semibold":props.product[0].status == "Declined"?"text-red-400 font-semibold":"text-yellow-200 font-semibold"}>{props.product[0].status}</span>
                                    </div>
                                    <div className="">
                                        <span className="font-semibold">Notes:</span> {props.product[0].notes != ""?props.product[0].notes:"No Notes Attached"}
                                    </div>
                                </grid>
                            </div>
                        </div>
                    </div>
                    <div className="text-xl font-bold flex items-center p-16 text-blue-400">{props.product[0].reqId}</div>
                </div>
            </>}
            {props.product.length > 1 && props.product.map((p,index)=>{
                return (<>
                        <div className="bg-orange-ternary grid grid-cols-5 p-5">
                        <div className=""><img src={p.img} alt="" className="w-[150px] h-[150px] object-cover" onError={(e)=>e.target.src = "https://i.pinimg.com/originals/f2/a3/b9/f2a3b9f1eefe06e590be00dafc6133ac.jpg"}/></div>
                        <div className="col-span-3">
                            <div className="grid grid rows-3 grid-flow-cols">
                                <div className="p-3 text-xl font-semibold">{p.productName}</div>
                                <div className="p-3 ">
                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            Quantity: {p.qty}
                                        </div>
                                        <div className="">
                                            Price: Rp. {p.price}
                                        </div>
                                        <div className="">
                                            Subtotal: Rp. {p.subtotal}
                                        </div>
                                    </div>
                                </div>
                                <hr className="border border-black"/>
                                <div className="p-3 ">
                                    <grid className="grid grid-cols-2">
                                        <div className="">
                                            Status: <span className={p.status == "Accepted"?"text-green-600 font-semibold":p.status == "Declined"?"text-red-400 font-semibold":"text-yellow-200 font-semibold"}>{p.status}</span>
                                        </div>
                                    </grid>
                                </div>
                                {index == props.product.length-1 && <>
                                
                                    <div className="py-5">
                                        <span className="font-semibold">Notes:</span> {props.product[0].notes != ""?props.product[0].notes:"No Notes Attached"}
                                    </div>
                                
                                </>}
                            </div>
                        </div>
                        {index == 0 && <>
                        
                            <div className="text-xl font-bold flex items-center p-16 text-blue-400">{props.product[0].reqId}</div>
                        
                        </>}
                    </div>
                
                </>)
            })}
        </div>
    
    </>
  )
}

export default DistributorHistoryCard