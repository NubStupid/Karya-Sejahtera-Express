"use client"

import DistributorHistoryCard from "@/components/admin/DistributorHistoryCard"
import ResponsiveButton from "@/components/ResponsiveButton"
import { useEffect, useState } from "react"


export default function AllDistributor () {
    const [transaction, setTransaction] = useState([])
    const fetchData = async () => {
        const response = await fetch("http://localhost:3000/api/admin/transaction/distributor")
        const data = await response.json()
        console.log(JSON.stringify(data));
        setTransaction(data)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <>
        
            <div className="container p-10">
                <div className="grid grid-cols-2">
                    <div className="text-3xl font-semibold mb-10">All Distributor Transaction</div>
                    <div className="flex items-center justify-end">
                        <ResponsiveButton placeholder={"Back to Trasaction"} href={"/admin/transaction"}/>
                    </div>
                </div>
                {transaction.length>0 && transaction.map((tr,index) => {
                    return <DistributorHistoryCard key={index} product={tr}/>
                })}
            </div>
        
        </>
    )
}