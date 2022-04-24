import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'


function Register() {
    // State for the form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

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
            <h1><FaUser /> Register</h1>
            <p>Please Add a Tech</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter a name' onChange={onChange} />
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
                    <button type='submit' className='btn btn-block'>Register</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Register