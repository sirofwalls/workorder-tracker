import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
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

    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Beyond The Bit</Link>
        </div>
        <ul>
            {tech ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Log Out
                    </button>
                </li>
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