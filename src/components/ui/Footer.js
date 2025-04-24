import { Box, Typography } from '@mui/material'
import React from 'react';


const Footer = () => {
  return (
    <Box sx={{ position:"fixed", bottom:0, width:"100%" }}  >
        <Box sx={{ backgroundColor:"#d9d9d9", display:'flex', alignItems:'center', justifyContent:'space-between', padding:"0.3rem 1rem" }} >
        <Typography sx={{ fontFamily:'montserrat', fontWeight:500, fontSize:{lg:"1rem", xs:"0.6rem" } }} >© 2021 copyright. All rights reserved.</Typography>
        <Typography sx={{ fontFamily:'montserrat', fontWeight:500,  fontSize:{lg:"1rem", xs:"0.6rem" }  }} >Designed By <span onClick={() => window.scroll(0,0)} style={{ color:"#4040e6", cursor:'pointer' , fontWeight:600}} > eezib </span> </Typography>
        </Box>
    </Box>
)
}

export default Footer