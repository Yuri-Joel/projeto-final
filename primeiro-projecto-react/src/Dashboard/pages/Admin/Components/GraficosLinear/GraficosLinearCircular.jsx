import { LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Line } from "recharts";
import axios from "axios"; 
import { useState, useEffect } from "react";
 

  export const GraficosLinear = ()=>{

    const [data, setdata] = useState([])
    const [dataload, setdataload] = useState(false)
    const ListarG = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/grafico/linear`)
          setdata(res.data.data)
          setdataload(true)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      ListarG();
    },[])

   
   
   
    return (
 (  dataload &&  <>   
  <div className="container">
    <div className="row">
    <LineChart width={730} height={250} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="nome" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="total" stroke="#8884d8" />
</LineChart>
 <p>Grafico de numeros de medicamento</p>
    </div>
    </div>

    </>  
    )

    )
  }