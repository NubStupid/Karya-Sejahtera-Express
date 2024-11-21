"use client"

import DistributorHistoryCard from "@/components/admin/DistributorHistoryCard"
import { useEffect, useState } from "react"


export default function AllDistributor () {
    const [transaction, setTransaction] = useState([])
    const fetchData = async () => {
        const response = await fetch("http://localhost:3000/api/admin/transaction/distributor")
        const data = await response.json()
        console.log(JSON.stringify(data[0]));
        setTransaction(data)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <>
        
            <div className="container p-10">
                <div className="text-3xl font-semibold mb-10">All Distributor Transaction</div>
                {transaction && transaction.map((tr,index) => {
                    return <DistributorHistoryCard key={index} {...tr}/>
                })}
            </div>
        
        </>
    )
}