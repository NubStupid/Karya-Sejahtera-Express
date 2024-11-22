"use client"
import CartCard from '@/components/admin/CartCard'
import DistributorProductCard from '@/components/admin/DistributorProductCard'
import UserDistributorCard from '@/components/admin/UserDistributorCard'
import ResponsiveButton from '@/components/ResponsiveButton'
import React, { useState } from 'react'

export default function Request() {
  const [distributor,setDistributor] = useState({})
  const [cart,setCart] = useState([]) 
  const [view,setView] = useState({
    view:"",
    distributor:null
  })
  const handleView = (view,distributor = null)=>{
    setView({view,distributor})
  }
  return (
    <div className='w-100 p-5'>
        <div className="grid grid-cols-7">
          <div className="text-2xl font-semibold mb-5">
            {cart &&cart.length} Items
          </div>
          <div className="">
            <ResponsiveButton placeholder={"View cart"} bg={"bg-orange-primary"} onClick={()=>handleView("cart")}/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="">
            <div className="text-2xl font-bold mb-5">
                List Distributor
            </div>
            <div className="bg-slate-200 rounded-lg w-full p-5">
              <div className="bg-orange-ternary rounded-lg">
                <UserDistributorCard />
                <DistributorProductCard/>
              </div>
              <div className="">
              </div>
            </div>
          </div>
          <div className="">
            {/* {distributor &&view.view == "distributor" && <>
              <div className="text-2xl font-bold mb-5">
                  {distributor && distributor.username?distributor.username:"minji"}'s Catalog
              </div>
              
              <div className="bg-slate-200 rounded-lg w-full p-5">
                <DistributorProductCard/>
              </div>
            </>} */}
            
            <div className="text-2xl font-bold mb-5">
              Cart
            </div>
            <div className="bg-slate-200 rounded-lg w-full p-5">
              <CartCard/>
            </div>
          </div>
        </div>
    </div>
  )
}
