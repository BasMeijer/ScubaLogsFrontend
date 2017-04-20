import React, { Component } from 'react'
import OverviewMap from '../map/OverviewMap'
import GlobalTemperatureChart from '../charts/GlobalTemperatureChart'
import { hashHistory } from 'react-router'
import { getAllDivelogs } from '../../api/rest'

import diverIcon from '../../images/diver-icon.png'
import locationIcon from '../../images/location-icon.png'
import temperatureIcon from '../../images/temperature-icon.png'
import logbookIcon from '../../images/book-icon.png'


import './HomePage.css'

class HomePage extends Component {

    constructor() {
        super()

        this.state = {
            divelogs: null
        }
    }

    componentDidMount() {
        this.handleAllAsyncCalls()
    }

    /**
    * Function to initiate all initial async calls with a success handler when all async calls are done
    */
    handleAllAsyncCalls = () => {
        getAllDivelogs().then((response) => {
            this.setState(
                {
                    divelogs: response
                }
            )
        })

    }

    createDivelogTable() {
        let diveLogTableRows = []
        let diveLogs = this.state.divelogs

        let lastDivelogs = diveLogs.slice(Math.max(diveLogs.length - 3, 1)).reverse()

        lastDivelogs.forEach((divelog) => {
            diveLogTableRows.push(
                <div className="divelog-row" key={divelog._id}>
                    <h5 className="divelog-location">{divelog.divelogData.location}</h5>
                    <p className="divelog-description">
                        {divelog.divelogData.description}
                    </p>
                </div>
            )
        })

        return diveLogTableRows
    }

    createTemperatureData() {
        let temperatureData = []

        this.state.divelogs.forEach((divelog) => {
            temperatureData.push(divelog.divelogData.depthTemperature)
        })

        return temperatureData
    }

    render() {

        let latestDivelogs = []
        let temperatureData = []

        if (this.state.divelogs) {
            latestDivelogs = this.createDivelogTable()
            temperatureData = this.createTemperatureData()
        }

        return (
            <div className="pure-g main-container">

                <header className="pure-u-1">
                    <h1 className="btn-home" onClick={() => { hashHistory.push('/') }}>ScubaLogs</h1>
                    <h2 className="btn-profile" onClick={() => { hashHistory.push('/users/Bas') }}>My Profile</h2>
                    <h2 className="btn-logdive" onClick={() => { hashHistory.push('/divelogs/Bas/new') }}>Log Dive</h2>
                </header>

                <div className="pure-u-1 map">
                    <OverviewMap />
                </div>

                <div className="pure-u-1 pure-u-md-2-3 homepage-container">
                    <div className="content-box pure-u-1 stat-container">
                        <div className="statistics-divider">
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

                    </div>

                    <div className="content-box">
                        <div className="pure-u-1 pure-u-md-1-3">
                            <h3>Top Contributors</h3>
                        </div>
                        <div className="pure-u-1 pure-u-md-2-3">
                            <h3>Latest Logs</h3>
                            {latestDivelogs}
                        </div>
                    </div>

                    <div className="content-box home-chart">
                        <h3>Global Temperature</h3>
                        <GlobalTemperatureChart data={temperatureData} />
                    </div>

                </div>

            </div>
        )
    }

}

export default HomePage