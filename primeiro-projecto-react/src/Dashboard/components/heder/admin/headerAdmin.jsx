import React, { useState, useEffect } from 'react'
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
import { NomeAdmin } from '../../../../components/NomeAdmin/NomeAdmin';
import logo from '../../../../assets/Geo Farma/Geo Farma.png'
import imagem from '../../../../assets/Screenshot_20240110-233026.png'
import { Formattime } from '../../../pages/Admin/Admintrador/AdminMensagens/AdminMensagens';
import { api } from '../../../../api';


export default function HeaderAdmin() {

  const Idusuario = localStorage.getItem("usuario")
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

  const [userPhoto, setUserPhoto] = useState('');
  const [mensagens, setMensagens] = useState([])
  const [total, settotal] = useState(0)

  const ObterUserId = async () => {
    try {
      const res = await api.get(`/ad/obtera/${Idusuario}`);
      setUserPhoto(res.data.data[0].foto);

    } catch (error) {
      console.error(error)
    }
  }
  const Mensagens = async () => {
    try {
      const res = await api.get(`/sms/mostra`)
      setMensagens(res.data.data)

      settotal(res.data.data[0].total)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    ObterUserId();
    Mensagens()
  }, [])




  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <Link to={"/"} className="logo d-flex align-items-center">
            <img src={logo} alt="eee" />
            <span className="d-none d-lg-block" style={{ color: 'white' }}>GeoFarma</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" style={{ color: 'white' }} onClick={open}></i>


        </div>

        

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to={"#"}>
                <i className="bi bi-search"></i>
              </Link>
            </li>

          {/*   <li className="nav-item dropdown">

              <Link className="nav-link nav-icon" to={"#"} data-bs-toggle="dropdown">
                <i className="bi bi-bell" style={{ color: 'white' }}></i>
                <span className="badge bg-primary badge-number">{total}</span>
              </Link>

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
                  <Link to={"#"}>Mostrar Todas as Notificações</Link>
                </li>

              </ul>

            </li> */}

            <li className="nav-item dropdown" >

              <Link className="nav-link nav-icon" to={"#"} data-bs-toggle="dropdown" >
                <i className="bi bi-chat-left-text" style={{ color: 'white' }}></i>
                <span className="badge bg-success badge-number"  >{total}</span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  Você tem  {total} mensagens novas
                  <Link to="/adminmensagem"><span className="badge rounded-pill bg-primary p-2 ms-2">Ver Tudo</span></Link>

                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {

                  mensagens.map((m, index) => (
                    <>
                      <div key={index}>
                      <li className="message-item" >
                        <Link to="/adminmensagem">
                          {m.foto ?
                              <img src={`http://localhost:8800/${m.foto}`} alt="ee" style={{ borderRadius: '100%', width: '1rem', height: '1rem' }}  />
                            :
                            <img src={imagem} alt='profile' className='rounded-circle' />
                          }
                          <div>
                            <h4>{m.nome}</h4>
                            <p>{m.mensagem}</p>
                            <p>{Formattime(m.data_envio)}</p>
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

            </li>
            <li className="nav-item dropdown pe-3" style={{ marginRight: '1.6rem' }}>

              <Link className="nav-link nav-profile d-flex align-items-center pe-0" to={"#"} data-bs-toggle="dropdown">
                {userPhoto ?
                  <img src={`http://localhost:8800/${userPhoto}`} alt="Profile" className="rounded-circle" />
                  :
                  <img src={imagem} alt='profile' className='rounded-circle' />
                }

                {/* <i className='bi bi-person-circle fs-3 '></i> */}
                <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: 'white' }}><NomeAdmin /></span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6><NomeAdmin style={{ color: 'white' }} /></h6>
                  <span>Adminstrador 00 {Idusuario}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" to={`/adminperfil`}>
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
