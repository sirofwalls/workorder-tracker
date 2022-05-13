import {useState, useEffect} from 'react'
import Chart from 'react-apexcharts'
import {FaRegEdit} from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {editUser, reset} from '../../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function AdminDashboard({chartData, tech, users}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess} = useSelector((state) => state.auth)

  const seriesData = chartData.map(item => item.data)
  const chartLabels = chartData.map(item => item.name)

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
    if (!tech ) {
        navigate('/login')
      }

    return () => {
      dispatch(reset())
    }
}, [tech, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

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
    <p><i>"Current Users" edit buttons do not work yet</i></p>
    <div className="row justify-content-around dash-row">
      <section className='col-md-5 chart'>
        <h3>Your information</h3>
        <p><b>ID:</b> {tech.id}</p>
        <p><b>E-Mail:</b> {tech.email}</p>
        <p><b>User Role:</b> {tech.role}</p>
        <button className='btn btn-primary' onClick={handleShow}>Edit Details</button>
      </section> 
      {/* <section className='col-lg-5 chart'>
        // This Section to be filled out soon
      </section>  */}
    </div> 
    <div className="row justify-content-around dash-row">
      <section className='col-lg-5 chart'>
        <Chart
          type='donut'
          series={seriesData}
          height='100%'
          options={{
            dataLabels: {
              enabled: false
            },
            labels: chartLabels,
            plotOptions: {
              pie: {
                expandOnClick: false,
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true
                    },
                    name: {
                      show: false
                    }
                  }
                }
              }
            },
            title:{
              text: 'Tickets per Client'
            },
            chart: {
              animations: {
                enabled: false
              }
            },
            noData: {
              text: 'No Data to display at this time'
            }
          }}
        />
      </section> 
      <section className='col-lg-5 chart'>
        <h3>Current Users</h3>
        <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            <>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.techName}</td>
                <td>{item.techRole}</td>
                <td>
                  <Button variant="outline-warning">
                    <FaRegEdit/>
                  </Button>
                </td>
              </tr>
            ))}
            </>
          ) : (<></>)}
        </tbody>
        </table>
      </section> 
    </div>

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

export default AdminDashboard