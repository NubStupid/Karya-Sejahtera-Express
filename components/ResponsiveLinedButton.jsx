import { Button } from "@mui/material"
import Link from "next/link"

const ResponsiveLinedButton = ({placeholder,href,isActive}) => {
  return (
    <>
        <Button sx={{
            borderBottom:"2px",
            borderStyle:isActive==true?"solid":"none",
            borderColor:"black",
            fontSize: '10px',
            padding: '10px 20px',
            '@media (min-width:600px)': { 
                fontSize: '12px', 
                padding: '10px 40px', 
            }, 
            '@media (min-width:960px)': {   
                fontSize: '14px', 
                padding: '12px 24px', 
            }, 
            '@media (min-width:1280px)': { 
                fontSize: '16px', 
                padding: '6px 20px', 
            }, 
            '@media (min-width:1920px)': { 
                fontSize: '22px', 
                padding: '10x 32px', 
            },
          }}
          >
            <Link href={href}>{placeholder}</Link>
          </Button>
    
    </>
  )
}

export default ResponsiveLinedButton