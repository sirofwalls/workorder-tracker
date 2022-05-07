import {FaSignInAlt, FaSignOutAlt, FaUser, FaFileInvoice, FaPeopleArrows, FaList} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../assets/pictures/BTB-logo.png'

function Header() {

    // Initialize navigate and dispatch
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Chaech is the user is logged in
    const {tech} = useSelector((state) => state.auth)

    // Log out button function
    const onLogout = () => {
        dispatch(reset())
        dispatch(logout())
        navigate('/')
    }

    return (
    <Navbar expand='lg'>
        <Navbar.Brand>
        <Link to='/'><img src={logo} alt="Beyond the Bit Logo" /></Link>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
            <Nav className='justify-content-end'>
            {tech ? (
                <>
                <Nav.Link>
                    <button className='btn' onClick={() => {navigate('/clients')}}>
                        <FaPeopleArrows /> Clients
                    </button>
                </Nav.Link>
                <Nav.Link>
                    <button className='btn' onClick={() => {navigate('/create-workorder')}}>
                        <FaFileInvoice /> Create Workorder
                    </button>
                </Nav.Link>
                <Nav.Link>
                    <button className='btn' onClick={() => {navigate('/workorders')}}>
                        <FaList/> View Workorders
                    </button>
                </Nav.Link>
                {tech.role === 'admin' ? (
                    <Nav.Link>
                    <button className='btn' onClick={() => {navigate('/register')}}>
                        <FaUser /> Add User
                    </button>
                    </Nav.Link>
                ) : (<></>)}
                <Nav.Link>
                    <button className='btn btn-danger' onClick={onLogout}>
                        <FaSignOutAlt /> Log Out
                    </button>
                </Nav.Link>
                </>
                ) : (
                    <>
                    <Nav.Link>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </Nav.Link>
                    </>
                )}
            </Nav>
        </Navbar.Collapse>

        
    </Navbar>
    )
}

export default Header