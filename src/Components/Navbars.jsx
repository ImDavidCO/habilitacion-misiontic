import React, {useState, useEffect} from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"

const Navbars = () => {
    const {loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently} = useAuth0();
    const [textButton, setTextButton] = useState('Login')
    const [Name, setName] = useState('')
    useEffect(() => {
      if(isAuthenticated){
        setTextButton('Logout')
        setName( user.name)
      }else{
        setTextButton('Login')
        setName('')
      }
    
    }, [isAuthenticated])
    useEffect(()=>{
      const getToken = async ()=>{
        const accesToken = await getAccessTokenSilently();
        localStorage.setItem('token', accesToken)
      }
      if(isAuthenticated){
        getToken();
      }
      
    }, [isAuthenticated, getAccessTokenSilently])

    return (
    <Navbar bg="primary" variant="dark">
    <Container>
        
    <Navbar.Brand href="#home"><img className="Logo" src="https://www.clipartmax.com/png/full/217-2174825_servicios-generales-icono-ferreteria-png.png" alt="Logo" /></Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link ><Link to='/'>Home</Link></Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      {
        isAuthenticated ?
        <NavDropdown title={Name} id="navbarScrollingDropdown">
          <NavDropdown.Item ><Link to='/dash' >Dashboard</Link></NavDropdown.Item>
          <NavDropdown.Item ><Link to='/ventas' >Ventas</Link></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >
          <Link to='/roles' >Roles</Link>
          </NavDropdown.Item>
        </NavDropdown>:
        null
      }

    </Nav>
    </Container>
    {
      isAuthenticated ?
      <button
    onClick={()=>logout({returnTo: window.location.origin})} 
    className="btn btn-primari"> {textButton} </button> :
    <button
    onClick={() => loginWithRedirect()} 
    className="btn btn-primari"> {textButton} </button>
    }
  </Navbar>
    )
}

export default Navbars
