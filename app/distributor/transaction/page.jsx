import PendingRequestCard from "@/components/distributor/PendingRequestCard"
import ResponsiveLinedButton from "@/components/ResponsiveLinedButton"

const page = () => {
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
        <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/>
        <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/>
        <PendingRequestCard bg={"bg-blue-ternary"} image={"/dummy/Bobi bobi.png"} productName={"Bobi Bobi"} price={1000} qty={10}/>
      </div>

    </>  
)
}

export default page