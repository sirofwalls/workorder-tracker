import React from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'

function WorkorderSortForm({onTechFilter}) {
  const {tech, users} = useSelector((state) => state.auth)

  const [filters, setFilters] = useState({
    startDate: '',
    endDate:''
  })
  
  return (
    <>
    <p>Sort Work Orders <small><i>(work in progress)</i></small></p>
    <section className="form">
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input type="date" name='startDate' id='startDate' />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input type="date" name='endDate' id='endDate' />
      </div>
    </section>
    </>
  )
}

export default WorkorderSortForm