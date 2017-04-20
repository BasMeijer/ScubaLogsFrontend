import React from 'react';
import { Bar } from 'react-chartjs-2';

export default React.createClass({
    displayName: 'DiveNumberChart',

    render() {

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Dives per month',
                    backgroundColor: 'rgba(29, 82, 119, 0.7)',
                    borderColor: 'rgba(29, 82, 119, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(128, 223, 255, 0.7)',
                    hoverBorderColor: 'rgba(128, 223, 255, 1)',
                    data: this.props.data
                }
            ]
        };


        return (
            <div>
                <Bar
                    data={data}
                    height={300}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
});