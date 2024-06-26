import { useState,useEffect } from "react";
import { api } from "../../api";


export const Nome = ()=>{
    const Idusuario =  localStorage.getItem('usuario');
const [user, SetUser]= useState("");
  const [dataload, setload] = useState(false)
    
const ObterUserId = async ()=>{
    try {
        const res = await api.get(`/api/usuarioId/${Idusuario}`);
        SetUser(res.data.data[0].nome)
        setload(true)
    } catch (error) {
        console.error(error)
    }
  }
  useEffect(()=>{
  ObterUserId();
  },[])

  const nome = user.split(" ");

  const NomeAbreviado = nome[0] + " " + nome[nome.length - 1]
  
   
  return(
    <>
      { (dataload &&
      <>{NomeAbreviado}</>
      ) 
      }
    </>
  )
}