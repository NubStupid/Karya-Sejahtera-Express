import customColor from "@/app/customColor"
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"

const BatchHistoryCard = ({bg,data}) => {
  return data.map((item,index)=>
    <div key={index}>
        <Card sx={{ display: 'flex', padding:5
            }}
            style={{
                backgroundColor:item.products[0].status == "Accepted"?customColor[bg]:"white"
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
                {/* <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    {notes?notes:"No Notes Attached"}
                </Typography> */}
                </CardContent>
            </Box>
                <Box sx={{pl: 1, pb: 1 }} className="ms-auto">

                    <CardContent className="">
                        <Typography component="div" variant="h4" className="lg:ms-32 md:ms-auto">
                            Total
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                            className="lg:ms-32 md:ms-auto"
                        >
                            Rp. {qty && price? qty*price:0} 
                        </Typography>
                        <div className={`mt-2 text-end ${status&&status=="Accepted"?"text-green-500 font-bold text-xl":""} ${status&&status=="Declined"?"text-red-500 font-bold text-xl":""}`}>
                            {status?status:"Pending"}
                        </div>
                    </CardContent>
                </Box>
            
            </Card>
    </div>
  )
}

export default BatchHistoryCard