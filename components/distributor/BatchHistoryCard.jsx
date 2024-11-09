import customColor from "@/app/customColor"
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"

const BatchHistoryCard = ({bg,data,notes}) => {
  return data.map((item,index)=>
    <div key={index}>
        <Card sx={{ display: 'flex', padding:5
            }}
            style={{
                backgroundColor:item.status == "Accepted"?customColor["bg-accepted"]:item.status=="Declined"?customColor["bg-declined"]:"lightyellow"
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
                        <Typography component="div" variant="h4" className="lg:ms-32 md:ms-auto">
                            Total
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                            className="lg:ms-32 md:ms-auto"
                        >
                            Rp. {item.products[0].stock && item.products[0].price? item.products[0].stock*item.products[0].price:0} 
                        </Typography>
                        <div className={`mt-2 text-end ${item.status&&item.status=="Accepted"?"text-green-500 font-bold text-xl":""} ${item.status&&item.status=="Declined"?"text-red-500 font-bold text-xl":""} ${item.status&&item.status=="Pending"?"text-amber-500 font-bold text-xl":""}`}>
                            {item.status?item.status:"Pending"}
                        </div>
                    </CardContent>
                </Box>
            
            </Card>
            {index == data.length-1?<>
                <Typography
                variant="subtitle2"
                component="div"
                sx={{ color: 'text.secondary' }}
                className="ps-10 pt-5 text-xl font-bold text-black underline decoration-pink-600"
            >
                Notes : {notes?notes:"No Notes Attached"}
            </Typography>
            <hr className="mt-2"/>
            </>:""}
    </div>
  )
}

export default BatchHistoryCard