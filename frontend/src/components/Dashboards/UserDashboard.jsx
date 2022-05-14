import {useEffect} from 'react'
import TicketChart from './TicketChart'
import UserInfo from './UserInfo'
import {reset} from '../../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function UserDashboard({chartData, tech, users}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess} = useSelector((state) => state.auth)

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }

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
      <section className='col-lg-10 chart'>
        <TicketChart chartData={chartData}/>
      </section> 
    </div>
    </>
  )
}

export default UserDashboard