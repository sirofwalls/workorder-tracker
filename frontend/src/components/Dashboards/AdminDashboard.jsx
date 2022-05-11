import React from 'react'
import Chart from 'react-apexcharts'
import {FaRegEdit} from 'react-icons/fa'
import Button from 'react-bootstrap/Button'

function AdminDashboard({chartData, tech, users}) {
  const seriesData = chartData.map(item => item.data)
  const chartLabels = chartData.map(item => item.name)
  return (
    <>
    <p><i>Edit buttons dont work yet</i></p>
    <div className="row justify-content-around dash-row">
      <section className='col-md-5 chart'>
        <p><b>ID:</b> {tech.id}</p>
        <p><b>E-Mail:</b> {tech.email}</p>
        <p><b>User Role:</b> {tech.role}</p>
        <button className='btn btn-primary'>Edit Details</button>
      </section> 
      {/* <section className='col-lg-5 chart'>
        // This Section to be filled out soon
      </section>  */}
    </div> 
    <div className="row justify-content-around dash-row">
      <section className='col-lg-5 chart'>
        <Chart
          type='donut'
          series={seriesData}
          height='100%'
          options={{
            dataLabels: {
              enabled: false
            },
            labels: chartLabels,
            plotOptions: {
              pie: {
                expandOnClick: false,
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true
                    },
                    name: {
                      show: false
                    }
                  }
                }
              }
            },
            title:{
              text: 'Tickets per Client'
            },
            chart: {
              animations: {
                enabled: false
              }
            },
            noData: {
              text: 'No Data to display at this time'
            }
          }}
        />
      </section> 
      <section className='col-lg-5 chart'>
        <h3>Current Users</h3>
        <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.techName}</td>
              <td>{item.techRole}</td>
              <td>
                <Button variant="outline-warning">
                  <FaRegEdit/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </section> 
    </div> 
    </>
  )
}

export default AdminDashboard