import React, { Component } from 'react'
import OverviewMap from '../map/OverviewMap'
import GlobalTemperatureChart from '../charts/GlobalTemperatureChart'
import { hashHistory } from 'react-router'

import diverIcon from '../../images/diver-icon.png'
import locationIcon from '../../images/location-icon.png'
import temperatureIcon from '../../images/temperature-icon.png'
import logbookIcon from '../../images/book-icon.png'


import './HomePage.css'

class HomePage extends Component {
    render() {
        return (
            <div className="pure-g main-container">

                <header className="pure-u-1">
                    <h1 className="btn-home" onClick={() => { hashHistory.push('/') }}>ScubaLogs</h1>
                    <h2 className="btn-profile" onClick={() => { hashHistory.push('/users/Bas') }}>My Profile</h2>
                </header>

                <div className="pure-u-1 map">
                    <OverviewMap />
                </div>

                <div className="pure-u-1 pure-u-md-2-3 homepage-container">
                    <div className="content-box pure-u-1 stat-container">

                        <div className="stat-box">

                            <img src={diverIcon} alt="" className="stat-icon" />

                            <div className="stat-content">
                                <span className="stat">2</span>
                                <span className="stat-description">Divers</span>
                            </div>
                        </div>
                        <div className="stat-box">

                            <img src={logbookIcon} alt="" className="stat-icon" />

                            <div className="stat-content">
                                <span className="stat">77</span>
                                <span className="stat-description">Divelogs</span>
                            </div>
                        </div>
                        <div className="stat-box">

                            <img src={locationIcon} alt="" className="stat-icon" />

                            <div className="stat-content">
                                <span className="stat">2</span>
                                <span className="stat-description">Locations</span>
                            </div>
                        </div>


                    </div>

                    <div className="content-box">
                        <div className="pure-u-1 pure-u-md-1-3">
                            <h3>Top Contributors</h3>
                        </div>
                        <div className="pure-u-1 pure-u-md-2-3">
                            <h3>Latest Logs</h3>
                        </div>
                    </div>

                    <div className="content-box home-chart">
                        <h3>Global Temperature</h3>
                        <GlobalTemperatureChart />
                    </div>

                </div>

            </div>
        )
    }

}

export default HomePage