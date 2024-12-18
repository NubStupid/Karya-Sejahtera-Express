import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import customColor from "@/app/customColor"
import ResponsiveButton from "../ResponsiveButton"
const PendingRequestCard = ({bg,image,productName,price,qty,accept,decline,id,req,update,setNotes,notes}) => {
  return (
    <>
        <div className="">


            <Card sx={{ display: 'flex', padding:5
            }}
            style={{
                backgroundColor:customColor[bg]?customColor[bg]:white
            }}
            >
            <CardMedia
                component="img"
                image={image}
                alt="Bobi Bobi"
                className="lg:w-[151px] lg:h-[151px] md:w-[120px] md:h-[120px] sm:w-[90px] sm:h-[90px] xs:w-[45px] xs:h-[45px]"
                />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h4">
                    {productName?productName:"Yes"}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    <div className="flex">
                        <div className="me-10">
                            x{qty?qty:0}
                        </div>
                        <div className="">
                            Rp. {price?price:0}
                        </div>
                    </div>
                </Typography>
                <TextField id="outlined-basic" label="Notes" variant="outlined" sx={{backgroundColor:"white",borderRadius:1}} className="md:w-[30vw] lg:w-[40vw] sm:w-[15vw]" defaultValue={notes?notes:""} onChange={(e)=>setNotes(req,e.target.value)}/>
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
                            Rp. {qty && price? qty*price:0} 
                        </Typography>
                        <div className="mt-2">
                            <Button className="bg-green-400 text-black rounded-lg p-2 px-5 mx-2" onClick={()=>accept(id,req)}>Accept</Button>
                            <Button className="bg-red-400 text-black rounded-lg p-2 px-5 mx-2" onClick={()=>decline(id,req)}>Decline</Button>
                        </div>
                    </CardContent>  
                </Box>
            </Card>
            <div className={`${bg} py-5 grid grid-cols-7`}>
                    <div className="col-start-7 flex items-center ">
                        <ResponsiveButton placeholder={"Done"} bg={"bg-orange-primary"} onClick={()=>update(req)}/>
                    </div>
                </div>
        </div>
    </>
  )
}

export default PendingRequestCard