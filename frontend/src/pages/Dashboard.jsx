import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import InvoiceItem from '../components/InvoiceItem'
import Spinner from '../components/Spinner'
import { getInvoices, reset } from '../features/invoices/invoiceSlice'
import { CSVLink } from "react-csv"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech} = useSelector((state) => state.auth)
  const {invoices, isLoading, isError, message} = useSelector((state) => state.invoices)
  
  // Header Content for formating the CSV 
  const headers = [
    {label: "Date", key: "createdAt"},
    {label: "Tech Name", key: "techName"},
    {label: "Client Name", key: "clientName"},
    {label: "Start Time", key: "startTime"},
    {label: "End Time", key: "endTime"},
    {label: "Miles Traveled", key: "milesTraveled"},
    {label: "Time Traveled", key: "timeTraveled"},
    {label: "Verify Network", key: "verifyNetwork"},
    {label: "Verify WiFi", key: "verifyWifi"},
    {label: "Up Speed", key: "speedUp"},
    {label: "Down Speed", key: "speedDown"},
    {label: "Job Notes", key: "jobNotes"},
    {label: "Change Notes", key: "changeNotes"},
  ]
  
  // Takes the invoices from the state and formats the date for the CSV
  const data = invoices.map(row => ({...row, createdAt: new Date(row.createdAt).toLocaleDateString('en-US')}))

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
      {tech && invoices.length > 0 ? (
      <CSVLink data={data} headers={headers} filename={"btb-invoices.csv"} target="_blank">
        Download CSV
      </CSVLink>) : <></>}
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