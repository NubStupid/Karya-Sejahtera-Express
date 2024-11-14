import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import customColor from "@/app/customColor"
import ResponsiveButton from "../ResponsiveButton"
import { Update } from "@mui/icons-material"
const PendingBatchRequestCard = ({data,bg,accept,decline,req,update}) => {

  return data.map((item,index)=>
        <div key = {index} className={bg}>

            <Card  sx={{ display: 'flex', padding:5
            }}
            style={{
                backgroundColor:customColor[bg]?customColor[bg]:white
            }}
            >
            <CardMedia
                component="img"
                image={item.products[0].img?"/dummy/Bobi bobi.png":"/dummy/Bobi bobi.png"}
                alt="Bobi Bobi"
                className="lg:w-[151px] lg:h-[151px] md:w-[120px] md:h-[120px] sm:w-[90px] sm:h-[90px] xs:w-[45px] xs:h-[45px]"
                />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h4">
                    {item.products[0].productName?item.products[0].productName:"Yes"}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    <div className="flex">
                        <div className="me-10">
                            x{item.products[0].stock?item.products[0].stock:0}
                        </div>
                        <div className="">
                            Rp. {item.products[0].price?item.products[0].price:0}
                        </div>
                    </div>
                </Typography>
                </CardContent>
            </Box>
                <Box sx={{pl: 1, pb: 1 }} className="ms-auto">

                    <CardContent className="">
                        <Typography component="div" variant="h4" className="text-end">
                            Total
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                            className="text-end"
                        >
                            Rp. {item.products[0].stock && item.products[0].price? item.products[0].stock*item.products[0].price:0} 
                        </Typography>
                        <div className="mt-2">
                            <Button className={`${item.status == "Accepted"?"bg-green-600":"bg-green-400"} text-black rounded-lg p-2 px-5 mx-2`} disabled={item.status !== "Pending"} onClick={()=>accept(item.products[0].productId,req)}>Accept</Button>
                            <Button className={`${item.status == "Declined"?"bg-red-600":"bg-red-400"} text-black rounded-lg p-2 px-5 mx-2`} disabled={item.status !== "Pending"} onClick={()=>decline(item.products[0].productId,req)}>Decline</Button>
                        </div>
                    </CardContent>
                </Box>
            </Card>
            {index == data.length-1?<>
                <div className={`${bg} py-5 grid grid-cols-7`}>
                    <TextField id="outlined-basic" label="Notes" variant="outlined" sx={{backgroundColor:"white",borderRadius:1}} className="md:w-[30vw] lg:w-full sm:w-[15vw] ms-10 col-span-5"/>
                    <div className="col-start-7 flex items-center ">
                        <ResponsiveButton placeholder={"Done"} bg={"bg-orange-primary"} onClick={()=>update(req)}/>
                    </div>
                </div>

            </>:""}
        </div>
  )
}

export default PendingBatchRequestCard