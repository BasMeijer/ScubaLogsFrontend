import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class GlobalTemperatureChart extends Component {
    render() {


        const data = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
                {
                    label: 'Temperature Current',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(29, 82, 119, 0.7)',
                    borderColor: 'rgba(128, 223, 255, 1)',
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
                    data:this.props.data
                },
                {
                    label: 'Temperature Average',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(29, 82, 119, 0.8)',
                    borderColor: 'rgba(29, 82, 119, 1)',
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
                    data: [4,6,6,7]
                }
            ]
        };

        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 20
                    }
                }]
            }
        }

        return (
            <Line data={data} height={100} options={options}/>
        )
    }
}

export default GlobalTemperatureChart