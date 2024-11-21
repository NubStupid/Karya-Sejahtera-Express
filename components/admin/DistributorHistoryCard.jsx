
const DistributorHistoryCard = (props) => {
  return (
    <>
    
        <div className="container my-3">
            {props.products.length == 1 && <>
                <div className="bg-orange-ternary grid grid-cols-5 p-5">
                    <div className=""><img src="" alt="" className="w-[150px] h-[150px] border-2 border-black"/></div>
                    <div className="col-span-3">
                        <div className="grid grid rows-3 grid-flow-cols">
                            <div className="p-3 text-xl font-semibold">a</div>
                            <div className="p-3 ">a</div>
                            <div className="p-3 ">a</div>
                        </div>
                    </div>
                    <div className="">a</div>
                </div>
            </>}
            {props.products.length > 1 && <>
                <h1>Many</h1>
            </>}
        </div>
    
    </>
  )
}

export default DistributorHistoryCard