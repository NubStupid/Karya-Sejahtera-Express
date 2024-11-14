import { Avatar, Typography } from "@mui/material";

export default function BubbleChat({sender, message, read, time})
{
    let date = new Date(time)
    return (
        <>
            {sender == "admin" &&
                <div className="flex">
                    <Avatar alt="Guest" src="" sx={{ width: 40, height: 40 }}/>
                    <div className="ms-5 max-w-[800px]">
                        {/* <div className="flex">
                            <div className="bg-orange-secondary p-2 rounded-md mb-3 w-fit">asdfasdfasdf</div>
                            <div className="mt-auto mb-3 ms-1">
                                <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600">10.30</Typography>
                            </div>
                        </div> */}
                        <div className="flex">
                            <div className="bg-orange-ternary p-2 rounded-md mb-3 w-fit">{message}</div>
                            <div className="mt-auto mb-3 ms-1">
                                <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600">{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Typography>
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
            {sender != "admin" &&
                <div className="flex">
                    <div className="ms-auto me-5 max-w-[800px] justify-end">
                        {/* <div className="flex">
                            <div className="mt-auto mb-3 me-1 ms-auto">
                                <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600">Read</Typography>
                            </div>
                            <div className="bg-gray p-2 rounded-md mb-3 w-fit">asdfasdfasdf</div>
                        </div> */}
                        <div className="flex">
                            <div className="mt-auto mb-3 me-1 ms-auto">
                                {read == true && 
                                <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600 text-right">Read</Typography>}
                                <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600">{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Typography>
                            </div>
                            <div className="bg-gray p-2 rounded-md mb-3 w-fit">{message}</div>
                        </div>
                    </div>
                    <Avatar alt="Guest" src="" sx={{ width: 40, height: 40 }}/>
                </div>
            }
        </>
    )
}