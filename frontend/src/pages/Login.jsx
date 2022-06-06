import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/App/Spinner'


function Login() {
    // State for the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    // Initialize navigate and dispatch
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {tech, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    // Looks for changes and checks if there is an error. If successful it will redirect to the root directory. Will run reset function either way.
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || tech) {
            navigate('/')
        }

        dispatch(reset())
    }, [tech, isError, isSuccess, message, navigate, dispatch])

    // Function to control the state of the itmes being typed
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // Control the submit action for the form
    const onSubmit = (e) => {
        e.preventDefault()

        const techData = {
            email,
            password
        }

        dispatch(login(techData))
    }

    const guestCredentials = () => {
        setFormData((prevState) => ({
            ...prevState,
            email: 'guest@example.com',
            password: 'Guest123SnC^&'
        }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
        <section className="heading">
            <h1><FaSignInAlt /> Log In</h1>
            <p>Please log in</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter an email' onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter a password' onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block btn-dark'>Log In</button>
                </div>
                <div className="form-group">
                    <button type='button' onClick={guestCredentials} className='btn btn-block btn-guest'>Get Guest Credentials</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Login