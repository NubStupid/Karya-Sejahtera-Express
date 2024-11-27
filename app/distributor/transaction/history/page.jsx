"use client"

import BatchHistoryCard from "@/components/distributor/BatchHistoryCard"
import HistoryCard from "@/components/distributor/HistoryCard"
import ResponsiveLinedButton from "@/components/ResponsiveLinedButton"
import useAuth from "@/stores/store"
import { useEffect, useState } from "react"

const page = () => {
  const [data,setData] = useState()
  const auth = useAuth();
  const fetchRequest = async () =>{
    const response = await fetch("http://localhost:3000/api/distributor/transaction/?username="+auth.user.username)
    if(response.ok){
      const data = await response.json()
      const formatedData = await Promise.all(data.products.map(async (item)=>{
        console.log(JSON.stringify(item));
        const updatedProducts = await Promise.all(item.products.map(async (p,index)=>{
          const productData = await fetch("http://localhost:3000/api/distributor/transaction/products/?productId=" + p.productId)
          let up = await productData.json()
          console.log(up);
          up.status = p.status
          up.products[0].qty = p.qty
          up.products[0].subtotal = p.subtotal
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
        {/* <HistoryCard bg={"bg-accepted"} image={"/dummy/Bobi bobi.png"} productName={"Bobi tapi keren"} price={1000} qty={5} status="Accepted"/> */}
        {data && data.map((item,index) => {
          if(item.products && item.products.length == 1){
            return <div className="" key={index}>
              <HistoryCard  bg={item.products[0].status == "Accepted"?"bg-accepted":"bg-declined"} image={"/dummy/Bobi bobi.png"} productName={item.products[0].products[0].productName} price={item.products[0].products[0].price} qty={item.products[0].products[0].qty} status={item.products[0].status} notes={item.notes}/>
            </div>
          }else{
            return <div className="" key={index}>
              <BatchHistoryCard data={item.products} notes={item.notes}></BatchHistoryCard>
              </div>
          }
        })}
      </div>
    
    </>
  )
}

export default page