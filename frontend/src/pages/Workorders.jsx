import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import WorkorderItem from '../components/Workorders/WorkorderItem'
import WorkorderSortForm from '../components/Workorders/WorkorderSortForm'
import Spinner from '../components/App/Spinner'
import {toast} from 'react-toastify'
import { getWorkorders, reset } from '../features/workorders/workorderSlice'
import {getUsers} from '../features/auth/authSlice'
import { CSVLink } from "react-csv"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {tech, isLoading: authLoading} = useSelector((state) => state.auth)
  const {workorders, isLoading: workorderLoading, isError, message} = useSelector((state) => state.workorders)
  
  
  // Header Content for formating the CSV 
  const headers = [
    {label: "Date", key: "createdAt"},
    {label: "Tech Name", key: "techName"},
    {label: "Client Name", key: "clientName"},
    {label: "Client Number", key: "clientNumber"},
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
  
  // Takes the workorders from the state and formats the date for the CSV
  const data = workorders.map(row => ({...row, createdAt: new Date(row.createdAt).toLocaleDateString('en-US')}))

  // Need this in order to sort the workorders by newest first
  const workorderList = [...workorders]

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }
    if (isError) {
      toast.error(message)
    }
  
    dispatch(getUsers())
    dispatch(getWorkorders())

    return () => {
      dispatch(reset())
    }
  }, [tech, navigate, isError, message, dispatch])

  if (authLoading || workorderLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      {tech && workorders.length > 0 ? (
      <CSVLink data={data} headers={headers} filename={`workorders_${new Date().toLocaleDateString('en-US')}.csv`} target="_blank">
        Download CSV
      </CSVLink>) : <></>}
    </section>
    <WorkorderSortForm/>
    <section className="content">
      {tech && workorders.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Work Order #</th>
              <th scope="col">Date Created</th>
              <th scope="col">Client</th>
              <th>View</th>
              {(tech.role === 'admin'
              ) ? (
                <>
                <th scope="col">Tech</th>
                <th scope="col">Delete</th>
                </>
              ) : (
            <></>)}
            </tr>
          </thead>
          {workorders ? (
            <tbody>
              {workorderList.sort((a, b) => a.id < b.id ? 1 : -1).map((workorder) => (
                <WorkorderItem key={workorder.id} workorder={workorder} tech={tech}/>
              ))}
            </tbody>
          ) : (
            <></>
          )}
        </table>
      ) : (
        <h3>There are no Workorders to display</h3>)}
    </section>
    </>
  )
}

export default Dashboard
