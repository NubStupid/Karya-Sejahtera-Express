import { Button } from "@mui/material"
import Link from "next/link"

const ResponsiveButton = ({placeholder,href}) => {
  return (
    
        <Button variant="contained" className="bg-blue-primary rounded-lg"
                    sx={{
                        fontSize: '8px',
                        padding: '10px 20px',
                        '@media (min-width:600px)': { 
                            fontSize: '10px', 
                            padding: '10px 40px', 
                        }, 
                        '@media (min-width:960px)': { 
                            fontSize: '12px', 
                            padding: '12px 24px', 
                        }, 
                        '@media (min-width:1280px)': { 
                            fontSize: '12px', 
                            padding: '6px 20px', 
                        }, 
                        '@media (min-width:1920px)': { 
                            fontSize: '20px', 
                            padding: '10x 32px', 
                        },
                    }}
                    
        ><Link href={href?href:"#"}>{placeholder}</Link></ Button>
  )
}

export default ResponsiveButton