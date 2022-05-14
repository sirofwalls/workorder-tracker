import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/App/Spinner'
import {toast} from 'react-toastify'
import { getWorkorders } from '../features/workorders/workorderSlice'
import {getUsers} from '../features/auth/authSlice'
import AdminDashboard from '../components/Dashboards/AdminDashboard'
import UserDashboard from '../components/Dashboards/UserDashboard'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {users} = useSelector((state) => state.auth)
  const {workorders, isLoading, isError, message} = useSelector((state) => state.workorders)

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }
    if (isError) {
      toast.error(message)
    }

    dispatch(getUsers())
    dispatch(getWorkorders())

  }, [tech, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  // Format the data for the charts
  const clientWorkorderList = [...new Set(workorders.map((workorder) => workorder.clientName))]

  const chartData = clientWorkorderList.map((client) => ({
    name: client,
    data: workorders.filter(workorder => workorder.clientName === client).length
  }))

  return (
    <>
    {tech ? (
      <>
      <section className="heading">
        <h1>Welcome {tech && tech.name}</h1>
        <p>Workorder App Dashboard</p>
      </section>
      {tech && tech.role === 'admin' ? (
        <AdminDashboard chartData={chartData} tech={tech} users={users}/>
      ) : (
        <UserDashboard chartData={chartData} tech={tech}/>
      )}
      </>
    ) : (<></>)}
    </>
  )
}

export default Dashboard