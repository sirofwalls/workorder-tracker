import React from 'react'
import Chart from 'react-apexcharts'

function AdminDashboard({chartData, tech}) {
  const seriesData = chartData.map(item => item.data)
  const chartLabels = chartData.map(item => item.name)
  return (
    <>
    <div className="row justify-content-around dash-row">
      <section className='col-md-5 chart'>
        <p>ID: {tech.id}</p>
        <p>E-Mail: {tech.email}</p>
        <p>User Role: {tech.role}</p>
        <button className='btn btn-primary'>Edit Detailes</button>
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
              text: 'Duplicate for format testing'
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
    </div> 
    </>
  )
}

export default AdminDashboard