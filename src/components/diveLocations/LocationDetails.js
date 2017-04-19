import React, { Component } from 'react'
import OverviewMap from '../map/OverviewMap'
import GlobalTemperatureChart from '../charts/GlobalTemperatureChart'
import BarExample from '../charts/diveNumberChart'
import { getSingleLocation, getLogsByLocation } from '../../api/rest'
import { hashHistory } from 'react-router'

import './LocationDetails.css'

import diverIcon from '../../images/diver-icon.png'
import locationIcon from '../../images/location-icon.png'
import temperatureIcon from '../../images/temperature-icon.png'
import logbookIcon from '../../images/book-icon.png'

class LocationDetails extends Component {

    constructor() {
        super()

        this.state = {
            diveLocation: null,
            divelogs: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.handleAllAsyncCalls()
    }

    componentDidMount() {
        this.handleAllAsyncCalls()
    }

    /**
    * Function to initiate all initial async calls with a success handler when all async calls are done
    */
    handleAllAsyncCalls = () => {
        getSingleLocation(this.props.params.locationId).then((response) => {
            this.setState(
                {
                    diveLocation: response
                }
            )
        })

        getLogsByLocation(this.props.params.locationId).then((response) => {
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

        let lastDivelogs = diveLogs.slice(Math.max(diveLogs.length - 3, 1))

        lastDivelogs.forEach((divelog) => {
            diveLogTableRows.push(
                <div className="divelog-row" key={divelog._id}>
                    <h4>{divelog.username}</h4>
                    <p>
                        {divelog.divelogData.description}
                    </p>
                </div>
            )
        })

        return diveLogTableRows
    }

    createDivelogStatistics() {
        let diveLogs = this.state.divelogs

        const numberOfItems = this.state.divelogs.length
        let totalRating = 0
        let totalFlora = 0
        let totalFauna = 0

        diveLogs.forEach((divelog) => {
            totalRating += divelog.divelogData.rating
            totalFlora += divelog.divelogData.flora
            totalFauna += divelog.divelogData.fauna
        })

        return {
            avgRating: totalRating / numberOfItems,
            avgFlora: totalFlora / numberOfItems,
            avgFauna: totalFauna / numberOfItems
        }
    }

    render() {
        if (this.state.diveLocation && this.state.divelogs) {

            let lastDiveLog = this.state.divelogs[this.state.divelogs.length - 1]
            let currentTemperature = lastDiveLog.divelogData.depthTemperature

            let diverSet = new Set();

            this.state.divelogs.forEach((divelog) => {
                diverSet.add(divelog.username)
            })

            let latestDivelogs = this.createDivelogTable()

            let statistics = this.createDivelogStatistics()

            return (
                <div className="pure-g main-container">

                    <header className="pure-u-1">
                        <h1 className="btn-home" onClick={() => { hashHistory.push('/') }}>ScubaLogs</h1>
                        <h2 className="btn-profile" onClick={() => { hashHistory.push('/users/Bas') }}>My Profile</h2>
                    </header>

                    <div className="pure-u-1 map">
                        <OverviewMap
                            center={this.state.diveLocation.location}
                        />
                    </div>

                    <div className="pure-u-1 pure-u-md-2-3 homepage-container">

                        <div className="content-box">
                            <h3 className="location-name">{this.state.diveLocation.name}</h3>
                            <h4>Rating: {statistics.avgRating}</h4>
                            <h4>Life: {statistics.avgFauna}</h4>
                            <h4>Plants: {statistics.avgFlora}</h4>
                            <h4>Safety: Safe</h4>
                        </div>

                        <div className="content-box pure-u-1 stat-container">

                            <div className="stat-box">

                                <img src={diverIcon} alt="" className="stat-icon" />

                                <div className="stat-content">
                                    <span className="stat-number">{diverSet.size}</span>
                                    <span className="stat-description">Divers</span>
                                </div>
                            </div>
                            <div className="stat-box">

                                <img src={logbookIcon} alt="" className="stat-icon" />

                                <div className="stat-content">
                                    <span className="stat-number">{this.state.divelogs.length}</span>
                                    <span className="stat-description">Divelogs</span>
                                </div>
                            </div>

                            <div className="stat-box">

                                <img src={temperatureIcon} alt="" className="stat-icon" />

                                <div className="stat-content">
                                    <span className="stat-number">{currentTemperature}°C</span>
                                    <span className="stat-description">Temperature</span>
                                </div>
                            </div>


                        </div>

                        <div className="content-box">
                            <div className="pure-u-1 pure-u-md-1-3">
                                <h3>Statistics</h3>
                                <h5>Life</h5>
                                <h5>Plants</h5>
                                <h5>Rating</h5>
                                <h5>Visibility</h5>

                            </div>
                            <div className="pure-u-1 pure-u-md-2-3">
                                <h3>Latest Logs</h3>
                                {latestDivelogs}
                            </div>
                        </div>

                        <div className="content-box home-chart">
                            <h3>Global Temperature</h3>
                            <GlobalTemperatureChart />
                        </div>

                        <div className="content-box home-chart">
                            <h3>Dives per month</h3>
                            <BarExample />
                        </div>

                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }

    }
}

export default LocationDetails