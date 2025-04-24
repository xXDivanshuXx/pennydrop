
import React from 'react';
import { Alert, AppBar, Box, Button, Divider, Pagination, Paper, Select, Snackbar, Toolbar, Tooltip, Typography } from '@mui/material';
import { useLocation , useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Aos from 'aos';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import eezibLogo from "../images/eezib.png";
import transGif from "../images/Animation - 1713274369783.gif"
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Footer from './ui/Footer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ApiFile } from '../compound/ApiFile';


const Transitions = () => {

  const [resp , setResp] = React.useState([]);
  const [secureToken , setSecureToken] = React.useState("");
  const [ userTable, setUserTable ] = React.useState();
  const [ verify , setVerify ] = React.useState(false);
  const [ openBack , setOpenBack ] = React.useState(false);
  const [ queryMessage , setMessageQuery ] = React.useState("");
  const [ status , setStatus ] = React.useState('');
  const  [ handleErr , setHandleErr] = React.useState(false);
  const [ handleSuccess , setHandleSuccess ] = React.useState(false);
  const [ jsonError , setJsonError ] =React.useState("");
  const [ jsonSuccess , setJsonSuccess ] = React.useState("");
  const [page , setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }; 

 const handleverifyClose = () => {
    setVerify(false);
  }

  const handleBackClose = () => {
    setOpenBack(false); 
  }

  const handleErrClose = () => {
    setHandleErr(false)
  }

  const HandleSuccessClose = () => {
    setHandleSuccess(false);
  }

  // const location = useLocation();
  // const data =  location.state.id;
  // const values =Object.values(data);
  // const medium = values[0];
  // const date = values[1];
  // const type = values[2];
  // const report = values[3];
  // const token = values[4];
  // console.log("date : ",date)
  // // const dates = date[0].startDate
  //     // console.log("date is : ",dates);
  //     // const resultDate = moment.utc(dates).format("YYYY MM DD").replace(/GMT.*/g,"")
  //     console.log("result date : ",data)
  // console.log("transition token: ",token);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(userTable);

  const api  = process.env.REACT_APP_AXIOS_URL;

  const data =  location.state.id;
  const token = data.token
  console.log("location data : ",token)

  async function getData(){
    try{

      

  // ************************************* Api for getting users data ********************************************

  const api  = process.env.REACT_APP_AXIOS_URL;


      // const apiData = await fetch(`${api}/api/get_data` , {
      //   method:'POST',
      //   headers:{
      //     "Accept":"application/json",
      //     "Authorization":`Bearer ${token} `
      //   },
      //   body:JSON.stringify(data)
      // })
  
      // const json = await apiData.json();
      // console.log("json data : ",json);

      const method = "POST";
  
      const json = await ApiFile({"apiUrl":`${api}/api/get_data`, "method":method, "authAccess":token, "bodyData": data });      

      
      if(json){
        if(json.Status === "Success"){
          setUserTable(json.Data);
        }
        if(json.Status === "Error"){
          setHandleErr(true);
          setJsonError(json.Message)
         }
        if(json.message === "Unauthenticated."){
          setHandleErr(true);
          setJsonError(json.message)
          setTimeout(() => {
            window.location.replace(process.env.REACT_APP_AXIOS_URL);
          },800)
        }
      }
      
    }catch(error){
      console.log("error is : ",error);
      setHandleErr(true);
      setJsonError(true);

      setTimeout(() => {
        window.location.replace(process.env.REACT_APP_AXIOS_URL)
      },800)
      
    }
  }

  React.useEffect(() => {
    getData()
  },[])

  const statusEnquiry = async(e) => {

    console.log("entered enquiry")

    try{
      console.log("ref no : ", e );
  
      setOpenBack(true);
  
  
  
      //   const fetchdata = await fetch(`${api}/api/dmt_status_enuiry`, {
      //   method:"POST",
      //   headers:{
      //     "Accept":"application/json",
      //     "Content-Type":"application/json",
      //     "Authorization":`Bearer ${token}`
      //   },
      //   body:JSON.stringify({ "ref_no":e.toString() })
      // })
      
      // setOpenBack(false);
  
      // const json = await fetchdata.json();

      const api  = process.env.REACT_APP_AXIOS_URL;
      const apiUrl = `${api}/api/dmt_status_enuiry`;
      const method = "POST";
      const bodyData = { "ref_no":e.toString() }
  
      const json = await ApiFile({"apiUrl":apiUrl, "method":method, "authAccess":token, "bodyData": bodyData });      

      console.log("json data : ",json);

      setOpenBack(false);

  
      if(json){
        if(json.Status === "Success"){
          setVerify(true);
          setMessageQuery(json.Message);
          setStatus("Success");
          window.scrollTo(0,0);
          setTimeout(() => {
            getData()
          },500)
        }
        if(json.Status === "Error"){
          window.scrollTo(0,0);

          console.log("entered error")
          setHandleErr(true);
          setJsonError(json.Message);
          // setMessageQuery(json.Message);
          setStatus("Error");
          setTimeout(() => {
            getData()
          },500)
        }
      }
    }catch(err){
      setOpenBack(false);
      setHandleErr(true);
      setJsonError(err);
    }

  }

  React.useEffect(() => {
    Aos.init({duration:2000})
  },[])


  const startIndex = (page -1)* rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const slicedData = userTable?.slice(startIndex, endIndex);

  
  return (
    <Box data-aos="fade-down" className='sss' sx={{height:"100vh", width:"100%"}} >
      <Box sx={{margin:"0rem", display:'flex', alignItems:'center', justifyContent:'center', flexDirection:"column"}} >
 
        <AppBar color="transparent" sx={{backgroundColor:'#1d66db'}} position="static" >
            <Toolbar  sx={{ display:'flex', alignItems:'center' }} >
                <Tooltip onClick={() => navigate(-1)} sx={{ fontFamily:'montserrat', fontWeight:500, margin:0 }} title="Back">
                <ArrowBackIosIcon sx={{ cursor:'pointer', color:'white', fontSize:"1.4rem" }} />
              </Tooltip>                    <Typography sx={{fontFamily:'montserrat' , fontSize:"1.2rem" , color:'white' }} >Welcome To Eezib Transactions </Typography> 
                    {/* <Button  sx={{fontFamily:'Castoro' , fontSize:"1.2rem" , float:'right' }}>  {mode} </Button> */}

                  
            </Toolbar>
        </AppBar>

    <TableContainer sx={{marginTop:"1rem" , backgroundColor:'transparent', display:"block", overflowX:"auto" , backdropFilter:"blur(2px)" , width:"90%" }} elevation={24} component={Paper}   >
      <Table sx={{  }} aria-label="simple table">
        <TableHead >
          <TableRow sx={{ backgroundColor:"#2196f3" }} >
          <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }}  >Sr No.</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }}  >Payment Mode</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }}  >Status</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }} >Date</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }} >Refrence No.</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", fontSize:{lg:"0.9rem", xs:"0.8rem"} }} >Amount</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600, color:"white", position:{xs:"sticky", md:null, lg:null}, right:{xs:0, md:null, lg:null}, zIndex:{xs:3, md:null, lg:null}, backgroundColor:{xs:"#2196f3", md:"transparent", lg:"transparent"}, fontSize:{lg:"0.9rem", xs:"0.8rem"} }} >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          { Array.isArray(slicedData) && slicedData?.map((row,index) => (
            <TableRow
            className="tableRow"
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },fontFamily:'montserrat' }}
            >
               <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" } }} >{ startIndex + index + 1}</TableCell>

              <TableCell component="th" scope="row" align="center" sx={{fontFamily:'montserrat' , fontWeight:500, fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" }  }}  >
                {row.pay_mode}
              </TableCell>
              {/* <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.payment_type}</TableCell> */}
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" } }} >{row.status}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" } }} >{row.trans_Date}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" } }} >{row.Ref_no}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500 , fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.7rem" } }} >₹ {row.amount}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500, position:{xs:"sticky", md:null, lg:null}, right:{xs:0, md:null, lg:null}, zIndex:{xs:3, md:null, lg:null} , backgroundColor:{xs:"white", md:"transparent", lg:"transparent"} }} >
              {
                row.status_code === 1 ? <Button variant='contained' onClick={() => statusEnquiry(row.Ref_no) } size="small" sx={{ fontFamily:"montserrat", fontWeight:500, fontSize:{ lg:"0.9rem", sm:"0.85rem", xs:"0.6rem" } }} >check status</Button> : row.status_code === 2 ? null : null
              }
              </TableCell>

              {/* <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} > <Button variant='contained' > Check </Button> </TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <Pagination
                  variant="outlined"
                  color="primary"
                  count={Math.ceil(userTable?.length / 8)}
                  page={page}
                  onChange={handleChangePage}
                  sx={{ m:4 }}
              />
    </Box>




    <Dialog
        open={verify}
        onClose={handleverifyClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CloseIcon onClick={() => setVerify(false)} sx={{ marginLeft:"auto", position:"relative", fontSize:"1.2rem", cursor:"pointer" }} />
        <DialogTitle id="alert-dialog-title" sx={{ display:'flex', alignItems:'center', justifyContent:'center' }} >

          {/* <Box component='img' src={eezibLogo} sx={{ width:"5rem" }} /> */}
          <Typography sx={{ fontFamily:'montserrat', fontWeight:600, marginTop:"-1rem" }} > Transaction Status </Typography>
        </DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }} >
          {
            status === "Success" ? <VerifiedIcon color="success" sx={{ fontSize:"5rem" }} /> : status === 'Error' ? <NewReleasesIcon color="error" sx={{ fontSize:"5rem" }} /> : null
          }
          <img  />
        <Typography sx={{ fontFamily:"montserrat", fontWeight:600, fontSize:"1.2rem", marginTop:"1rem" }} >{queryMessage}</Typography>
        </DialogContent>
      </Dialog>






      <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"right" }}
            open={handleErr}
            onClose={handleErrClose}
            autoHideDuration={2500}
            >
              <Alert severity='error' >{jsonError}</Alert>
            </Snackbar>


      
      <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={handleSuccess}
      onClose={HandleSuccessClose}
      autoHideDuration={2500}
      >
        <Alert severity='success' >{jsonSuccess}</Alert>
      </Snackbar>
      

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBack}
        onClick={handleBackClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    <Footer />

     </Box>
)
}

export default Transitions

// {
//   Array.isArray && resp.map((prop,index) => (
//    <Box  key={index}  className="zzz" >

     
//    </Box>

//    ))
// }