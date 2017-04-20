import React from 'react';
import { Bar } from 'react-chartjs-2';

export default React.createClass({
    displayName: 'DiveNumberChart',

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
                {
                    label: 'Dives per month',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
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
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
});