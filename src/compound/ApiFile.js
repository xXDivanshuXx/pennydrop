

export const ApiFile = async({"apiUrl":apiUrl, "method":method, "authAccess":authAccess, "bodyData":bodyData}) => {

    console.log({apiUrl, method, authAccess, bodyData});  
    


    const fetchData = await fetch(apiUrl, {
        method:method,
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":`Bearer ${authAccess}`
        },
        body:JSON.stringify(bodyData)
    })
    

//  .then(json => { console.log(json)} )

    console.log("fetch : ",fetchData);




    if(fetchData.status === 200){

    const json = await fetchData.json();

    console.log("login json : ",json.Status, fetchData.status==500);

       return  json ;
     }
       else if(fetchData.status === 500 || fetchData.status === 501 || fetchData.status === 502 || fetchData.status === 503 || fetchData.status === 400 || fetchData.status === 402 || fetchData.status === 404 ){
        console.log("entered 500");
        window.alert("Technical Issue, We are fixing it")
            setTimeout(() => {
                window.location.reload();
            },500) 
       }

       else if(fetchData.status === 401 ){
        window.alert("User Unauthorized.");
       }

    else{
        window.alert("Technical Issue, Please Login Again ")
        window.location.replace(`${process.env.REACT_APP_AXIOS_URL}/logout`);
        }
   
  
}
