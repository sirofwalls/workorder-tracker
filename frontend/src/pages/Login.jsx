import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'


function Login() {
    // State for the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

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
                    <button type='submit' className='btn btn-block'>Register</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Login