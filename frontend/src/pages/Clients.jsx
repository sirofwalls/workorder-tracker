import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import ClientForm from '../components/ClientForm'
import Spinner from '../components/Spinner'
import { getClients, reset } from '../features/clients/clientSlice'
import ClientItem from '../components/ClientItem'

function Clients() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {clients, isLoading, isError, message} = useSelector((state) => state.clients)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!tech) {
      navigate('/login')
    }

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
      <h1>Create a new Client</h1>
    </section>
    <ClientForm />
    <section className="content">
        {clients.length > 0 ? (
            <div className="clients">
                {clients.map((client) => (
                <ClientItem key={client._id} client={client} tech ={tech}/>
                ))}
            </div>
          ) : (
          <h3>There are no clients to show at this time.</h3>)}
    </section>
    </>
  )
}

export default Clients