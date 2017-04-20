import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class GlobalTemperatureChart extends Component {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
                {
                    label: 'Temperature',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data
                }
            ]
        };

        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 30
                    }
                }]
            }
        }

        return (
            <Line data={data} height={100} options={options} />
        )
    }
}

export default GlobalTemperatureChart