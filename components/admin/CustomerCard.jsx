const CustomerCard = ({transactions}) => {
  return (
    <div>
      <div className={`border-2 border-slate-400 rounded-lg p-3 grid grid-cols-5 ${transactions.status == "Success"?"bg-green-300":transactions.status == "Failed"?"bg-red-200":"bg-yellow-100"}`}>
        <div className="">
          
        </div>
        <div className="col-span-2 flex items-center font-semibold">
          {transactions.transId}
        </div>
        <div className="col-span-2">
          <div className="grid grid-rows-3 grid-flow-cols">
            <div className="text-end text-xs text-orange-400 font-semibold ">{transactions.createdAt.substring(0,10)+"   "+transactions.createdAt.substring(11,19)}</div>
            <div className="text-end text-sm font-semibold"></div>
            <div className="text-end text-xs text-green-600 font-semibold">Total: Rp. {transactions.grandTotal}</div>
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default CustomerCard