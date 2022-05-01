import {FaSignInAlt, FaSignOutAlt, FaUser, FaFileInvoice, FaPeopleArrows, FaList} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

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

    // Link to navigate to Workorder page... there should be a better way
    const workorderCreatePage = () => {
        navigate('/create-workorder')
    }
    // Link to navigate to Clients page... there should be a better way
    const clientsPage = () => {
        navigate('/clients')
    }
    // Link to navigate to Workorder List page... again, there should be a better way
    const workorderListPage = () => {
        navigate('/workorders')
    }
    // Link to navigate to Register page... again, again, there should be a better way
    const registerPage = () => {
        navigate('/register')
    }

    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Beyond The Bit</Link>
        </div>
        <ul>
            {tech ? (
                <>
                <li>
                    <button className='btn' onClick={clientsPage}>
                        <FaPeopleArrows /> Clients
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={workorderCreatePage}>
                        <FaFileInvoice /> Create Workorder
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={workorderListPage}>
                        <FaList/> View Workorders
                    </button>
                </li>
                {tech.role === 'admin' ? (
                    <li>
                    <button className='btn' onClick={registerPage}>
                        <FaUser /> Add User
                    </button>
                    </li>
                ) : (<></>)}
                <li>
                    <button className='btn btn-danger' onClick={onLogout}>
                        <FaSignOutAlt /> Log Out
                    </button>
                </li>
                </>
                
            ) : (
                <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header