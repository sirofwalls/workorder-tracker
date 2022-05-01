import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
// import { getWorkorders, reset } from '../features/workorders/workorderSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {isLoading, isError, message} = useSelector((state) => state.workorders)

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }
    if (isError) {
      toast.error(message)
    }
  
    // dispatch(getWorkorders())

    // return () => {
    //   dispatch(reset())
    // }
  }, [tech, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome {tech && tech.name}</h1>
      <p>Workorder App Dashboard</p>
      <p>Nothing here yet... Coming soon&trade;</p>
    </section>
    </>
  )
}

export default Dashboard