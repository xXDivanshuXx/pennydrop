import React from 'react';
import { Box,Button, Typography } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import eezib2 from "../images/eezib2.png";
import StartIcon from '@mui/icons-material/Start';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Aos from 'aos';
import { WavyBackground } from "../components/ui/wavy-background";
import { ApiFile } from './ApiFile';


const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ authToken , setAuthToken ] = React.useState('');
  const [ userId , setUserId ] = React.useState('');
  const [ mobileNo , setMobileNo ] = React.useState('');

  const navigate = useNavigate()


  async function getData(){

    try{


      const windowUrl = window.location.search;
      const validateToken = windowUrl.replace("?home=","");



      
      // ********************** First Authentication api to be fetched ************************************

      if(validateToken){


              
      const api  = process.env.REACT_APP_AXIOS_URL;

      const apiUrl = `${api}/api/corporate_detail`;
      const method = "POST";
      const authAccess = validateToken;
      const bodyData = {}


      const json = await ApiFile({"apiUrl":`${api}/api/corporate_detail`, "method":method, "authAccess":validateToken, "bodyData":bodyData });

      
   if(json){
     if(json.Status === "Success"){

       const authtoken = json.Data.access_token
       setAuthToken(authtoken);
       console.log("access token : ",authtoken);

       const userid = json.Data.user_id 
       setUserId(userid);
       console.log("user id : ",userid);

       const mobileno = json.Data.mobile_no 
       setMobileNo(mobileno);
       console.log("mobile number : ",mobileno);

       if( authtoken && userid && mobileno ){
         navigate("/cards" , {state : {data : { "auth":authtoken, "userid":userid, "mobileno":mobileno }} })
       }else{
         // window.alert("auth mismatched")
       }

     }

      if(json.message === "Unauthenticated."){
       // window.alert("user unauthenticated");
       // window.alert(json.message)
      } 

   }

      }



    // const data = await fetch(`${api}/api/corporate_detail`, {
    //   method:"POST",
    //   headers:{
    //     "Accept":"application/json",
    //     "Content-Type":"applicatio/json",
    //     "Authorization":`Bearer ${validateToken}`
    //   },
    //   body:JSON.stringify({})
    // });
    // const json = await data.json();

    // console.log(json);

    

    
    }catch(error){

      console.log("error is : ",error);
        
    }

  }

  React.useEffect(() => {
    getData();
    // window.history.pushState(" ",window.location.pathname);
    
  },[])

  React.useEffect(() => {
    Aos.init({duration:2500})
},[])



  return (


    <WavyBackground className="max-w-5xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center mt-10 ">
        <span className=" text-blue-500" >Eezib</span> Payment Solutions
      </p>
      <p className="text-base md:text-lg mt-8 text-white font-normal inter-var text-center">
      A further step for our happy costumers to make payment more easy ,efficient and secure.
      </p>
    </WavyBackground>
    

    //  <Box sx={{marginTop:{md:0,sm:0,xs:0} , width:"100%", padding:0 , display:"flex", alignItems:'center' , justifyContent:{ xs:"center" ,  md:"left"} }}  >
     
        
    //   <motion.div transition={{ ease:"linear", duration:2, x:{duration:1} }}  className='paymentBack' >
    //     <img data-aos="fade-down" style={{width:"11rem" , margin:"1rem", cursor:'pointer'}} src={eezib2} alt="logo" />
    //   <div className='payment' >

    //         <Typography  data-aos="fade-right" align='center' sx={{fontFamily:"montserrat" , fontSize:{md:"5rem" , xs:"3rem"} , fontWeight:800 , color:"white" , marginTop:"2rem"}} >The Best <span style={{color:"#2596be"}} >Payment</span> Solution</Typography>

    //     <span>
    //       {/* <span style={{display:'flex', alignItems:'center', justifyContent:"center", flexDirection:'column'}} >
    //         <Typography sx={{fontFamily:"montserrat",fontSize:"2rem",textTransform:"capitalize",color:'white',fontWeight:600 ,marginTop:"0.5rem" }} > <span style={{color:'#2596be'}}>Your</span>  flexibility </Typography>
    //         <Typography sx={{fontFamily:"montserrat",fontSize:"2rem",textTransform:"capitalize",color:'white',fontWeight:600 ,marginTop:"0.5rem" }}>our <span style={{color:'#2596be'}}>excellence</span> </Typography>
    //       </span> */}
    //         <Typography data-aos="fade-left" align='center' sx={{color:"white" , color:'#B0B0B0', fontSize:{md:"1.5rem" , xs:"1.3rem"} ,fontFamily:"montserrat" , marginTop:{md:"1.5rem",xs:"3rem"}}}> A further step for our happy cosumers to make payment more easy ,efficient and secure ..  </Typography>
        
    //     </span>
    //    <Box data-aos="fade-down" sx={{ display:'flex' , alignItems:'center' , justifyContent:'center' , marginTop:{md:"6rem",sm:"4rem",xs:"3.5rem"} }} >
    //      <Typography sx={{color:'white' ,fontFamily:"montserrat" , fontSize:{xs:"1rem" , md:"2rem"} }} > Time To Switch  </Typography>
    //     <ToggleOnIcon sx={{color:"#2596be" , fontSize:{md:"3rem" , xs:"2rem" } }} />
    //     <Typography sx={{color:'white' ,fontFamily:"montserrat" , fontSize:{xs:"1rem" , md:"2rem"} }} >Eezib Payment Transfer</Typography>
    //    </Box>

    //    <Button variant='contained' onClick={()=>  navigate("/cards") } sx={{fontFamily:'montserrat',fontSize:{md:"1.3rem",xs:"0.9rem"}, textTransform:"capitalize", fontWeight:500 , padding:{md:"0.3rem 1.5rem 0.3rem 3rem",xs:""} ,margin:{md:"4% 1%",xs:"10% 1%"} }} > Access Eezib Payment Transfer &nbsp; <StartIcon/></Button>
    //    {/* <Button variant='contained' onClick={()=> window.location.replace("https://uat.eezib.in/login") } sx={{fontFamily:'montserrat',fontSize:{md:"1.3rem",xs:"0.9rem"}, textTransform:"capitalize", fontWeight:500 , padding:{md:"0.3rem 1.5rem 0.3rem 3rem",xs:""} ,margin:{md:"4% 1%",xs:"10% 1%"} }} > Access Eezib Payment Transfer &nbsp; <StartIcon/></Button> */}

    //     </div>
    //     </motion.div>

    // </Box>  
  )
}

export default Header

//  1951|JEJE2o4mU03NEmvry7yqAG0i0opEEbBCbxhDns7u
