import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link } from 'react-router-dom';
import {Terminar} from '../../../../components/Logout/Logout'
import k from '../../../../assets/Geo Farma/Geo Farma.png'
import imagem from '../../../../assets/Screenshot_20240110-233026.png'
import { Nome } from '../../../../components/NomeUser/Nome';
import { Formattime } from '../../../pages/Admin/Admintrador/AdminMensagens/AdminMensagens';
import { api } from '../../../../api';


export default function HeaderUser({ onKeyDown, value, placeholder, onChange, onSubmit, dados, setInput, disabled }) {
     
  const Idusuario  = localStorage.getItem("usuario");
 const [Foto, SetFoto] = useState('');
 const [noti, setNoti] = useState([])

  const [numero,SetNumero]=useState(1)
  const [side,SetSide]=useState('') 
  const body=document.body
   body.className=`${side}`
       const open=()=>{
             if(numero%2 === 1){
               SetSide('toggle-sidebar')
             }else{
                SetSide('')
             } 
             SetNumero(numero+1)
       }

const ObterUserFoto = async ()=>{
  try {
      const res = await api.get(`/api/usuarioId/${Idusuario}`);
      SetFoto(res.data.data[0].foto)
  } catch (error) {
      console.error(error)
  }
}
useEffect(()=>{
ObterUserFoto();
Noti()
},[Idusuario])


const handlechange = (nome)=>{
 setInput(nome)
}
const Noti = async () => {
  const tipo = "usuario"
    try {
      const  res = await api.get(`/notificacao/${tipo}`)
          setNoti(res.data.data)
    } catch (error) {
      throw new Error(error)
    }
}

  return (
    <>

<header  id="header" className="header fixed-top d-flex align-items-center" >

<div className="d-flex align-items-center justify-content-between">
<Link to={"/"} className="logo d-flex align-items-center">
 <img src={k} alt="eee" />
 <span className="d-none d-lg-block"style={{color:'white'}}>GeoFarma</span>
</Link>
<i className="bi bi-list toggle-sidebar-btn"  style={{color:'white'}} onClick={open}></i>
</div>

<div className="search-bar">
<form  className="search-form d-flex align-items-center  " onSubmit={onSubmit}>
 <input type="text" onKeyDown={onKeyDown} value={value} placeholder={placeholder} onChange={onChange} title="Enter search keyword" style={{width:'20rem'}}  className="form-control" disabled={disabled}  />
      <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            
</form>
          <div className="container mb-2" style={{ position: 'absolute', backgroundColor: 'white', width: '22.5%', borderRadius:'0rem 0rem 0.2rem 0.2rem '}}>
            {dados ?
              dados.map((medicamento, index) => (
                <button key={index} onClick={() => handlechange(medicamento.nome)} className="list-group-item">{medicamento.nome}</button>
              ))
               :
              <>
              </>}
          </div>    
</div>
        

<nav className="header-nav ms-auto" style={{marginRight:'1.6rem'}}>

<ul className="d-flex align-items-center">

    <li className="nav-item dropdown">

              <Link className="nav-link nav-icon" to={"#"} data-bs-toggle="dropdown">
                <i className="bi bi-bell" style={{ color: 'white' }}></i>
                <span className="badge bg-primary badge-number">{noti.length}</span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  Você tem {noti.length} notificações
                 {/*  <Link to="/adminmensagem"><span className="badge rounded-pill bg-primary p-2 ms-2">Ver Tudo</span></Link> */}
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {
                 noti.map((m) => (
                    <>
                      <div key={m.id}>
                      <li className="notification-item" >
                        <i className="bi bi-exclamation-circle text-warning"></i>
                        <div >
                          <p>{m.mensagem}</p>
                          <div>{Formattime(m.data_envio)}</div>
                        </div>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                        </div>
                    </>
                  ))
                }

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  {/* <Link to={"#"}>Mostrar Todas as Notificações</Link> */}
                  <div>
                    Todas as notificações serão apagadas pelo administrador.
                  </div>
                </li>

              </ul>

            </li> 

<li className="nav-item dropdown pe-3">
   <Link className="nav-link nav-profile d-flex align-items-center pe-0" to={"#"} data-bs-toggle="dropdown">
{ Foto ?
     <img src={`http://localhost:8800/${Foto}`} style={{borderRadius:'100%',height:'3rem',width:'3rem'}} alt='profile'/>
    :
    <img src={imagem}  style={{borderRadius:'100%',height:'3rem',width:'3rem'}} alt='profile' />
    }

     {/* <i className='bi bi-person-circle fs-3 '></i> */}
     <span className="d-none d-md-block dropdown-toggle ps-2" style={{color:'white'}}><Nome /></span>
   </Link>
   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
     <li className="dropdown-header">
       <h6><Nome /></h6>
       <span>user 00{Idusuario}</span>
     </li>
     <li>
       <hr className="dropdown-divider"/>
     </li>

     <li>
     <Link className="dropdown-item d-flex align-items-center" to={'/users-profile'}>
         <i className="bi bi-person"></i>
         <span>Meu Perfil</span>
       </Link>
     </li>
     <li>
       <hr className="dropdown-divider" />
     </li>
       <li>
       <hr className="dropdown-divider" />
     </li>
     <li>
       <hr className="dropdown-divider"/>
     </li>

     <li>
       <Link className="dropdown-item d-flex align-items-center" onClick={()=> Terminar()} to={'/'}>
         <i className="bi bi-box-arrow-right"></i>
         <span>Sair</span>
       </Link>
     </li>

   </ul>
 </li>

</ul>
</nav>

</header> 
    </>
  )
}
