import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {editUser, reset} from '../../features/auth/authSlice'

const UserInfo = ({tech}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isSuccess} = useSelector((state) => state.auth)

    const [selfShow, setSelfShow] = useState(false);

    const handleClose = () => setSelfShow(false);
    const handleShow = () => setSelfShow(true);

    const [formData, setFormData] = useState({
        email: tech.email,
        name: tech.name,
        password: ''
      })
    
      const {
        email,
        name,
        password
      } = formData

    useEffect(() => {
    
        return () => {
          dispatch(reset())
        }
    }, [tech, isSuccess, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
    }))}

    const selfChange = (e) => {
        e.preventDefault()
    
        const techData = {email, name, password}
        dispatch(editUser(techData))
        
        setFormData({
          email: '',
          name: '',
          password: ''
        })
    
        handleClose()
      }

  return (
    <>
    <section className='col-md-5 chart'>
        <h3>Your information</h3>
        <p><b>ID:</b> {tech.id}</p>
        <p><b>E-Mail:</b> {tech.email}</p>
        <p><b>User Role:</b> {tech.role}</p>
        <button className='btn btn-primary' onClick={handleShow}>Edit Details</button>
    </section>

    <Modal show={selfShow} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title><b>Edit Details</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={selfChange}>
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" name='email' id='email' value={email} onChange={onChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id='name' value={name} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' value={password} onChange={onChange} />
            </div>
            <div className="form-group">
            <Button variant="success" type='submit'>
                Save
            </Button>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
            Cancel
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default UserInfo