import {Link} from 'react-router-dom'
import logo from '../../assets/pictures/logo.png'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Footer() {

    return (
    <>
    <Navbar className='bottom-footer'>
        <Container className='footer'>
        <Navbar.Brand><Link to='/'><img src={logo} alt="Logo" style={{maxWidth: "150px"}} /> </Link></Navbar.Brand>
        </Container>
    </Navbar>
    </>
  )
}

export default Footer