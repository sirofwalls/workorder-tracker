import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()

  const {tech} = useSelector((state) => state.auth)

  useEffect(() => {
    if (!tech) {
      navigate('/login')
    }
  }, [tech, navigate])

  return (
    <>
    <section className="heading">
      <h1>Welcome {tech && tech.name}</h1>
      <p>Invoice App Dashboard</p>
    </section>
    </>
  )
}

export default Dashboard