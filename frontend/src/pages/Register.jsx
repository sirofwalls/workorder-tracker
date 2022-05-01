import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'



function Register() {
    // State handler for the form
    const [formData, setFormData] = useState({
        techName: '',
        email: '',
        password: '',
        password2: ''
    })

    const {techName, email, password, password2} = formData

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

        if(password !== password2) {
            toast.error('Password do not match')
        } else if (password.length < 8 || password.length > 24) {
            toast.error('Password must be between 8 and 24 characters in length')
        } else {
            // If the password match in the form send the userdata to register function
            const userData = {techName, email, password}
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
        <section className="heading">
            <h1><FaUser /> Register</h1>
            <p>Please Add a Tech</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="text" className="form-control" id='techName' name='techName' value={techName} placeholder='Enter a name' onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter an email' onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter a password' onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder='Confirm the password' onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block btn-dark'>Register</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Register