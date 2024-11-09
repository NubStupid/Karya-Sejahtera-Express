"use client"

import HistoryCard from "@/components/distributor/HistoryCard"
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
        const updatedProducts = await Promise.all(item.products.map(async (p)=>{
          const productData = await fetch("http://localhost:3000/api/distributor/transaction/products/?productId=" + p.productId)
          let up = await productData.json()
          up.status = p.status
          return up
        }))
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
          <ResponsiveLinedButton href={"/distributor/transaction"} placeholder={"Pending"} isActive={false}/>
        </div>
        <div className="">
          <ResponsiveLinedButton href={"#"} placeholder={"History"} isActive={true}/>
        </div>
      </div>

      <div className="grid mt-5 gap-10">
        <HistoryCard bg={"bg-declined"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10} status="Declined"/>
        <HistoryCard bg={"bg-accepted"} image={"/dummy/Bobi bobi.png"} productName={"Bobi tapi keren"} price={1000} qty={5} status="Accepted"/>
      </div>
    
    </>
  )
}

export default page