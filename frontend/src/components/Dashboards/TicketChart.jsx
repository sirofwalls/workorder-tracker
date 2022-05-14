import Chart from 'react-apexcharts'

const TicketChart = ({chartData}) => {
    const seriesData = chartData.map(item => item.data)
    const chartLabels = chartData.map(item => item.name)

  return (
    <>
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
    </>
  )
}

export default TicketChart