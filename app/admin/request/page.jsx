"use client"
import DistributorProductCard from '@/components/admin/DistributorProductCard'
import UserDistributorCard from '@/components/admin/UserDistributorCard'
import React, { useState } from 'react'

export default function Request() {
  const [distributor,setDistributor] = useState({})
  return (
    <div className='w-100 p-5'>
        <div className="grid grid-cols-2 gap-10">
          <div className="">
            <div className="text-2xl font-bold mb-5">
                List Distributor
            </div>
            <div className="bg-slate-200 rounded-lg w-full p-5">
                <UserDistributorCard/ >
            </div>
          </div>
          <div className="">
            {distributor && <>
              <div className="text-2xl font-bold mb-5">
                  {distributor && distributor.username?distributor.usernmae:"minji"}'s Catalog
              </div>
              
              <div className="bg-slate-200 rounded-lg w-full p-5">
                <DistributorProductCard/>
              </div>
            </>}
          </div>
        </div>
    </div>
  )
}
