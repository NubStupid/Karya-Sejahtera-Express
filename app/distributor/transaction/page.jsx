"use client"

import PendingBatchRequestCard from "@/components/distributor/PendingBatchRequestCard"
import PendingRequestCard from "@/components/distributor/PendingRequestCard"
import ResponsiveLinedButton from "@/components/ResponsiveLinedButton"
import { useEffect, useState } from "react"

const page = () => {
  const [data,setData] = useState()
  const fetchRequest = async () =>{
    const response = await fetch("http://localhost:3000/api/distributor/transaction/?username="+"john_doe")
    if(response.ok){
      const data = await response.json()
      const formatedData = await Promise.all(data.products.map(async (item)=>{
        console.log(JSON.stringify(item));
        let totalPending = 0
        const updatedProducts = await Promise.all(item.products.map(async (p)=>{
          const productData = await fetch("http://localhost:3000/api/distributor/transaction/products/?productId=" + p.productId)
          let up = await productData.json()
          up.status = p.status
          if(p.status == "Pending"){
            totalPending++
          }
          return up
        }))
        if(totalPending == 0){
          return null
        }
        item.products = updatedProducts
        return item
      }))
      const filteredData = formatedData.filter(Boolean)
      setData(filteredData)
      console.log(filteredData);
      
    }else{
      throw new Error("Failed to fetch data!")
    }
  }
  useEffect(()=>{
    fetchRequest()
  },[])
  return (
    <>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        <div className="">
          <ResponsiveLinedButton href={"#"} placeholder={"Pending"} isActive={true}/>
        </div>
        <div className="">
          <ResponsiveLinedButton href={"/distributor/transaction/history"} placeholder={"History"} isActive={false}/>
        </div>
      </div>

      <div className="grid mt-5 gap-10">
        {data && data.map((item,index)=>{
          if(item.products && item.products.length == 1){
            return <PendingRequestCard key={index} bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={item.products[0].products[0].productName} price={item.products[0].products[0].price} qty={item.products[0].products[0].stock}/>
          }else{
            return <div className="" key={index}>
              {console.log(JSON.stringify(item.products))}
                <PendingBatchRequestCard bg={"bg-blue-ternary"} data={item.products}/>
              </div>
          }
        })}
        <div className="">
        {/* <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/>
        <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/>
        <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/> */}
        </div>
      </div>

    </>  
)
}

export default page