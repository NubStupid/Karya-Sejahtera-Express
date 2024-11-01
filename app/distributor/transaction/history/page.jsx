import HistoryCard from "@/components/distributor/HistoryCard"
import ResponsiveLinedButton from "@/components/ResponsiveLinedButton"

const page = () => {
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