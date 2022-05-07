import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import WorkorderForm from '../components/Workorders/WorkorderForm'
import {toast} from 'react-toastify'
import Spinner from '../components/App/Spinner'
import { getWorkorders, reset } from '../features/workorders/workorderSlice'
import { getClients} from '../features/clients/clientSlice'

function Workorder() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {isLoading, isError, message} = useSelector((state) => state.workorders)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!tech) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(getWorkorders())
    dispatch(getClients())

    return () => {
      dispatch(reset())
    }
  }, [tech, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Create a new Workorder</h1>
    </section>
    <WorkorderForm />
    </>
  )
}

export default Workorder