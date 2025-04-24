import React from 'react'
import { useLocation } from 'react-router-dom'

function Enquiry() {

    const location = useLocation();
    const data = location.state;
    const values = Object.values(data);
    const object = values[1];


    const token = values[0];
    console.log(object)

    async function getData(){
      const fetchData = await fetch("http://192.168.0.153/checkpend/",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({object})
      })

      const data = await fetchData.json();
      console.log(data);
    }

    React.useEffect(() => {
      getData()
    },[])

  return (
    <div>Enquiry</div>
  )
}

export default Enquiry