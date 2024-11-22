import React from 'react'
import ResponsiveButton from '../ResponsiveButton'

const CartCard = () => {
  return (
    <>
    
        <div className="grid grid-cols-5 gap-4 my-2 bg-orange-ternary p-5 rounded-lg">
            <div className="" style={{maxHeight:"100px",}}>
            <img src="https://www.flokq.com/blog/wp-content/uploads/2020/08/kerupuk-puli.jpg" alt="" className='' style={{width:"100px",maxHeight:"100px",objectFit:"cover",objectPosition:"center"}}/>
            </div>
            <div className="col-span-3 flex items-center">
                <div className="grid grid-rows-3 grid-flow-cols">
                    <div className="">a</div>
                    <div className="">a</div>
                    <div className="">a</div>
                </div>
            </div>
            <div className="flex items-center">
                <ResponsiveButton placeholder={"Remove"} bg={"bg-red-500"}/>
            </div>
        </div>

    </>
  )
}

export default CartCard