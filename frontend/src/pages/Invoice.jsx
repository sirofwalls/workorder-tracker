import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import InvoiceForm from '../components/InvoiceForm'
import Spinner from '../components/Spinner'
import { getInvoices, reset } from '../features/invoices/invoiceSlice'

function Invoice() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {isLoading, isError, message} = useSelector((state) => state.invoices)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!tech) {
      navigate('/login')
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
      <h1>Create a new Invoice</h1>
    </section>
    <InvoiceForm />
    </>
  )
}

export default Invoice