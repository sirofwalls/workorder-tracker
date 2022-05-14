import {useState, useEffect} from 'react'
import {FaRegEdit} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {editUser, reset} from '../../features/auth/authSlice'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const UserList = ({user, tech}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isSuccess} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        editTech: user.id,
        email: user.email,
        name: user.techName,
        techRole: user.techRole
    })


    const [selfShow, setSelfShow] = useState(false);

  const handleClose = () => setSelfShow(false);
  const handleShow = () => setSelfShow(true);

    const {
        editTech,
        email,
        name,
        techRole
    } = formData

    const userRoles = [
        {
            id: 1,
            techRole: 'user'
        }, 
        {
            id: 2,
            techRole: 'admin'
        }
    ]

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

    const onSelect = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            techRole: e.target.value,
        }))
    }

    const userChange = (e) => {
        e.preventDefault()

        const techData = {editTech, email, name, techRole}
        dispatch(editUser(techData))
        
        setFormData({
            editTech: 0,
            email: '',
            name: '',
            techRole: user.techRole
        })

        handleClose()
    }
    return (
        <>
        <tr>
            <td>{user.id}</td>
            <td>{user.techName}</td>
            <td>{user.techRole}</td>
            <td>
            <Button variant="outline-warning">
                <FaRegEdit onClick={handleShow}/>
            </Button>
            </td>
        </tr>
        
        <Modal show={selfShow} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title><b>Edit Details</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={userChange}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name='email' id='email' value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="techRole">Tech Role</label>
                    <select onChange={onSelect} >
                        {userRoles.map((role) => (
                            <option key={role.id} name={role.techRole} value={role.techRole} selected={role.techRole === user.techRole}>{role.techRole}</option>
                        ))}
                    </select>
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

export default UserList