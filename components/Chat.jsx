import { Avatar } from "@mui/material";

export default function Chat({sender})
{
    return (
        <>
            {sender == "admin" &&
                <div>
                    <Avatar alt="Guest" src="" sx={{ width: 50, height: 50 }}/>
                    <div>asdfasdfasdf</div>
                </div>
            }
        </>
    )
}