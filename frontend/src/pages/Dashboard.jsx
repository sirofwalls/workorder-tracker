import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import InvoiceItem from '../components/InvoiceItem'
import Spinner from '../components/Spinner'
import { getInvoices, reset } from '../features/invoices/invoiceSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {invoices, isLoading, isError, message} = useSelector((state) => state.invoices)

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }
    if (isError) {
      console.log(message)
    }
  
    dispatch(getInvoices())

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
      <h1>Welcome {tech && tech.name}</h1>
      <p>Invoice App Dashboard</p>
    </section>
    <section className="content">
      {tech && invoices.length > 0 ? (
        <div className="invoices">
          {invoices.map((invoice) => (
            <InvoiceItem key={invoice._id} invoice={invoice} tech ={tech}/>
          ))}
        </div>
      ) : (
        <h3>There are no Invoices to display</h3>)}
    </section>
    </>
  )
}

export default Dashboard