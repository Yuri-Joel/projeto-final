import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link , useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import FooterDashboard from '../../Dashboard/components/footer/footer';
import { Nome } from '../../components/NomeUser/Nome';
import {toast} from 'react-toastify';
import HeaderUser from '../../Dashboard/components/heder/user/headerUser';
import UserSide from '../../Dashboard/components/aside/user/userSide';
import imagem from '../../assets/Screenshot_20240110-233026.png'
import { LogActividades } from '../../Log_Actividades/Log_actividades';
import { MyModal } from '../component/Modal';
import { api } from '../../api';

export default function User() {
   
  const IsAutenticado = !!localStorage.getItem("usuario");
const Idusuario = localStorage.getItem("usuario");
const [userPhoto, setUserPhoto] = useState('');
const [newImage, setNewImage] = useState(null);



const [user, SetUser]= useState([]);

const ObterUserId = async ()=>{
    try {
        const res = await api.get(`/api/usuarioId/${Idusuario}`);
        SetUser(res.data.data)
        setUserPhoto(res.data.data[0].foto);
    
    } catch (error) {
        console.error(error)
    }
}
useEffect(()=>{
    ObterUserId();
},[])

const [dataload, setload]=useState(false)
const [nome, setnome] = useState('');
const [telefone, setTelefone] = useState('')
const [email, setemail] = useState('');
const [Alterar, setsenha] = useState({
  senhaActual: '',
  novaSenha: ''
})
const [ConfimarSenha , setConfirmar]= useState('')

const HandleSubmit = async(e)=>{
  e.preventDefault();

  if(( Alterar.novaSenha  ===  ConfimarSenha) && Alterar.senhaActual && ConfimarSenha && Alterar.novaSenha){
      await  api.put(`/api/actualizarsenha/${Idusuario}`, Alterar)
         .then(res => {
             console.log(res.data);
             if(res.data.data === "Actualizada"){
                
                     toast.success("Senha Actualizada")
                    
             } else{
                 toast.warn("erro ao logar neste servidor");
             }
         } )
         .catch(err => toast.warn(err))
     } else{
        toast.error("ERRO!")
     }
}


const ObterEditarUser = async ()=>{
   
    try {
        const res = await api.get(`/api/usuarioId/${Idusuario}`)
        
        console.log(res.data.data)
       setnome(res.data.data[0].nome);
        setTelefone(res.data.data[0].telefone);
         setemail(res.data.data[0].email);
        setload(true)
    
    } catch (error) {
        console.error(error)
    }
}


useEffect(()=>{
    ObterEditarUser();
},[Idusuario]);

 

const Navigate = useNavigate();

const ActualizarUser = async (e)=>{
    e.preventDefault();
    const User = {
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email.trim()
    }
  handleUploadNewImage();
  
    try {    
        const res = await api.put(`/api/actualizar/${Idusuario}`,User)
        console.log(res.data.data)
        toast.success("Perfil Actualizado");
        ObterUserId();
         Navigate("/users-profile")
     
      
       
    } catch (error) {
        console.error(error);
    }
}
const handleUploadNewImage = async () => {
  if (!newImage) {
    console.log('Nenhuma imagem selecionada.');
    return;
  }
  const tipo = "usuario";
  const formData = new FormData();
  formData.append('image', newImage);
  formData.append('id', Idusuario);
  formData.append("tipo",tipo)

  try {
    const response = await api.post(`/upload`,formData);
    console.log(response.data)
    setUserPhoto(response.data.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


const DeletarFoto = (id)=>{
  try {
    
    const res = api.delete(`/api/delfoto/${id}`)
      if(res.data.data === "Sucess"){
        toast.success("Foto Eliminada")
        Navigate("/users-profile")
      }
  } catch (error) {
    console.log(error)
  }}


  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true)
  }

  useEffect(() => {
    handleShow();
  }, [IsAutenticado])

  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
    { IsAutenticado ?
    <>
    <LogActividades tipo={"usuario"} />
 <HeaderUser disabled={true}/>

    <UserSide   />


<main id="main" className="main">

    <div className="pagetitle">
      <h1>Perfil</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/map'}>Home</Link></li>
          <li className="breadcrumb-item">Usuario</li>
          <li className="breadcrumb-item active">Perfil</li>
        </ol>
      </nav>
    </div>

    <section className="section profile">
      <div className="row">
        <div className="col-xl-4">

          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
              { userPhoto ?
                        <img src={`http://localhost:8800/${userPhoto}`} style={{ borderRadius: '100%', width: '12rem', height: '8rem' }} alt="Profile" className="rounded-circle"/>
               :
              <img src={imagem} alt='profile' className='rounded-circle' />
              }
              <h2><Nome /></h2>
              <h3>User 00{Idusuario}</h3>
             
            </div>
          </div>

        </div>

        <div className="col-xl-8">

          <div className="card">
            <div className="card-body pt-3">
          
              <ul className="nav nav-tabs nav-tabs-bordered">

                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Ver meu Perfil</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Editar</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Alterar senha</button>
                </li>

              </ul>
              <div className="tab-content pt-2">
            {
          user.map((usuario)=>(
          <div key={usuario.id}>
                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                  <h5 className="card-title">Meu Perfil</h5>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Nome</div>
                    <div className="col-lg-9 col-md-8">{usuario.nome}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Constacto</div>
                    <div className="col-lg-9 col-md-8">{usuario.telefone}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Email</div>
                    <div className="col-lg-9 col-md-8">{usuario.email}</div>
                  </div>

                </div>
                </div>
                ))}

                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
 
                {
                 ( dataload &&
                  <form  onSubmit={ActualizarUser}>
                    <div className="row mb-3">
                      <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Imagem</label>
                      <div className="col-md-8 col-lg-9">
                    
      

      {/* Botão para mudar a foto */}
     
      
      {/* Outras informações do perfil do usuário */}
              { userPhoto ?
                                      <img src={`http://localhost:8800/${userPhoto}`} style={{ borderRadius: '100%', width: '12rem', height: '8rem' }} alt="Profile" className="rounded-circle"/>
               :
              <img src={imagem} alt='profile' className='rounded-circle' />
              }
                        <div className="pt-2">
                        <input type="file" className="btn btn-primary btn-sm" title="Upload new profile image" onChange={(e)=> setNewImage(e.target.files[0])} />

                          <br></br><br></br>
                          <button className="btn btn-primary btn-sm"   onClick={()=> handleUploadNewImage} >
                                          <i className="bi bi-upload">  </i>
                          </button>
                          <Link   className="btn btn-danger btn-sm" title="Remove my profile image">
                                        <i onClick={() => DeletarFoto(Idusuario)} className="bi bi-trash"> </i>
                            </Link>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Nome</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="fullName" type="text" className="form-control" id="fullName"  value={nome} onChange={(e)=> setnome(e.target.value)} />
                      </div>
                    </div>


                    <div className="row mb-3">
                      <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Contacto</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="phone" type="text" className="form-control" id="Phone"  value={telefone} onChange={(e)=> setTelefone(e.target.value)}/>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="email" type="email" className="form-control" id="Email"  value={email} onChange={(e)=> setemail(e.target.value)}/>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary" style={{background:'#00968c',width:'14rem'}}>Salvar</button>
                    </div>
                  </form>
                 )
}
                </div>

                <div className="tab-pane fade pt-3" id="profile-change-password">
    
                  <form onSubmit={HandleSubmit}>

                    <div className="row mb-3">
                      <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Senha actual</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="password" type="password" className="form-control" id="currentPassword" onChange={(e)=> setsenha({...Alterar, senhaActual: e.target.value})}/>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Nova Senha</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="newpassword" type="password" className="form-control" id="newPassword"  onChange={(e)=> setsenha({...Alterar, novaSenha: e.target.value})} />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Confirmar a Senha</label>
                      <div className="col-md-8 col-lg-9">
                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" value={ConfimarSenha} onChange={(e)=> setConfirmar(e.target.value)} />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary" style={{background:'#00968c',width:'14rem'}}>Salvar</button>
                    </div>
                  </form>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
      <FooterDashboard />
    </>
    : 
    <>
    Você não está Autenticado por favor favor faça Login
    <MyModal show={show} handleClose={handleClose} />
    </>
}
    </>
  )
}
