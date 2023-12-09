import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate , NavLink} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "../../context/ConversationContext";
import "../css/header.css"

function Header() {

  const navigate = useNavigate() ;
  const { isLogin, toggleLogin } = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem('user'))

  return(
          <Navbar expand="lg" className="bg-dark-tertiary p-0 fixed-top" style={{ backgroundColor: "#007bff" , minHeight : "70px" , zIndex : 10}}>
              <Container>
                <Navbar.Brand onClick={() => navigate('/')}>
                      <div className='text-decoration-none fw-medium text-white fs-5'>Entretien IA</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                     <Nav className="me-auto"></Nav>
                     <Nav className="me-5">
                        <Nav.Item className="mx-3 my-2">{isLogin ?
                                 <span className="text-white text-decoration-none" style={{ fontSize: "1.3em" }} to="/">{"Bienvenue " + user.firstName}</span> :
                                 <NavLink to="/Login" className="text-white text-decoration-none" style={{ fontSize: "1.3em" }}>Se connecter</NavLink>}
                        </Nav.Item>
                        <Nav.Item className="mx-3 my-2">{isLogin ?
                              <span className="span-header" onClick={() => {
                                 localStorage.clear()
                                 toggleLogin()
                                 navigate("/")
                              }}>Logaout</span> :
                              <NavLink to="/Register" className="text-white text-decoration-none" style={{ fontSize: "1.3em" }}>S'inscrire</NavLink>}
                        </Nav.Item>
                     </Nav>
                </Navbar.Collapse>
                </Container>
          </Navbar>
       )
    }

export default Header