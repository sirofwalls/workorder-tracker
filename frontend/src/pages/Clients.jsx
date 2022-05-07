import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from '../components/App/Spinner'
import { getClients, reset } from '../features/clients/clientSlice'
import ClientForm from '../components/Clients/ClientForm'
import ClientItem from '../components/Clients/ClientItem'

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

    if (isError) {
      toast.error(message)
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
    {(tech && tech.role === 'admin') ? (
      <ClientForm />
    ) : (
      <></>
    )}
    <section className="content">
        {clients.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Client #</th>
                  <th scope="col">Client Name</th>
                  {(tech.role === 'admin'
                  ) ? (
                    <th scope="col">Delete</th>
                  ) : (
                <></>)}
                </tr>
              </thead>
              {clients ? (
                <tbody>
                {clients.map((client) => (
                  <ClientItem key={client.clientNumber} client={client} tech ={tech}/>
                ))}
              </tbody>
              ) : (
                <></>
              )}
            </table>
          ) : (
          <h3>There are no clients to show at this time.</h3>)}
    </section>
    </>
  )
}

export default Clients