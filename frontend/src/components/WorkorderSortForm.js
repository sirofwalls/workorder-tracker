import React from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'

function WorkorderSortForm() {

    const [userFilter, setUserFilter] = useState('')

    const {tech, users} = useSelector((state) => state.auth)

  return (
    <>
    <p>Sort Work Orders <small><i>(work in progress)</i></small></p>
    <section className="form">
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input type="date" name='startDate' id='startDate'/>
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input type="date" name='endDate' id='endDate'/>
      </div>
      {tech && tech.role === 'admin' && users ? (
        <div className="form-group">
        <label htmlFor="selectTech">Tech</label>
        <select onChange={(e) => setUserFilter(e.target.value)}>
          <option></option>
          {users.map((user) => (
              <option key={user.id} name={user.techName} value={user.techName}>{user.techName}</option>
          ))}
        </select>
      </div>
      ) : (<></>)}
    </section>
    </>
  )
}

export default WorkorderSortForm