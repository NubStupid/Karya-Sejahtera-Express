"use client"

import PendingBatchRequestCard from "@/components/distributor/PendingBatchRequestCard"
import PendingRequestCard from "@/components/distributor/PendingRequestCard"
import ResponsiveLinedButton from "@/components/ResponsiveLinedButton"
import useAuth from "@/stores/store"
import { useEffect, useState } from "react"

const page = () => {
  const [data,setData] = useState()
  const [update, setUpdate] = useState([]);
  const [notes,setNotes] = useState([]);
  const auth = useAuth();

  const handleNotes = (request,note) => {
    const found = notes.findIndex((n)=>n.reqId == request)
    if(found !== -1){
      
      if(note !== ""){
        notes[found].notes = note
      }else{
        const updatedNotes = [...notes]
        updatedNotes.splice(found,1)
        setNotes(updatedNotes)
      }
    }else{
      const newNote = {
        reqId:request,
        notes:note
      }
      setNotes([...notes,newNote])
    }
  }

  const updateRequest = async (request) => {
    // console.log(request);
    const updatedData = update.filter((d)=>d.rId == request)
    const requestData = data.find((r)=>r.reqId == request)
    console.log(JSON.stringify(updatedData));
    // console.log(JSON.stringify(requestData.products));
    const filter = requestData.products.reduce((acc,rP)=>{
      const found = updatedData.find(d=>rP.products[0].productDId == d.pId)
      if(!found && rP.status == "Pending"){
        acc.push(rP)
        // console.log(acc);
        
      }
      return acc  
    },[]) 
    // console.log(filter);
    
    if(filter.length>0){
      console.log("Blm di update semua");
    }else{
      console.log("Di update semua");
      try{
        const response = await fetch("http://localhost:3000/api/distributor/transaction/request",{
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({reqId:request})
        })
        // console.log(await response.json());
        const data = await response.json()
        const r = data.products[0].products
        console.log(JSON.stringify(notes));
        
        // console.log(JSON.stringify(r));
        const productToUpdate = r.reduce((acc,p)=>{
          const found = updatedData.find(d=>p.productId == d.pId)
          if(found){
            acc.push({...p,status:found.status})
          }else{
            acc.push(p)
          }
          return acc
        },[])
        console.log(productToUpdate);
        let notesToUpdate = ""
        const findNotes = notes.find((n)=>n.reqId == request)
        if(findNotes){
          notesToUpdate = findNotes.notes
        }
        try{
          const response = await fetch('http://localhost:3000/api/distributor/transaction',{
            method:"PATCH",
            headers:{
              'Content-Type':"application/json"
            },
            body:JSON.stringify({reqId:request,products:productToUpdate,notes:notesToUpdate})
          })
          const data = await response.json()
          if(!response.ok){
            throw new Error(data.error)
          }
          console.log(data);
        }catch(e){
          console.error('API Error:', e.message)
        }
        fetchRequest()
        const updateState = update.filter((a)=>a.rId !== request)
        setUpdate(updateState)
        
      }catch(e){  
        console.log(e);
        
      }
      // const productToUpdate = requestData.products.reduce((acc,rP)=>{
      //   const found = updatedData.find(d=>rP.products[0].productId == d.pId)
      //   if(found){
      //     acc.push({...rP,status:found.status})
      //   }else{
      //     acc.push(rP)
      //   }
      //   return acc
      // },[]) 
      // console.log(JSON.stringify(productToUpdate));
      // try{
      //   const response = await fetch('http://localhost:3000/api/distributor/transaction',{
      //     method:"PATCH",
      //     headers:{
      //       'Content-Type':"application/json"
      //     },
      //     body:JSON.stringify({reqId:request,products:productToUpdate})
      //   })
      //   const data = await response.json()
      //   if(!response.ok){
      //     throw new Error(data.error)
      //   }
      //   console.log(data);
      // }catch(e){
      //   console.error('API Error:', e.message)
      // }
    }
    
  }


  const acceptRequest = (id, request) => {
    console.log("accept " + id + " " + request);
    // console.log(JSON.stringify(notes));
    setUpdate(prevUpdate => {
      const found = prevUpdate.find(pr => pr.pId === id);
      if (!found) {
        return [...prevUpdate, { pId: id, rId: request, status: "Accepted" }];
      } else {
        if (found.status === "Accepted") {
          return prevUpdate.filter(pr => pr.pId !== id);
        } else {
          return prevUpdate.map(pr => pr.pId === id ? { pId: id, rId: request, status: "Accepted" } : pr);
        }
      }
    });
  };

  const declineRequest = (id, request) => {
    console.log("decline " + id + " " + request);
    setUpdate(prevUpdate => {
      const found = prevUpdate.find(pr => pr.pId === id);
      if (!found) {
        return [...prevUpdate, { pId: id, rId: request, status: "Declined" }];
      } else {
        if (found.status === "Declined") {
          return prevUpdate.filter(pr => pr.pId !== id);
        } else {
          return prevUpdate.map(pr => pr.pId === id ? { pId: id, rId: request, status: "Declined" } : pr);
        }
      }
    });
  };

  // console.log(JSON.stringify(update));
  

  const fetchRequest = async () =>{
    const response = await fetch("http://localhost:3000/api/distributor/transaction/?username="+auth.user.username)
    if(response.ok){
      const data = await response.json()
      const formatedData = await Promise.all(data.products.map(async (item)=>{
        // console.log(JSON.stringify(item));
        let totalPending = 0
        const updatedProducts = await Promise.all(item.products.map(async (p)=>{
          const productData = await fetch("http://localhost:3000/api/distributor/transaction/products/?productId=" + p.productId)
          let up = await productData.json()
          up.status = p.status
          up.products[0].stock = p.qty
          // up
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
            return <PendingRequestCard key={index} bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={item.products[0].products[0].productName} price={item.products[0].products[0].price} qty={item.products[0].products[0].stock} accept={acceptRequest} decline={declineRequest} id={item.products[0].products[0].productDId} req={item.reqId} update={updateRequest} setNotes={handleNotes} notes={item.notes}/>
          }else{
            return <div className="" key={index}>
              {/* {console.log(JSON.stringify(item.products))} */}
                <PendingBatchRequestCard bg={"bg-blue-ternary"} data={item.products} accept={acceptRequest} decline={declineRequest} req={item.reqId} update={updateRequest} setNotes={handleNotes} notes={item.notes}/>
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