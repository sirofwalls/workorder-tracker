import {Link} from 'react-router-dom'
import logo from '../assets/pictures/BTB-logo.png'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Footer() {

    return (
    <>
    <Navbar className='bottom-footer'>
        <Container className='footer'>
        <Navbar.Brand><Link to='/'><img src={logo} alt="Beyond the Bit Logo" /> </Link></Navbar.Brand>
        </Container>
    </Navbar>
    </>
  )
}

export default Footer