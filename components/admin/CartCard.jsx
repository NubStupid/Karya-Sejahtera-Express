import React from 'react'
import ResponsiveButton from '../ResponsiveButton'

const CartCard = (props) => {
  return (
    <>
    
        <div className="grid grid-cols-5 gap-4 my-2 bg-orange-ternary p-5 rounded-lg">
            <div className="" style={{maxHeight:"100px",}}>
                <img src={props.img} alt="" className='' style={{width:"100px",maxHeight:"100px",objectFit:"cover",objectPosition:"center"}} onError={(e)=>e.target.src = "https://static.vecteezy.com/system/resources/previews/002/761/708/non_2x/krupuk-icon-doodle-hand-drawn-or-outline-icon-style-vector.jpg"}/>
            </div>
            <div className="col-span-2 flex items-center">
                <div className="grid grid-rows-3 grid-flow-cols">
                    <div className="font-bold">{props.payload.productName}</div>
                    <div className="">Qty: {Number.parseInt(props.qty)}</div>
                    <div className="">Total: Rp. {props.payload.price*Number.parseInt(props.qty)}</div>
                </div>
            </div>
            <div className="flex items-center font-semibold text-green-500">
                {props.payload.username}
            </div>
            <div className="flex items-center">
                <ResponsiveButton placeholder={"Remove"} bg={"bg-red-500"} onClick={()=>props.removeHandle(props.productDId,0)}/>
            </div>
        </div>

    </>
  )
}

export default CartCard