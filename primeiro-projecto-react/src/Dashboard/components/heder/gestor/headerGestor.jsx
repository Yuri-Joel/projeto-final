import React, { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab'
import { Link } from 'react-router-dom';
import { Terminar } from '../../../../components/Logout/Logout';
import logo from '../../../../assets/Geo Farma/Geo Farma.png'
import imagem from '../../../../assets/Screenshot_20240110-233026.png'
import axios from 'axios';
import { NomeGestor } from '../../../../components/NomeGestor/NomeGestor';
import { NomeSubGestor } from '../../../../components/NomeSubgestor/NomeSubgestor';


export const  HeaderGestor =()=> {

  
  let Idusuario;
  const [userPhoto, setUserPhoto] = useState('');
  const subgestor = !!localStorage.getItem("subgestor")
  if(subgestor){
   Idusuario = localStorage.getItem("subgestor")
    const ObterUserId = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/sub/obtera/${Idusuario}`);
        setUserPhoto(res.data.data[0].foto);

      } catch (error) {
        console.error(error)
      }
    }
    
    ObterUserId()
  } else {
    Idusuario = localStorage.getItem("usuario")

    const ObterUserId = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/ges/obtera/${Idusuario}`);
        setUserPhoto(res.data.data[0].foto);

      } catch (error) {
        console.error(error)
      }
    }
    ObterUserId()

  }
  const [numero, SetNumero] = useState(1)
  const [side, SetSide] = useState('')
  const body = document.body
  body.className = `${side}`
  const open = () => {
    if (numero % 2 === 1) {
      SetSide('toggle-sidebar')
    } else {
      SetSide('')
    }
    SetNumero(numero + 1)
  }

  





  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center" >

        <div className="d-flex align-items-center justify-content-between">
          <Link  to={"/"} className="logo d-flex align-items-center">
            <img src={logo} alt="eee" />
            <span className="d-none d-lg-block" style={{ color: 'white' }}>GeoFarma</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" style={{ color: 'white' }} onClick={open}></i>


        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" >
            <input type="text" name="query" placeholder="Pesquisar" title="Enter search keyword" style={{ marginLeft: '3rem', width: '20rem' }} />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to={"#"}>
                <i className="bi bi-search"></i>
              </Link>
            </li>

        {/*     <li className="nav-item dropdown">

              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell" style={{ color: 'white' }}></i>
                <span className="badge bg-primary badge-number">{total}</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  Você tem {total} Mensagens
                  <Link to="/adminmensagem"><span className="badge rounded-pill bg-primary p-2 ms-2">Ver Tudo</span></Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {
                  mensagens.map((m) => (
                    <>
                      <div key={m.id}>
                        <li className="notification-item" >
                          <i className="bi bi-exclamation-circle text-warning"></i>
                          <div >
                            <h4>{m.nome}</h4>
                            <p>{m.mensagem}</p>
                            <p>{m.data_envio}</p>
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
                  <a href="#">Mostrar Todas as Notificações</a>
                </li>

              </ul>

            </li> */}

          {/*   <li className="nav-item dropdown">

              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text" style={{ color: 'white' }}></i>
                <span className="badge bg-success badge-number">{total}</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  Você tem  {total} mensagens novas
                  <Link to="/adminmensagem"><span className="badge rounded-pill bg-primary p-2 ms-2">Ver Tudo</span></Link>

                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {

                  mensagens.map((m) => (
                    <>
                      <div key={m.id}>
                        <li className="message-item" >
                          <Link to="/adminmensagem">
                            {m.foto ?
                              <img src={`http://localhost:8800/${m.foto}`} alt="ee" className="rounded-circle" />
                              :
                              <img src={imagem} alt='profile' className='rounded-circle' />
                            }
                            <div>
                              <h4>{m.nome}</h4>
                              <p>{m.mensagem}</p>
                              <p>{m.data_envio}</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </div>
                    </>
                  ))}

                <li className="dropdown-footer">
                  <Link to="/adminmensagem">Mostrar todas as mensagens</Link>
                </li>

              </ul>

            </li> */}
            <li className="nav-item dropdown pe-3" style={{ marginRight: '1.6rem' }}>

              <Link className="nav-link nav-profile d-flex align-items-center pe-0" to={"#"} data-bs-toggle="dropdown">
                {userPhoto ?
                  <img src={`http://localhost:8800/${userPhoto}`} alt="Profile" className="rounded-circle" />
                  :
                  <img src={imagem} alt='profile' className='rounded-circle' />
                }

                {/* <i className='bi bi-person-circle fs-3 '></i> */}
                <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: 'white' }}>     {subgestor ? <NomeSubGestor /> :<NomeGestor />}</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{subgestor ? <NomeSubGestor style={{ color: 'white' }} /> : <NomeGestor style={{ color: 'white' }} /> }</h6>
                  <span>Gestor 00 {Idusuario}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" to={`/gestorperfil`}>
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
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/" onClick={() => Terminar()}>
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
