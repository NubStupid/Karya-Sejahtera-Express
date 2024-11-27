"use client"
import CustomerCard from "@/components/admin/CustomerCard";
import DistributorCard from "@/components/admin/DistributorCard";
import ResponsiveButton from "@/components/ResponsiveButton";
import { useEffect, useState } from "react";


export default function Transaction (){
    const [distributor,setDistributor] = useState([])
    const [customer,setCustomer] = useState([])
    const fetchData = async () => {
        const response = await fetch("http://localhost:3000/api/admin/transaction")
        // console.log(await response.json());
        const data = await response.json()
        setCustomer(data.customer)
        // Preprocess distributor
        const distributor = data.distributor
        const getCompletedDistributor = async () => {
            const completedDistributor = await Promise.all(distributor.map(async (request) => {
              console.log(request.reqId);
              const fetchProduct = await request.products.reduce(async (acc, product) => {
                let acc2 = await acc;
                const productData = await fetch("http://localhost:3000/api/distributor/transaction/products/?productId=" + product.productId);
                const data = await productData.json();
                let toPush = {
                  ...product,
                  productName: data.products[0].productName,
                  desc: data.products[0].desc,
                  img: data.products[0].img,
                };
                acc2.push(toPush);
                return acc2;
              }, Promise.resolve([]));
              
              console.log(JSON.stringify(fetchProduct));
              return {
                ...request,
                products: fetchProduct,
              };
            }));
          
            console.log(JSON.stringify(completedDistributor));
            return completedDistributor;
          };
          
          getCompletedDistributor().then(data => {
            setDistributor(data);
          }).catch(error => {
            console.error('Error:', error);
          });
          

    }
    useEffect(()=>{
        fetchData()
    },[])
    return (<>
        <div className="container p-10">
            <div className="text-3xl font-semibold  mb-5">Transaction History</div>
            <div className="grid grid-cols-2 gap-10">
                <div className="distributor">
                    <div className="grid grid-cols-5">
                        <div className="text-2xl font-semibold">Distributor</div>
                        <div className="col-start-5">
                            <ResponsiveButton placeholder={"See All"} bg={"bg-orange-primary"} href={"/admin/transaction/distributor"}/>
                        </div>
                    </div>
                    <div className="mt-5 bg-gray w-full rounded-lg p-10 grid grid-cols-1 gap-1 h-[70vh] overflow-y-scroll">
                        {/* <DistributorCard bg={"bg-red-300"} products={["A"]}></DistributorCard> */}
                        {distributor && distributor.map((request,index)=>{
                        // console.log(JSON.stringify(request));
                        
                        return (
                            <DistributorCard key={index} products={request.products} created={request.createdAt} total={request.grandTotal} distributor={request.username} notes={request.notes} index={index}/>
                          )
                        })}
                    </div>
                </div>
                <div className="customer">
                    <div className="grid grid-cols-5">
                        <div className="text-2xl font-semibold">Customer</div>
                        <div className="col-start-5">
                            <ResponsiveButton placeholder={"See All"} bg={"bg-orange-primary"} href={"/admin/transaction/customer"}/>
                        </div>
                    </div>
                    <div className="mt-5 bg-gray w-full rounded-lg p-10 grid grid-cols-1 gap-4 h-[70vh] overflow-y-scroll">
                      {customer && customer.map((transaction,index)=>{
                        console.log(JSON.stringify(transaction));
                        return (
                          <CustomerCard key={index} transactions={transaction}/>
                        )
                      })}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
