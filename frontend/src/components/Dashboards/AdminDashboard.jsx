import {useEffect, useState} from 'react'
import TicketChart from './TicketChart'
import UserInfo from './UserInfo'
import {reset} from '../../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import UserList from './UserList'
import Button from 'react-bootstrap/Button'
import {FaRegEdit} from 'react-icons/fa'

function AdminDashboard({chartData, tech, users}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess} = useSelector((state) => state.auth)

  const [selfShow, setSelfShow] = useState(false);

  const handleClose = () => setSelfShow(false);
  const handleShow = () => setSelfShow(true);

  useEffect(() => {

    return () => {
      dispatch(reset())
    }
}, [tech, isSuccess, navigate, dispatch])

  return (
    <>
    <div className="row justify-content-around dash-row">
      <UserInfo tech={tech}/>
    </div> 
    <div className="row justify-content-around dash-row">
      <section className='col-lg-5 chart'>
        <TicketChart chartData={chartData}/>
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
                <UserList key={item.id} user={item}/>
              ))}
            </>
            ) : (<></>)}
            </tbody>
        </table>
      </section> 
    </div>
    </>
  )
}

export default AdminDashboard