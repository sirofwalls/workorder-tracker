import {FaSignInAlt, FaSignOutAlt, FaUser, FaFileInvoice} from 'react-icons/fa'
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
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    // Link to navigate to Invoice page... there should be a better way
    const invoicePage = () => {
        navigate('/invoice')
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
                    <button className='btn' onClick={invoicePage}>
                        <FaFileInvoice /> Create Invoice
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={onLogout}>
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
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header