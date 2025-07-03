import { Alert, AppBar, Box, Button, Checkbox, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, LinearProgress, Menu, MenuItem, OutlinedInput, Paper, Select, Slide, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import eezibLogo from "../images/eezib2.png";
import eezib from "../images/eezib.png"
import Aos from 'aos';
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Meteors } from "./ui/meteors";
import Backdrop from '@mui/material/Backdrop';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { saveAs } from 'file-saver';
import { CardBody, CardContainer } from './ui/3d-card';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import { ApiFile } from '../compound/ApiFile';
import Footer from './ui/Footer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});





const Imps = () => {

    const[name , setName] = React.useState("");
    const[account , setAccount] = React.useState("");
    const [ifsc , setIfsc] = React.useState("");
    const [ammount , setAmmount] = React.useState(1);
    const [transition, setTransition] = React.useState(undefined);
    const [accountType , setAccountType] = React.useState("");
    const [ bankType, setBankType ] = React.useState("");
    const [remark , setRemark] = React.useState("");
    const [loading , setLoading] = React.useState(false);
    const [file , setFile] = React.useState();
    const [jsonData, setJsonData] = React.useState([]);
    const [openTable , setOpenTable] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const  [ status , setStatus ] = React.useState('idle');
    const [message, setMessage] = React.useState('');
    const  [ handleErr , setHandleErr] = React.useState(false);
    const [ jsonError , setJsonError ] = React.useState('');
    const [handleSuccess , setHandleSuccess ] = React.useState(false);
    const [jsonSuccess , setJsonSuccess ] = React.useState('');
    const [ activeBack , setActiveBack ] = React.useState(false);
    const [ dmtProgress , setDmtProgress ] = React.useState(false);
    const  [ bankName ,setBankName ] = React.useState();
    const [ impsMessage , setImpsMessage ] = React.useState("");
    const [ impsDialogue , setImpsDialogue ]= React.useState(false);
    const  [ impsErrorDialogue , setImpsErrorDialogue ] = React.useState(false);
    const  [ impsErrorMsg , setImpsErrorMsg ] = React.useState("");
    const [ phoneNumber , setPhoneNumber ] = React.useState('');
    const [ senderNumber , setSenderNumber ] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(''); // default value
    const [ amount ,setAmount ] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    console.log("bank type : ",bankType, "  ifsc : ",ifsc);


  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
      console.log("Selected:", event.target.value); // You can do whatever you want here
    };


    const navigate = useNavigate();
    const location = useLocation(); 

    const user_Id = location.state.userid;


    React.useEffect(() => {

        const user = location.state;
        const user_Id = user?.userid; 
        console.log("user id: ",user_Id);

    },[location])

    const handleCheckChange = (event) => {
      setChecked(event.target.checked);
    };

    const fileInputRef= useRef(null);
    const selectRef = useRef(null);

    const handleImpsClose = () => {
      setImpsDialogue(false)
    }

    const handleImpsErrorClose = () => {
      setImpsErrorDialogue(false)
    }



    React.useEffect(() => {
      // Check if the ref and its current property exist
      if (selectRef.current) {
        // Focus the Select component
        selectRef.current.focus();
      }
    }, []);
  


    const handleErrClose = () => {
      setHandleErr(false);
    }

    const HandleSuccessClose = () => {
      setHandleSuccess(false);
    }

    const locationData = location.state;
    const authAccess = locationData.auth;
    const userid = locationData.userid;
    const mobileno = locationData.mobileno


    const handleClick = () => {
      setStatus('processing');
      setCurrentIndex(0); // Start from the beginning of the JSON data
      setMessage(''); // Reset any previous messages
  };

  const callApiWithJsonObject = async(jsonObject, index) => {

    console.log("entered json object : ",jsonObject)

    setActiveBack(true);

    try{

      const api  = process.env.REACT_APP_AXIOS_URL;
      const apiUrl = `${api}/api/dmt_utility_order`;
      const method = "POST";
      const bodyData = {};
      const baseKey = "Status";
      const expectedMsg = "Message";
      const success = "Success";
      const error = "Error";
  
      const json = await ApiFile({"apiUrl":apiUrl , "method":method, "authAccess":authAccess, "bodyData":{...jsonObject, "amount":jsonObject?.amount ? jsonObject?.amount : ammount, "remark":selectedValue  ,"is_verify":selectedValue=="verify" && checked ? 1 : checked && selectedValue=='transfer' ? 1 : 0, "fundTransfer":checked && selectedValue=='transfer' ? 1  : !checked && selectedValue=='transfer' ? 1 : 0} });
      
      console.log("bulk order json : ",json)

      if(json){

        if(json.Status === "Success"){

          setHandleSuccess(true);
          setJsonSuccess(`${json.Message} `);
          setImpsMessage(json.Message)

          setTimeout(() => {
            setCurrentIndex(index + 1);
          },800)
          
          setActiveBack(false);
          handleTableClose();

          // setTimeout(() => {
          //   setName("");
          //   setIfsc("");
          //   setAmmount("");
          //   setAccount("");
          //   setAccountType("");
          //   setRemark("");
          // },1000)

        }
        if(json.Status === "Error"){
          setTimeout(() => {
            setCurrentIndex(index + 1);
          },800);
          
          setActiveBack(false);

          setHandleErr(true);
          setJsonError(`${json.Message} at index ${index}`);
          // setTimeout(() => {
          //   window.location.replace(process.env.REACT_APP_AXIOS_URL);
          // },800)
          fileInputRef.current.value=""
        }

        if(json.status === "error"){
          setHandleErr(true);
          setJsonError(`${json.message} at index ${index}`);
      //  window.alert( `${json.message} ${index}` );
        setCurrentIndex(index + 1);
        setActiveBack(false);
        }
      }
    
    }catch(err){
      console.log("error : ",err);
      setActiveBack(false);
      window.alert("Internal server error");
    }

  }

  React.useEffect(() => {
    const processNextJson = async() => {
      if(status === "processing" && currentIndex < jsonData?.length){
        const currentJsonObject = jsonData[currentIndex];

          await callApiWithJsonObject(currentJsonObject, currentIndex)


      }
      // else if(  currentIndex !== 0 && jsonData.length >= currentIndex ){
      //     setStatus('completed');
      //     // setHandleSuccess(true);
      //     setTimeout(() => {
      //      // setJsonSuccess('excel ordering completed');

      //       // setImpsDialogue(true);
      //       // setImpsMessage("Your File Has Been Processed Successfully. Please Check Txn History For Details.");
          

      //       fileInputRef.current.value="";
      //     },1000)
      //     handleTableClose();
      //     console.log("json data length : ",jsonData.length)
      // }
    }

    console.log( "curent index : ", currentIndex, "  length : ",jsonData.length )

    processNextJson();
  },[status , currentIndex, jsonData])

    const handleTableClose = () => {
      setOpenTable(false);
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (!file) return;
  
      const reader = new FileReader();
  
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
  
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet);
  
          const requiredHeaders = ['mobile_no', 'name', 'account_number', 'account_type', 'ifsc_code', "senderNumber", "bank_name" ];
          const headers = Object.keys(sheetData[0]);
          const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
  
          if (missingHeaders.length > 0) {
              setHandleErr(true);
              setJsonError(`The following headers are missing => ${missingHeaders.join(', ')}`);
              setTimeout(() => {
                window.location.reload();
              }, 1500);
          } else {
             const jsonSheet = sheetData.map(row => ({
              ...row,
              senderNumber: row.senderNumber ? row.senderNumber : "",  // Validate senderName
              user_id: user_Id,
              paymentType: "IMPS",
              is_verify:
                selectedValue === "verify" && checked
                  ? 1
                  : checked && selectedValue === "transfer"
                  ? 1
                  : 0,
              fundTransfer:
                checked && selectedValue === "transfer"
                  ? 1
                  : !checked && selectedValue === "transfer"
                  ? 1
                  : 0,
            }));

  
              setJsonData(jsonSheet);
              console.log("json sheet : ", jsonSheet);
  
              if (sheetData) {
                setOpenTable(true);
              }
          }
  
          // ✅ Clear file input so same file can be selected again
          if (fileInputRef.current) {
              fileInputRef.current.value = '';
          }
      };
  
      reader.readAsBinaryString(file);
  };
  
    console.log(jsonData)


    const handleChange = (event) => {
      setAccountType(event.target.value);
    };

    const handleBankChange = (event) => {
      console.log("bank event : ",event.target.value)
      setBankType(event.target.value);
      setIfsc(event.target.value.ifsc_code);
    }

    console.log("sheet data : ",jsonData)

    const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;


    

   // ******************** Location Data **************************** 

    





    const handlelExcel = (e) => {       
      
      const data = [[ 'mobile_no', 'name', 'account_number', 'account_type', 'ifsc_code', "senderNumber", "bank_name" ]]

     const workbook = XLSX.utils.book_new();
     const worksheet = XLSX.utils.aoa_to_sheet(data);

     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

     const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

     saveAs(blob, `verify_benificary.xlsx`);
 };

  const handleTxnExcel = () => {
    const data = [[ 'mobile_no', 'name', 'account_number', 'account_type', 'ifsc_code', 'amount', "senderNumber", "bank_name"]]

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, `fund_transfer.xlsx`);
  }

    
    async function getData(newState){

      // console.log("name : ",name , "  account : ",account, "  ifsc : ",ifsc, "  amount : ",ammount, "  account type : ",accountType, "  remark : ","testing")
      
      //   const bodyData = { "user_id":userid, "mobile_no":mobileno, "name":name, "account_number":account, "account_type":accountType, "ifsc_code":ifsc, "amount":ammount, "remark":remark, "mode":"IMPS" }

      // let json = await ApiFile({"apiUrl":`${url}/api/dmt_order`, "wMethod":"POST", "authAccess":authAccess, "bodyData":bodyData});
      // console.log("json data 1 : ",jsonData);


      // if(json){
      //   if(json.Status === "Success"){
      //     // window.alert("order placed successfully");
      //     // window.alert(json.Message.response_msg);
      //     // setJsonSuccess(true);
      //     // setHandleSuccess(true);
      //     // setJsonSuccess(json.Message.response_msg)      Your File Has Been Processed Successfully. Please Check Txn History For Details.

      //     setImpsDialogue(true);
      //     setImpsMessage("Your File Has Been Processed Successfully. Please Check Txn History For Details.");
          
      //     setTimeout(() => {
      //       setName("");
      //       setIfsc("");
      //       setAccount("");
      //       setAccountType("");
      //       setRemark("");
      //     },1000)

      //   }
      //   if(json.Status === "Error"){
      //   // window.alert(json.Message )
      //     setHandleErr(true);
      //     setJsonError(json.Message);

      //     setImpsErrorDialogue(true);
      //     setImpsErrorMsg("Unable to process your data.")

      //   }
      //   if(json.message === "Unauthenticated."){
      //     setHandleErr(true);
      //     setJsonError(json.message);
      //     // setTimeout(() => {
      //     //   window.location.replace(process.env.REACT_APP_AXIOS_URL);
      //     //   window.history.replaceState(null,null,"/");
      //     // },1000)
      //   }
      // }

     // `${url}/api/dmt_order`, "POST" , authAccess, bodyData 


    //   setLoading(true);

    try{  

      setDmtProgress(true);
      
      const api  = process.env.REACT_APP_AXIOS_URL;
      const apiUrl = `${api}/api/dmt_utility_order`;
      const method = "POST";
  
      const json = await ApiFile({"apiUrl":apiUrl, "method":method, "authAccess":authAccess, "bodyData":{ "user_id":userid, "mobile_no":phoneNumber, "senderNumber":senderNumber ,"name":name, "account_number":account, "account_type":accountType, "amount":selectedValue==="transfer" && checked || selectedValue==="transfer" && !checked ? amount : ammount , "mode":"IMPS", "remark":"testing", "is_verify":selectedValue=="verify" && checked ? 1 : checked && selectedValue=='transfer' ? 1 : 0, "fundTransfer":checked && selectedValue=='transfer' ? 1  : !checked && selectedValue=='transfer' ? 1 : 0, "bank_name":bankType?.bank_name, "ifsc_code":ifsc , "paymentType":"IMPS" } });
      

      
  
          // const fetchData = await fetch(`${url}/api/dmt_order`, {
          //   method:"POST",
          //   headers:{
          //     "Content-Type":"application/json",
          //     "Accept":"application/json",
          //     "Authorization":`Bearer ${authAccess}` 
          //   },
          //   body:JSON.stringify({ "user_id":userid, "mobile_no":phoneNumber, "name":name, "account_number":account, "account_type":accountType, "ifsc_code":ifsc, "amount":ammount, "mode":"IMPS", "remark":"testing" })
          // });
          // console.log("order data : ",{ "user_id":userid, "mobile_no":phoneNumber, "name":name, "account_number":account, "account_type":accountType, "ifsc_code":ifsc, "amount":ammount, "remark":remark, "mode":"IMPS" })
          // const json = await fetchData.json();
          // const api = await fetchData
          console.log("Api data is : ",json);
          console.log("api respo : ",api);

          setDmtProgress(false)
  
          if(json){
            if(json.Status === "Success" ){
              // window.alert("order placed successfully");
              // window.alert(json.Message.response_msg);
              // setJsonSuccess(true);
              // setHandleSuccess(true);
              // setJsonSuccess(json.Message.response_msg)      Your File Has Been Processed Successfully. Please Check Txn History For Details.

              setImpsDialogue(true);
              setImpsMessage(json.Message);
              
              setTimeout(() => {
                setName("");
                setIfsc("");
                setAccount("");
                setAccountType("");
                setRemark("");
                setBankName();
                setAmount("");
                setPhoneNumber("");
                // window.location.reload();
              },1500)
  
            }
            if(json.Status === "Error"){
            // window.alert(json.Message )
              // setHandleErr(true);
              // setJsonError(json.Message);

              setImpsErrorDialogue(true);
              setImpsErrorMsg(json.Message);
              setImpsDialogue(false);


            }

            // if(api.status !== 200 ){
            //   setHandleErr(true);
            //   setJsonError(api.statusText);

            //   setTimeout(() => {
            //     window.location.replace(process.env.REACT_APP_AXIOS_URL);
            //   },1000)
            // }

            if(json.message === "Unauthenticated."){
              setHandleErr(true);
              setJsonError(json.message);
              setTimeout(() => {
                // window.location.replace(process.env.REACT_APP_AXIOS_URL);
                window.history.replaceState(null,null,"/");
              },1000)
            }
          }
    }catch(err){

      setHandleErr(true);
      setJsonError(err);

      console.log(err)

    }

  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if(ammount >= 500001){
    window.alert("Limit crossed");
    setAmmount("")
  }

  React.useEffect(() => {
      Aos.init({duration:2500})
  },[]);

  const handleBulkForm = () => {
    console.log("bulk form called");
  }


  const pendData = () => {
    setHandleErr(true);
    setJsonError("Please Enter All Required Fields.")
  }

  const getBankName = async() => {

    const url  = process.env.REACT_APP_AXIOS_URL;

    const fetchData = await fetch(`${url}/api/bank_list`);
    const json = await fetchData.json();
    console.log("bank json : ",json)

    if(json){
      if(json.Status === "Success"){
        setBankName(json.Data);

      }
    }



  }

  React.useEffect(() => {
    getBankName()
  },[])



  const userRecordTab = () => {
    fileInputRef.current.value=""
    setOpenTable(false);
    // setSelectedValue("");
  }

  const handleAmount = (value) => {

    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    // If number exceeds 100000, alert and clear
    if (Number(value) > 100000) {
      window.alert("Amount cannot be more than 1,00,000");
      setAmount("100000");
      return;
    }

    setAmount(value);

  }

  return (
    // <div  className="upi1" >
    //     <Box  >
    //       <AppBar color='transparent' sx={{ display:"flex", flexDirection:{xs:"column", sm:"row" } , alignItems:"center" , justifyContent:{xs:"center", sm:"space-between"} }} >
    //     <Box component="img"  sx={{ width:"8rem", padding:'10px' , marginLeft:{xs:"0rem" , bg:"2rem"} }} src={eezibLogo} alt="logo" onClick={ () => navigate("/")} />
    //     <Box component="img" src={upiLogo} alt="upi" sx={{ width:"12rem",float:"right",marginTop:{xs:"0.5rem" , md:"1rem"}}}  />
    //       </AppBar>
    //     </Box>
            

    //     <div className='back' >
    //         <div className='back2' >
    //         <div className='formControl' >

      //   <Paper elevation={24} className='form' sx={{
      //     display:"flex",
      //     alignItems:"center",
      //     justifyContent:"center",
      //     flexDirection:"column",
      //     margin:"3rem",
      //     backdropFilter:'blur(2px)',
      //     backgroundColor:'transparent',
      //     padding:{xs:"0.6rem 1.5rem " , md:"2rem 4rem"},
      //     borderRadius:"1rem",
      //     marginTop:{md:"9rem" , sm:"0rem",xs:"-2rem"}
      // }} >
        

        

        
          


    //           {
    //             name && account && ifsc && remark !== "" ? <Button onClick={() => getData({vertical: 'top',horizontal: 'right'})} color="secondary" id="hover"  variant='contained' sx={{ backgroundColor:"#8A28DB" , width:'18rem', marginTop:'1rem' }} >submit</Button> : <Button disabled >submit</Button>
    //           }


    //         <Snackbar open={open} autoHideDuration={2500} key={vertical + horizontal}  onClose={handleClose}  TransitionComponent={transition} anchorOrigin={{ vertical, horizontal }} >
    //         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' , backgroundColor:'#5cbd51' , fontWeight:600  , color:'white' }}>
    //           Data sent successfully !
    //         </Alert>
    //       </Snackbar>

          

    //             &nbsp;
    //           <span style={{display:'flex' , alignItems:'center' , justifyContent:"space-evenly"}} >
    //             <HomeIcon sx={{color:"purple"}} />
    //             <Link id="link" to="/" style={{color:"purple"}} >Back to home</Link>
    //           </span>

    //     </Paper>
    //         </div>
    //     </div>

    //     </div>



      
    // <Dialog
    //     open={openTable}
    //     onClose={handleTableClose}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //     sx={{
    //       "& .MuiDialog-container": {
    //         "& .MuiPaper-root": {
    //           width: "100%",
    //           maxWidth: "100%",
    //         },
    //       },
    //     }}
    //   >
    //     <DialogTitle id="alert-dialog-title">
    //       <Box sx={{ display:'flex', alignItems:'center', justifyContent:"space-between" }} >
    //         <Box component="img" src={eezibLogo} sx={{ width:"5rem" }} />
    //         <Typography sx={{ fontFamily:"montserrat", fontWeight:600, fontSize:"1.3rem", textTransform:"capitalize", textAlign:'center' }} >user record</Typography>
    //         <Button onClick={() => handleClick()} variant='contained' sx={{ fontFamily:"montserrat" }} >submit</Button>
    //       </Box>
    //     </DialogTitle>
    //     <DialogContent>
    //       <TableContainer component={Paper}>
    //   <Table sx={{ minWidth:"100%" }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //       <StyledTableCell>Sr no.</StyledTableCell>
    //         <StyledTableCell>Name</StyledTableCell>
    //         <StyledTableCell>User Id</StyledTableCell>
    //         <StyledTableCell align="center">Account Number</StyledTableCell>
    //         <StyledTableCell align="center">Account Type</StyledTableCell>
    //         <StyledTableCell align="center">Amount</StyledTableCell>
    //         <StyledTableCell align="center"> IFSC </StyledTableCell>
    //         <StyledTableCell align="center"> Mode </StyledTableCell>
    //         <StyledTableCell align="center"> Remark </StyledTableCell>
    //         <StyledTableCell align="center"> Mobile No. </StyledTableCell>

    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {jsonData?.map((row, index) => (
    //         <StyledTableRow key={row.name}>
    //         <StyledTableCell align="center">{index + 1}</StyledTableCell>
    //           <StyledTableCell component="th" scope="row">
    //             {row.name}
    //           </StyledTableCell>
    //           <StyledTableCell align="center">{row.user_id}</StyledTableCell>
    //           <StyledTableCell align="center">{row.account_number}</StyledTableCell>
    //           <StyledTableCell align="center">{row.account_type}</StyledTableCell>
    //           <StyledTableCell align="center">{row.amount}</StyledTableCell>
    //           <StyledTableCell align="center">{row.ifsc_code}</StyledTableCell>
    //           <StyledTableCell align="center">{row.mode}</StyledTableCell>
    //           <StyledTableCell align="center">{row.remark}</StyledTableCell>
    //           <StyledTableCell align="center">{row.mobile_no}</StyledTableCell>

    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    //     </DialogContent>
    //   </Dialog>

    //   <Snackbar
    //   anchorOrigin={{ vertical:"top", horizontal:"right" }}
    //   open={handleErr}
    //   onClose={handleErrClose}
    //   autoHideDuration={2500}
    //   >
    //     <Alert severity='error' >{jsonError}  </Alert>
    //   </Snackbar>


      
    //   <Snackbar
    //   anchorOrigin={{ vertical:"top", horizontal:"right" }}
    //   open={handleSuccess}
    //   onClose={HandleSuccessClose}
    //   autoHideDuration={2500}
    //   >
    //     <Alert severity='success' >{jsonSuccess}</Alert>
    //   </Snackbar>


        
    // </div>

    <>


    


    {/* <div className=" h-screen z-10">

          <AppBar position='fixed' sx={{ top:0 }} >
            <Toolbar sx={{ display:"flex", alignItems:'center' }} >
            <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ cursor:"pointer" }} />
              <Box component="img" src={ eezibLogo } sx={{ width:"8rem" }} />
            </Toolbar>
          </AppBar>
      <div className=" relative ">
        <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-teal-600 transform scale-[.180] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-black border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className=" h-[100vh] w-[100%]  flex items-center justify-center mb-4"> */}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <Box 
        className="kalakaar"
         sx={{ minHeight:"100vh" }} >

          <AppBar position='sticky' >
            <Toolbar sx={{ display:'flex', alignItems:'center' }} >

            <Tooltip sx={{ fontFamily:'montserrat', fontWeight:500, margin:0 }} title="Back">
            <ArrowBackIosIcon sx={{ cursor:'pointer', color:'white', fontSize:"1.8rem" }} onClick={() => navigate(-1) } />
          </Tooltip>

              <Box component="img" src={eezibLogo} sx={{ width:"10rem" }} />
              {/* <Typography>Welcome to eezib</Typography> */}
              
            </Toolbar>
          </AppBar>

          <Box  sx={{ display:'flex', alignItems:'center', justifyContent:'center', mt:4 }} >

          

          <CardBody  className="bg-gray-300 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark: bg-blue-300  border-black/[0.1] w-full sm:w-2/4 md:w-3/4 lg:w-4/5 xl:w-4/6  h-auto rounded-xl p-6 border"
          sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexDirection:"column",
          border:{lg:"1px solid white", sm:null, xs:null},
          zIndex:2,
          backgroundColor:"transparent",
          width:{lg:"30rem", xs:"20rem"}
        
          // margin:"",
          // backgroundColor:'transparent',
          // padding:{xs:"0.6rem 1.5rem " , md:"2rem 4rem"},
          // borderRadius:"1rem",
          // marginTop:{md:"0rem" , sm:"0rem",xs:"-2rem"}
      }} >

          <Grid className='form' style={{ display:'flex' , alignItems:"center" , justifyContent:'center' , flexDirection:"column" }} >  
          <Typography className=' text-blue-500' sx={{  fontFamily:"montserrat" , fontWeight:"700",fontSize:{sm:"1.5rem" , md:"2rem", xs:"1.5rem"} }} >Eezib  <span className=' text-white' > Payment Transfer </span> </Typography> &nbsp;

                  <FormControl sx={{ width:"20rem" }} fullWidth >
              <InputLabel id="demo-simple-select-filled-label" InputLabelProps={{ style:{ color:"" } }} sx={{fontFamily:"montserrat", color:'#1d1db8', fontWeight:500 }} >Select Mode</InputLabel>

                <Select
                  value={selectedValue}
                  label="Select Mode"
                  onChange={handleRadioChange}
                  placeholder=' account type'
                  InputLabelProps={{ style:{ } }}
                  sx={{ fontFamily:"montserrat" , fontWeight:"500", width:{xs:"20rem", md:"20rem", lg:"20rem" } }}
                >

      <MenuItem  value="verify"  sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }} >
          Verify Beneficiary
      </MenuItem>

<MenuItem value="transfer" sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }} >
          Fund Transfer
</MenuItem>

                </Select>
          </FormControl>

          <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"}, mt:2 }} >

          <TextField autoComplete='off' label="Enter Name" InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }} inputProps={{ style:{ fontFamily:"montserrat", fontWeight:500 } }} variant='outlined' onChange={((e) => setName(e.target.value))} value={name} id="hover"  sx={{ width:{xs:"20rem", md:"20rem" }, color:"white" ,fontSize:'1rem', fontFamily:"montserrat", margin:"0.5rem" , fontWeight:"500" }}  />

          <TextField autoComplete='off' label="Enter Account Number" type='number' InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }} onChange={((e) => setAccount(e.target.value))} value={account} id="hover"  inputProps={{ style:{ fontFamily:"montserrat", fontWeight:500 } }} sx={{ width:{xs:"20rem", md:"20rem" }, color:"white", fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat",  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "input[type=number]": {
          MozAppearance: "textfield",
        }, }}  />
          </Box >

          <Box sx={{ display:"flex" , alignItems:"center", justifyContent:'center' , flexDirection:{md:"row",sm:'column',xs:"column", lg:"row"} }}  >


          <FormControl sx={{ width:"20rem" }} fullWidth >
              <InputLabel id="demo-simple-select-filled-label" InputLabelProps={{ style:{ color:"" } }} sx={{fontFamily:"montserrat", color:'#1d1db8', fontWeight:500 }} >Select Bank Type</InputLabel>

                <Select
                  value={bankType}
                  label="Select Bank Type"
                  onChange={handleBankChange}
                  placeholder=' account type'
                  InputLabelProps={{ style:{ } }}
                  sx={{ fontFamily:"montserrat" , fontWeight:"500", width:{xs:"20rem", md:"20rem", lg:"20rem" } }}
                >
                  {
                    Array.isArray(bankName) && bankName.map((row) => (
                      <MenuItem  sx={{ fontFamily:"montserrat", fontWeight:500 }} value={row} >{row.bank_name}</MenuItem>
                    ))
                  }
                 
                </Select>
          </FormControl>


          <TextField fullWidth focused={bankType} autoComplete='off' label="IFSC Code" inputProps={{ style:{  fontFamily:"montserrat", fontWeight:500, textTransform:"uppercase" } }}  InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }} onChange={((e) => setIfsc(e.target.value))} value={ifsc}  id="hover"  sx={{ width:{xs:"20rem", md:"20rem", lg:'20rem' }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

          </Box>

          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:{md:"row",sm:'column',xs:"column", lg:"row"} }} >
         
          <FormControl sx={{ width:"20rem" }} fullWidth >
              <InputLabel id="demo-simple-select-filled-label" InputLabelProps={{ style:{ color:"" } }} sx={{fontFamily:"montserrat", color:'#1d1db8', fontWeight:500 }} >Select Account Type</InputLabel>

                <Select
                  value={accountType}
                  label="Select Account Type"
                  onChange={handleChange}
                  placeholder=' account type'
                  InputLabelProps={{ style:{ } }}
                  sx={{ fontFamily:"montserrat" , fontWeight:"500", width:{xs:"20rem", md:"20rem", lg:"20rem" } }}
                >
                  <MenuItem  sx={{ fontFamily:"montserrat", fontWeight:500 }} value="saving" >Saving</MenuItem>
                  <MenuItem sx={{ fontFamily:"montserrat", fontWeight:500 }} value="current" >Current</MenuItem>
                  <MenuItem sx={{ fontFamily:"montserrat", fontWeight:500 }} value="over draft">Over Draft</MenuItem>

                </Select>
          </FormControl>



          <TextField autoComplete='off' label={ selectedValue==="transfer" && checked || selectedValue==="transfer" && !checked ? "Enter Amount" :  "Amount" } InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }}  type="number" value={ selectedValue==="transfer" && checked || selectedValue==="transfer" && !checked ? amount : ammount} onChange={(e) => selectedValue==="transfer" && checked || selectedValue==="transfer" && !checked ? handleAmount(e.target.value) : ammount   } id="hover" inputProps={{  style:{  fontFamily:"montserrat", fontWeight:500 } }} sx={{ width:{xs:"20rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat",  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  }, }}  />


          

          </Box>

        <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }}  >

        <TextField error={ phoneNumber.length > 10  } helperText={ phoneNumber.length > 10 ? "please enter valid mobile number" : null } autoComplete='off' label="Enter Mobile Number" type='number' InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }} onChange={((e) => setPhoneNumber(e.target.value))} value={phoneNumber} id="hover"  inputProps={{ style:{ fontFamily:"montserrat", fontWeight:500, letterSpacing:"3px" } }} sx={{ width:{xs:"20rem", md:"20rem" }, letterSpacing:'1rem' , color:"white", fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat",  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "input[type=number]": {
          MozAppearance: "textfield",
        }, }}  />

<TextField error={ senderNumber.length > 10  } helperText={ senderNumber.length > 10 ? "please enter valid mobile number" : null } autoComplete='off' label="Enter Sender's Number" type='number' InputLabelProps={{ style:{ fontFamily:'montserrat', fontWeight:500, color:"#1d1db8" } }} onChange={((e) => setSenderNumber(e.target.value))} value={senderNumber} id="hover"  inputProps={{ style:{ fontFamily:"montserrat", fontWeight:500, letterSpacing:"3px" } }} sx={{ width:{xs:"20rem", md:"20rem" }, letterSpacing:'1rem' , color:"white", fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat",  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "input[type=number]": {
          MozAppearance: "textfield",
        }, }}  />

        </Box>




        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"flex-start" }} >
          <Checkbox
          checked={checked}
          onChange={handleCheckChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography sx={{ fontFamily:'montserrat', fontSize:'0.8rem', fontWeight:500 }} >Forcefully verify</Typography>
        </Box>

        <Box>
  {/* <RadioGroup
    row
    name="form-options"
    defaultValue="female" // Optional: set default selected option
  >
    <FormControlLabel
      value="verify"
      onChange={handleRadioChange}
      control={<Radio />}
      label={
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }}>
          Verify Beneficiary
        </Typography>
      }
    />
    <FormControlLabel
      value="transfer"
      onChange={handleRadioChange}
      control={<Radio />}
      label={
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }}>
          Fund Transfer
        </Typography>
      }
    />
  </RadioGroup> */}
  
</Box>

        <Box sx={{ display:'flex' , alignItems:'center' , flexDirection:{md:'row',sm:'column' , xs:"column"  }, marginTop:1, gap:3 }} >
        <input ref={fileInputRef} arial-hidden={true} type="file" accept=".xlsx, .xls" onChange={ (e) => { handleFileChange(e); e.target.value = ""}} style={{ width:"15rem" }} />
        <Button onClick={(e) => handleMenuClick(e)} variant='outlined' startIcon={ <DownloadingIcon/> } >sample</Button>
        </Box >
          
          {
            selectedValue==="transfer" && checked || selectedValue==="transfer" && !checked && !amount ? !amount ?
            <Typography sx={{ fontFamily:"montserrat", fontWeight:400, fontSize:'0.8rem', color:"white", backgroundColor:"#056ac3", p:0.7, mt:1, borderRadius:3 }} > Note : Please Enter The Amount To Be Transfer. </Typography> : null : null
          }
            <Button fullWidth disabled={ dmtProgress || !name || !account || !accountType || !ammount || !ifsc || !bankName || !phoneNumber || phoneNumber.length !== 10 || senderNumber?.length !== 10 || !selectedValue  } onClick={() => getData({vertical: 'top',horizontal: 'right'})}  id="hover"  variant='contained' sx={{  marginTop:'1rem', fontFamily:'montserrat', fontWeight:500 }} > {dmtProgress ? "Loading..." : "Submit"}</Button> 
            {/* <Button fullWidth disabled={ dmtProgress || !name || !account || !accountType || !ammount || !ifsc || !bankName || !phoneNumber || phoneNumber.length !== 10 || senderNumber?.length !== 10 || !selectedValue  } onClick={() => console.log({ "user_id":userid, "mobile_no":phoneNumber, "senderNumber":senderNumber ,"name":name, "account_number":account, "account_type":accountType, "ifsc_code":ifsc, "amount":ammount, "mode":"IMPS", "remark":"testing", "is_verify":selectedValue=="verify" && checked ? 1 : checked && selectedValue=='transfer' ? 1 : 0, "fundTransfer":checked && selectedValue=='transfer' ? 1  : !checked && selectedValue=='transfer' ? 1 : 0 })}  id="hover"  variant='contained' sx={{  marginTop:'1rem', fontFamily:'montserrat', fontWeight:500 }} > {dmtProgress ? "Loading..." : "Submit"}</Button>  */}
            
          </Grid>

          </CardBody>

          </Box>
              
          {/* </div>
          <Meteors number={9} />
        </div>
      </div> */}

      
      
    <Dialog
        open={openTable}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "100%",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:"space-between" }} >
            <Box component="img" src={eezibLogo} sx={{ width:"5rem", zIndex:3 }} />
            <Typography sx={{ fontFamily:"montserrat", fontWeight:600, fontSize:{lg:"1.3rem", xs:"0.8rem", sm:"1rem"}, textTransform:"capitalize" }} >user record</Typography>
            <DeleteForeverIcon onClick={() => userRecordTab()} sx={{ fontSize:"1.6rem", color:"#de382c", cursor:"pointer" }} />
            {/* <Button disabled={activeBack} onClick={() => handleClick()} variant='contained' sx={{ fontFamily:"montserrat", fontSize:{lg:"0.9rem", xs:"0.7rem"} }} >{activeBack ? "Loading..." : "submit" }</Button> */}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ display:'flex', alignItems:'center', justifyContent:"center", flexDirection:'column' }} >

          <TableContainer component={Paper}>
      <Table sx={{ minWidth:"100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Sr no.</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Account Number</StyledTableCell>
            <StyledTableCell align="center">Account Type</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center"> IFSC </StyledTableCell>
            <StyledTableCell align="center"> Mode </StyledTableCell>
            <StyledTableCell align="center"> Remark </StyledTableCell>
            <StyledTableCell align="center"> Mobile No. </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData?.map((row, index) => (
            <StyledTableRow key={row.name}>
            <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.account_number}</StyledTableCell>
              <StyledTableCell align="center">{row.account_type}</StyledTableCell>
              <StyledTableCell align="center">{  row.amount ? row.amount : "1"}</StyledTableCell>
              <StyledTableCell align="center">{row.ifsc_code}</StyledTableCell>
              <StyledTableCell align="center">IMPS</StyledTableCell>
              <StyledTableCell align="center">{selectedValue}</StyledTableCell>
              <StyledTableCell align="center">{row.mobile_no}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <Box sx={{ display:"flex", alignItems:"center", justifyContent:"flex-start", mt:1 }} >
          <Checkbox
          checked={checked}
          onChange={handleCheckChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography sx={{ fontFamily:'montserrat', fontSize:'0.8rem', fontWeight:500 }} >Forcefully verify</Typography>
        </Box>

        <Box>
  <RadioGroup
    row
    name="form-options"
    defaultValue="female" // Optional: set default selected option
  >
    <FormControlLabel
      value="verify"
      onChange={handleRadioChange}
      control={<Radio />}
      label={
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }}>
          Verify Beneficiary
        </Typography>
      }
    />
    <FormControlLabel
      value="transfer"
      onChange={handleRadioChange}
      control={<Radio />}
      label={
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }}>
          Fund Transfer
        </Typography>
      }
    />
  </RadioGroup>
</Box> */}


        </DialogContent>
        <Button disabled={activeBack || !selectedValue } onClick={() => handleClick()} variant='contained' sx={{ fontFamily:"montserrat", fontSize:{lg:"0.9rem", xs:"0.7rem"}, marginLeft:"auto", m:1 }} >{activeBack ? "Loading..." : "submit" }</Button>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex:8 }}
        open={activeBack}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={handleErr}
      onClose={handleErrClose}
      autoHideDuration={2500}
      >
        <Alert severity='error' >{jsonError}  </Alert>
      </Snackbar>


      
      <Snackbar
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={handleSuccess}
      onClose={HandleSuccessClose}
      autoHideDuration={2500}
      >
        <Alert severity='success' >{jsonSuccess}</Alert>
      </Snackbar>



      <Dialog
        open={impsDialogue}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleImpsClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box component="img" src={eezib} sx={{ width:{lg:"3rem", sm:"3rem", sm:'3rem', xs:"2rem"} }} />
          <CloseIcon onClick={() => window.location.reload() } sx={{ cursor:'pointer', right:10 , position:"absolute" }} />
        </DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }} >
            <VerifiedIcon sx={{ fontSize:"5rem", textAlign:'center' }} color='success' />
            <Divider variant='middle' />
            <Typography sx={{ fontFamily:"montserrat", fontWeight:500, fontSize:"0.8rem", textTransform:'capitalize' }} >{impsMessage}</Typography>
        </DialogContent> 
          <Divider variant='middle' />
        <DialogActions  >
          <Button variant='outlined' onClick={() => window.location.reload() } sx={{ fontFamily:'montserrat', fontWeight:500 }} >Close</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={impsErrorDialogue}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleImpsErrorClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }} >
          <Box component="img" src={eezib} sx={{ width:"3rem" }} />
          <CloseIcon onClick={() => setImpsErrorDialogue(false)} sx={{ cursor:'pointer', right:10 , position:"absolute" }} />
        </DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }} >
            <ErrorIcon sx={{ fontSize:"5rem", textAlign:'center' }} color='error' />
            <Divider variant='middle' />
            <Typography sx={{ fontFamily:"montserrat", fontWeight:500, fontSize:"0.9rem" }} >{ impsErrorMsg }</Typography>
        </DialogContent> 
        <Divider/>
        <DialogActions>
          <Button variant='outlined' onClick={() => setImpsErrorDialogue(false) } sx={{ fontFamily:'montserrat', fontWeight:500 }} >close</Button>
        </DialogActions>
      </Dialog>


      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem sx={{ fontFamily:"montserrat", fontWeight:500 }} onClick={handlelExcel}> <DownloadingIcon sx={{ color:'gray' }} /> &nbsp; Verify Beneficary</MenuItem>

        <MenuItem sx={{ fontFamily:"montserrat", fontWeight:500 }} onClick={handleTxnExcel}> <DownloadingIcon sx={{ color:'gray' }} /> &nbsp;Fund Transfer</MenuItem>

      </Menu>

        <Footer />

    {/* </div> */}
    </Box>


    </>
  )
}

export default Imps