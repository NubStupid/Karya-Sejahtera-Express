import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from "react";

export default function BubbleChat({profpic, id, sender, message, read, time, delivered, setAction})
{
    const [anchorEl, setAnchorEl] = useState(null);
    let date = new Date(time)
    return (
        <>
            {sender == "admin" && delivered == true &&
                <div className="flex">
                    <Avatar
                        alt="profpic"
                        src={profpic ? profpic : "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png"}
                        sx={{ width: 40, height: 40 }}
                    />
                    <div className="ms-5 max-w-[800px]">
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
                        <div className="flex">
                            <div className="mt-auto mb-3 me-1 ms-auto">
                                {read == true && <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600 text-right">Read</Typography>}
                                {delivered == true && <Typography component="div" variant="body2" sx={{fontSize: 11}} className="text-gray-600">{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Typography>}
                                {delivered == false && <ErrorIcon sx={{width: 15, color: "red"}} onClick={(e) => setAnchorEl(e.currentTarget)}></ErrorIcon>}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    anchorOrigin={{ vertical: "center", horizontal: "left" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    <MenuItem onClick={() => {setAnchorEl(null), setAction({act: "retry", id, message})}} className="text-sm" dense>Resend</MenuItem>
                                    <MenuItem onClick={() => {setAnchorEl(null), setAction({act: "delete", id})}} className="text-sm" dense>Delete</MenuItem>
                                </Menu>
                            </div>
                            <div className="bg-gray p-2 rounded-md mb-3 w-fit">{message}</div>
                        </div>
                    </div>
                    <Avatar
                        alt="Guest"
                        src={profpic ? profpic : "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-an-adorable-cartoon-cracker-with-a-crown-vector-png-image_6820716.png"}
                        sx={{ width: 40, height: 40 }}
                    />
                </div>
            }
        </>
    )
}