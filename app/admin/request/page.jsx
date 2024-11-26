"use client"
import CartCard from '@/components/admin/CartCard'
import DistributorProductCard from '@/components/admin/DistributorProductCard'
import UserDistributorCard from '@/components/admin/UserDistributorCard'
import ResponsiveButton from '@/components/ResponsiveButton'
import { ReportSharp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

export default function Request() {
  const [distributor,setDistributor] = useState([])
  const [cart,setCart] = useState([])
  const handleCart = (product, value, payload) => {
    setCart(prevCart => {
        const found = prevCart.findIndex(c => c.productDId === product);
        if (found !== -1) {
            if (value === 0) {
                return prevCart.filter((_, index) => index !== found);
            }else if(value > 0){
                const updatedCart = [...prevCart];
                updatedCart[found] = { ...updatedCart[found], qty: value };
                return updatedCart;
            }
        } else {
          if(value === 0){
            return cart
          }else{
            const cartItem = {
                productDId: product,
                qty: value,
                payload:payload
            };
            return [...prevCart, cartItem];
          }
        }
      });
      
      
};


const makeRequest = () => {
  const response = confirm("Proceed to make request?")
  if(response){
    // alert("yes")
    console.log(cart);
    const categorizedData = cart.reduce((acc,item)=>{
      const key = item.payload.username
      if(!acc[key]){
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    },{})

    console.log(categorizedData);
    const distributors = Object.keys(categorizedData)
    const errorData = distributors.map(async (d)=>{
      console.log(d);
      const distributorCart = categorizedData[d]
      console.log(distributorCart);
      const updatedData = distributorCart.map((dc)=>{
        return {
          productId: dc.productDId,
          qty:dc.qty,
          price:dc.payload.price,
          subtotal:(dc.qty*dc.payload.price),
          status:"Pending"
        }
      })
      console.log(updatedData);
      const grandTotal = updatedData.reduce((acc,item)=>{
        return acc + item.subtotal
      },0)
      console.log(grandTotal);
      const dateCreated = new Date()
      const dateString = dateCreated.toISOString().split(".")[0]+"Z"
      console.log(dateString);
      
      
    })

  }
}

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/admin/request")
    const data = await response.json()
    setDistributor(data)
    console.log(JSON.stringify(data));
    
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='w-100 p-5'>
        <div className="grid grid-cols-2 gap-10">
          <div className="">
            <div className="text-2xl font-bold mb-5">
                List Distributor
            </div>
            <div className="bg-slate-200 rounded-lg w-full p-5 h-[70vh] overflow-y-scroll">
              {distributor && distributor.map((d,index)=>{
                return <div className="bg-orange-ternary rounded-lg my-2" key={index}>
                  <UserDistributorCard {...d.profile}/>
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {/* <div className="">
                      <DistributorProductCard/>
                    </div>
                    <div className="">
                      <DistributorProductCard/>
                    </div> */}
                    {d.products && d.products.map((p,index)=> {
                      const found = cart.find((a)=>a.productDId == p.productDId)
                      
                      let value = 0
                      if(found){
                        value = found.qty
                      }
                      console.log(value);
                      return (<div className="">
                        <DistributorProductCard {...p} handleCart={handleCart} key={index} qty={value}/>
                      </div>)
                    })}
                  </div>
                </div>
              })}
            </div>
          </div>
          <div className="">    
            <div className="grid grid-cols-2">
              <div className="text-2xl font-bold mb-5">
                Cart
              </div>
              <div className="flex flex-row-reverse">
                <div className="text-2xl font-semibold mb-5 text-end">
                  {cart &&cart.length} Items
                </div>
                {cart.length > 0 && <>
                
                <div className="mx-5">
                  <ResponsiveButton placeholder={"Make Request"} bg={"bg-green-500"} onClick={()=>makeRequest()}/>
                </div>
                
                </>}
              </div>
            </div>
            <div className="bg-slate-200 rounded-lg w-full p-5 h-[70vh] overflow-y-scroll">
              {/* <CartCard/> */}
              {cart&&cart.map((c,index)=>{
                return <CartCard key={index} {...c} removeHandle={handleCart}/>
              })}
            </div>
          </div>
        </div>
    </div>
  )
}
