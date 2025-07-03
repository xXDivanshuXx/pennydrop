import { Alert, AppBar, Button, Card, CardActions, CardContent, CardMedia, Grid, Snackbar, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import upiLogo from "../images/4137379.jpg";
import neftLogo from "../images/neftCard.jpg";
import impsLogo from "../images/impsCard.jpg";
import eeezibLogo from "../images/eezib2.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Aos from 'aos';
import NPCI from "../images/NPCI.jpg" 
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import {Link} from "react-router-dom";

import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FollowerPointerCard } from '../components/ui/following-pointer';
import { useTheme } from '@mui/material/styles';

import upi from "../images/upi.png";
import imps from "../images/imps.png";
import neft from "../images/neft.webp"
import Footer from '../components/ui/Footer';

const Cards = () => {

  // React.useEffect(() => { AOS.init({duration:1000});return()=> { AOS.refresh(); } },[])



  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmOrsm = useMediaQuery(theme.breakpoints.up('xs'));
  // const isXsOrsm = useMediaQuery(theme.breakpoints.up("xs"))

  const [name, setName] = React.useState("");
  const [token, setToken] = React.useState("");
  const [appear, setAppear] = React.useState(false);
  const [medium, setMedium] = React.useState('');
  const [type, setType] = React.useState("");
  const [report, setReport] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [startingDate, setStartingDate] = React.useState(new Date());
  // const [date , setDate] = React.useState("");
  const [endDate, setEndDate] = React.useState(new Date());
  const [endingDate, setEndingDate] = React.useState(new Date());
  const [ handleErr , setHandleErr ] = React.useState(false);
  const [ errorJson , setErrorJson ] = React.useState("");
  const [ userId, setUserId ] = React.useState("");

  const handleErrClose = () => {
    setHandleErr(false);
  }

  const handleChange = (event) => {
    setMedium(event.target.value);
  };

  const handleChange1 = (event) => {
    setType(event.target.value);
  };

  const handleChange2 = (event) => {
    setReport(event.target.value);
  };


  const [date, setDate] = React.useState([
    {

      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

console.log('env',window.location.origin)


  const handleClose = () => {
    setAppear(false);

  };

  async function getData() {

    try {
    
      // ************************************* Getting token from landing page **********************************
      console.log("location state : ",location.state.data);

      const headersData = await location.state;
      console.log(headersData);
      const authAccess = headersData?.data.auth;
      setToken(authAccess);

      console.log( "authAccess : ",authAccess );

      const userid = headersData?.data.userid;
      console.log("user id : ",userid);

      console.log("auth access : ",authAccess);
      const datas = Object.values(headersData);
      const token1 = datas[0];
      // console.log("cards token : ", token1);

      //  const dated = moment(startDate).format("YYYY MMM Do");
      //   setDate(dated)
      //   console.log("date is : ",dated);

      const datedB = moment(startDate).format("YYYY MM Do");
      setStartingDate(datedB)

      const datedC = moment(endDate).format("YYYY MM Do");
      setEndingDate(datedC);


    } catch (error) {
      console.log("error with location data on cards page : ", error);
      // navigate("/");
    }


  }

  // ****************************************** code for sending date ,excluding time and zone *****************************************

  const dates = date[0].startDate;
  const startedDate = moment.utc(dates).format("YYYY MM DD").replace(/GMT.*/g, "");

  const dates2 = date[0].endDate;
  const endedDate = moment.utc(dates2).format("YYYY MM DD").replace(/GMT.*/g, "");

  const datess = [{ startedDate, endedDate }];


  async function openDialog() {
    setAppear(true);
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    Aos.init({duration:2000})
},[])

const handleCard = () => {
    setHandleErr(true);
    setErrorJson("Service Comming Soon")
}


  return (




  //   <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:15 }} >



  //   <CardContainer className="inter-var w-80 h-96 ">
  //   <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
  //     <CardItem
  //       translateZ="50"
  //       className="text-xl font-bold text-neutral-600 dark:text-white"
  //     >
  //       Make things float in air
  //     </CardItem>
  //     <CardItem
  //       as="p"
  //       translateZ="60"
  //       className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
  //     >
  //       Hover over this card to unleash the power of CSS perspective
  //     </CardItem>
  //     <CardItem translateZ="100" className="w-full mt-4">
  //       <Box
  //       component='img'
  //         src={upiLogo}
  //         height="700"
  //         width="700"
  //         className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
  //         alt="thumbnail"
  //       />
  //     </CardItem>
  //   </CardBody>

  // </CardContainer>



  // <CardContainer className="inter-var w-80 h-96 ">
  //   <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
  //     <CardItem
  //       translateZ="50"
  //       className="text-xl font-bold text-neutral-600 dark:text-white"
  //     >
  //       Make things float in air
  //     </CardItem>
  //     <CardItem
  //       as="p"
  //       translateZ="60"
  //       className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
  //     >
  //       Hover over this card to unleash the power of CSS perspective
  //     </CardItem>
  //     <CardItem translateZ="100" className="w-full mt-4">
  //       <Box
  //       component='img'
  //         src={neftLogo}
  //         height="700"
  //         width="700"
  //         className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
  //         alt="thumbnail"
  //       />
  //     </CardItem>
  //   </CardBody>

  // </CardContainer>




  // <CardContainer className="inter-var w-80 h-96 ">
  //   <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
  //     <CardItem
  //       translateZ="50"
  //       className="text-xl font-bold text-neutral-600 dark:text-white"
  //     >
  //       Make things float in air
  //     </CardItem>
  //     <CardItem
  //       as="p"
  //       translateZ="60"
  //       className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
  //     >
  //       Hover over this card to unleash the power of CSS perspective
  //     </CardItem>
  //     <CardItem translateZ="100" className="w-full mt-4">
  //       <Box
  //       component='img'
  //         src={impsLogo}
  //         height="700"
  //         width="700"
  //         className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
  //         alt="thumbnail"
  //       />
  //     </CardItem>
  //   </CardBody>

  // </CardContainer>
    
  //   </Box>


    <Box initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="kalakaar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

      <AppBar color='transparent' >
        <Toolbar sx={{ padding: "1rem" }}  >

          <Box component="img" src={eeezibLogo} sx={{ width: "10rem", marginRight: "auto" }} />

          {/* <Paper elevation={8} sx={{marginLeft:"auto"  ,marginTop:""  , borderRadius:"3rem 3rem 3rem 3rem" , padding:" 0.2rem 1rem", fontWeight:500 , textAlign:'center',fontSize:"1.2rem" }} >Welcome <br/>  <span style={{color:'red', fontWeight:600}} >{name}</span></Paper>   */}

          <Button variant='contained' color="primary" id="basic-button"

            sx={{ fontFamily: 'montserrat' }}
            onClick={openDialog} >Show Transactions
          </Button>

          <Dialog

            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "55rem",  // Set your width here
                },
              },
            }}
            open={appear}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }} >Enter Paramaters </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection:{lg:"row", md:"row", sm:"column", xs:"column"} }} >

                  <Box data-aos="fade-down" sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: "1rem" }} >
                    <Typography component={"span"} sx={{ fontFamily: 'montserrat', fontWeight: 600 }} > Transaction Mode </Typography>


                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Medium</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={medium}
                        label="medium"
                        onChange={handleChange}
                      >
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="ALL">ALL</MenuItem>
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="UPI">UPI</MenuItem>
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="IMPS">IMPS</MenuItem>
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="NEFT">NEFT</MenuItem>
                      </Select>
                    </FormControl>

                  </Box>

                  <Box data-aos="fade-down" sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

                    <Typography component={"span"} sx={{ fontFamily: 'montserrat', fontWeight: 600, marginTop: "1rem" }} > Transaction Status </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Type</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={type}
                        label="type"
                        onChange={handleChange1}
                      >
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="ALL">ALL</MenuItem>
                        <MenuItem onClose={handleClose} sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="SUCCESS">SUCCESS</MenuItem>
                        <MenuItem onClose={handleClose} sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="PENDING">PENDING</MenuItem>
                        <MenuItem onClose={handleClose} sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="FAILED">FAILED</MenuItem>

                      </Select>
                    </FormControl>

                  </Box>

                  <Box data-aos="fade-down" sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >


                    <Typography component={"span"} sx={{ fontFamily: 'montserrat', fontWeight: 600, marginTop: "1rem" }} > Report Type </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >Report</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={report}
                        label="report"
                        onChange={handleChange2}
                      >

                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="SUMMARY">SUMMARY</MenuItem>
                        <MenuItem sx={{ fontFamily: 'montserrat', fontWeight: 500 }} value="DETAIL">DETAIL</MenuItem>
                      </Select>
                    </FormControl>

                  </Box>

                </Box>


                <Box sx={{ display: 'flex', alignItems: 'left', marginTop: "3rem", justifyContent: 'center', flexDirection: 'column', gap: "1rem" }} >



                  <Accordion sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "55rem",  // Set your width here
                      },
                    },
                  }}  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography component={"span"} sx={{ fontFamily: 'montserrat', fontWeight: 600 }}> Date Range </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DateRangePicker
                        onChange={item => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={ 1 }
                        ranges={date}
                        direction="horizontal"
                        
                        
                      />
                    </AccordionDetails>
                  </Accordion>

                  <Box>



                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker selected={startingDate} onChange={(date) => setStartDate(date)}  label="Start date picker" />
                </DemoContainer>
              </LocalizationProvider>


              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker selected={endingDate} onChange={(date) => setEndDate(date)}  label="End date picker" />
                </DemoContainer>
              </LocalizationProvider> */}

                    {/* <DateRangePicker
                  onChange={item => setDate([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={date}
                  direction="horizontal"
                /> */}

                  </Box>


                  {/* </AccordionDetails>
      </Accordion> */}

                </Box>




                <span>



                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider> */}

                </span>
                {/* location data to Google, even when no apps are running. */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {
                medium && type && report !== "" ? <Button variant="contained" color="primary" onClick={() => navigate("/transitions", { state: { id: { "token":token } } })}>Submit</Button> : <Button disabled >Submit</Button>

              }

            </DialogActions>
          </Dialog>

          {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate("/transitions" , {state:{id:"UPI",name,token} })} sx={{fontFamily:'montserrat' , fontWeight:500}} value="upi" >UPI</MenuItem>
        <MenuItem onClick={() => navigate("/transitions" , {state:{id:"IMPS",name,token}})} sx={{fontFamily:'montserrat' , fontWeight:500}} value="imps" >IMPS</MenuItem>
        <MenuItem onClick={() => navigate("/transitions" , {state:{id:"NEFT",name , token}})} sx={{fontFamily:'montserrat' , fontWeight:500}} value="neft" >NEFT</MenuItem>
      </Menu> */}

        </Toolbar>
      </AppBar>



      
      <motion.div 
        //  animate={{ x:0 , y:10}}
        initial={{ opacity: 0, scale:0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping:3,
          stiffness: 100,
          restDelta: 0.001
        }
      
        }}      >
      <Box className='simple' sx={{ fontSize: { md: "3rem", xs: "1.7rem", sm:"2rem", lg:"3.5rem" }, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: { md: "row", sm: "row", xs: "column" }, marginTop:"10rem" }} > Select&nbsp;<Box className='stokeText' sx={{ fontSize: { md: "3rem", xs: "1.7rem", sm:"2rem", lg:"3.5rem" } }} >eezib payment transfer</Box>&nbsp;mode.</Box>
      </motion.div>

      <Grid container columnSpacing={{ xs: 1, sm:1, md:1 }} rowSpacing={{ xs: 1, sm:1, md:1 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: { xs: 'column', xl:"row", lg:"row", sm:"row" }, cursor: 'pointer', marginTop: { md: "0", xs: "0.5rem", lg:"-3rem" } }}>




        {/* <Card data-aos="fade-right" sx={{ maxWidth: 270, margin: "1rem", boxShadow: '0px 0px 5px 0px white' }}>
          <CardMedia
            sx={{ height: 180 }}
            image={upiLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='center' >
              UPI
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >
              IMPS provides robust & real time fund transfer which offers an instant, 24X7
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ fontFamily: 'montserrat' }} onClick={() => navigate("/cards", { state: token })} variant='contained' fullWidth size="small">Comming soon</Button>
          </CardActions>
        </Card> */}


        {/* <Card data-aos="fade-down" sx={{ maxWidth: 270, boxShadow: '0px 0px 5px 0px white' }}>
          <CardMedia
            sx={{ height: 180 }}
            image={impsLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >
              IMPS
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >
              Its a Single mobile application for accessing different bank accounts over a single Network
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='contained' fullWidth size="small" sx={{ fontFamily: 'montserrat' }} onClick={() => navigate("/imps", { state: location.state.data })}  >Access iMPS </Button>
          </CardActions>
        </Card> */}


        {/* <Card data-aos="fade-left" sx={{ maxWidth: 270, margin: "1rem", boxShadow: '0px 0px 5px 0px white' }}>
          <CardMedia
            sx={{ height: 180 }}
            image={neftLogo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='center' >
              NEFT
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'montserrat', fontWeight: 500 }} >
              NEFT is an electronic funds transfer system set up and managed by RBI.
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ fontFamily: 'montserrat' }} onClick={((e) => navigate("/cards ", { state: { id: 2 } }))} variant='contained' fullWidth size="small">comming soon.</Button>
          </CardActions>
        </Card> */}

<CardContainer onClick={() => handleCard()} className="inter-var w-80 h-96">
    <CardBody  className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark: bg-blue-300 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
      <CardItem
        translateZ="50"
        className="text-2xl font-bold text-neutral-600 dark: text-blue-500 text-center"
      >
        UPI
      </CardItem>
      <CardItem translateZ="100" className="w-full mt-4">
        <Box
        component='img'
          src={upi}
          sx={{ backgroundColor:'white', boxShadow:"2px solid black" }}
          height="400"
          width="700"
          className="h-30 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className=" text-black text-sm max-w-sm mt-2 dark: text-gray-700"
      >
        Fast, Secure and convenient to instant transactions directly from bank accounts using mobile apps.
      </CardItem>
    </CardBody>
  </CardContainer>




    <Box onClick={() => navigate("/imps", { state: location.state.data })} >
  <CardContainer className="inter-var w-80 h-96 ">
  <CardBody  className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark: bg-blue-300 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
      <CardItem
        translateZ="50"
        className="text-2xl font-bold text-neutral-600 dark:text-blue-500 text-center"
      >
        IMPS
      </CardItem>
      <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 1,
        ease:"easeOut",
      }} 
      
      initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
      >
      <CardItem translateZ="100" className="w-full mt-4">
        <Box
        component='img'
          src={imps}
          sx={{ backgroundColor:"white" }}
          height="400"
          width="700"
          className="h-35 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem> 
      </motion.div>
      <CardItem
        as="p"
        translateZ="60"
        className=" text-black text-sm max-w-sm mt-2 dark: text-gray-700"
      > 
      Provides instant fund transfers, operates 24/7, and supports multiple bank accounts and services,
      </CardItem>
    </CardBody>
  </CardContainer>
    </Box>

<Box onClick={() => navigate("/neft", { state: location.state.data })} >
    <CardContainer  className="inter-var w-80 h-96 ">
  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark: bg-blue-300 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
      <CardItem
        translateZ="50"
        className="text-2xl font-bold text-neutral-600 dark: text-blue-500 text-center"
      >
        NEFT
      </CardItem>
      <CardItem translateZ="100" className="w-full mt-4">
        <Box
        component='img'
          src={neft}
          height="400"
          width="700"
          className="h-30 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className=" text-black text-sm max-w-sm mt-2 dark: text-gray-700"
      >
        Offers secure and efficient electronic fund transfers with low fees, making it a reliable choice for payments.      
        </CardItem>
    </CardBody>
  </CardContainer>
</Box>

      </Grid>


      <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={handleErr}
      onClose={handleErrClose}
      autoHideDuration={2500}
      >
        <Alert severity='error' >{errorJson}..</Alert>
      </Snackbar>

<Footer/>

    </ Box>

  )
}

export default Cards