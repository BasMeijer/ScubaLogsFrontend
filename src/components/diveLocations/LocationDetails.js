import React, { Component } from 'react'
import OverviewMap from '../map/OverviewMap'
import GlobalTemperatureChart from '../charts/GlobalTemperatureChart'
import DiveNumberChart from '../charts/diveNumberChart'
import LifeNumbersChart from '../charts/LifeNumbersChart'

import { getSingleLocation, getLogsByLocation } from '../../api/rest'
import { hashHistory } from 'react-router'

import './LocationDetails.css'

import diverIcon from '../../images/diver-icon.png'
import locationIcon from '../../images/location-icon.png'
import temperatureIcon from '../../images/temperature-icon.png'
import logbookIcon from '../../images/book-icon.png'
import starIcon from '../../images/star.png'
import fishIcon from '../../images/fish.png'
import plantIcon from '../../images/seaweed.png'
import safetyIcon from '../../images/checked.png'
import visibilityIcon from '../../images/eye.png'

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


    createTemperatureData() {
        let temperatureData = []

        this.state.divelogs.forEach((divelog) => {
            temperatureData.push(divelog.divelogData.depthTemperature)
        })

        return temperatureData
    }

    createDivelogTable() {
        let diveLogTableRows = []
        let diveLogs = this.state.divelogs

        let lastDivelogs = diveLogs.slice(Math.max(diveLogs.length - 3, 1))

        lastDivelogs.forEach((divelog) => {
            diveLogTableRows.push(
                <div className="divelog-row" key={divelog._id}>
                    <h4 className="divelog-username">{divelog.username}</h4>
                    <p className="divelog-description">
                        {divelog.divelogData.description}
                    </p>
                    <div className="divelog-tags">
                        <span className="divelog-tag rating-color">
                            rating: {divelog.divelogData.rating}
                        </span>
                        <span className="divelog-tag fauna-color">
                            life: {divelog.divelogData.fauna}
                        </span>
                        <span className="divelog-tag visibility-color">
                            visibility: {divelog.divelogData.visibility}
                        </span>
                    </div>
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
        let totalVisibility = 0

        diveLogs.forEach((divelog) => {
            totalRating += divelog.divelogData.rating
            totalFlora += divelog.divelogData.flora
            totalFauna += divelog.divelogData.fauna
            totalVisibility += divelog.divelogData.visibility
        })

        return {
            avgRating: Math.round(totalRating / numberOfItems),
            avgFlora: Math.round(totalFlora / numberOfItems),
            avgFauna: Math.round(totalFauna / numberOfItems),
            avgVisibility: Math.round(totalVisibility / numberOfItems)
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

            let temperatureData = this.createTemperatureData()

            return (
                <div className="pure-g main-container">

                    <header className="pure-u-1">
                        <h1 className="btn-home" onClick={() => { hashHistory.push('/') }}>ScubaLogs</h1>
                        <h2 className="btn-profile" onClick={() => { hashHistory.push('/users/Bas') }}>My Profile</h2>
                        <h2 className="btn-logdive" onClick={() => { hashHistory.push('/divelogs/Bas/new') }}>Log Dive</h2>
                    </header>

                    <div className="pure-u-1 map">
                        <OverviewMap
                            center={this.state.diveLocation.location}
                        />
                    </div>

                    <div className="pure-u-1 pure-u-md-2-3 homepage-container">

                        <div className="hightlight-container">

                            <div className="hightlight-item">
                                <h4 className="hightlight-title">Rating</h4>
                                <div className="hightlight-content">
                                    <h5 className="hightlight-number"> {statistics.avgRating}/10</h5>
                                    <img src={starIcon} className="rating-icon" alt="" />
                                </div>
                            </div>
                            <div className="hightlight-item">
                                <h4 className="hightlight-title">Life</h4>
                                <div className="hightlight-content">
                                    <h5 className="hightlight-number"> {statistics.avgFauna}/10</h5>
                                    <img src={fishIcon} className="rating-icon" alt="" />
                                </div>
                            </div>
                            <div className="hightlight-item">
                                <h4 className="hightlight-title">Plants</h4>
                                <div className="hightlight-content">
                                    <h5 className="hightlight-number"> {statistics.avgFlora}/10</h5>
                                    <img src={plantIcon} className="rating-icon" alt="" />
                                </div>
                            </div>
                            <div className="hightlight-item">
                                <h4 className="hightlight-title">Safety</h4>
                                <div className="hightlight-content">
                                    <h5 className="hightlight-number"> Safe</h5>
                                    <img src={safetyIcon} className="rating-icon" alt="" />
                                </div>
                            </div>
                            <div className="hightlight-item">
                                <h4 className="hightlight-title">Visibility</h4>
                                <div className="hightlight-content">
                                    <h5 className="hightlight-number"> {statistics.avgVisibility}m</h5>
                                    <img src={visibilityIcon} className="rating-icon" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="content-box pure-u-1 stat-container">
                            <h3 className="location-name">{this.state.diveLocation.name}</h3>
                            <div className="statistics-divider">
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

                        </div>

                        <div className="content-box home-chart">
                            <h3>Global Temperature</h3>
                            <GlobalTemperatureChart data={temperatureData} />
                        </div>

                        <div className="content-box">

                            <div className="pure-u-1 pure-u-md-2-3">
                                <h3>Latest Logs</h3>
                                {latestDivelogs}
                            </div>
                        </div>

                        <div className="content-box home-chart">
                            <h3>Dives per month</h3>
                            <DiveNumberChart data={[2, 4, 5, 5]} />
                        </div>

                        <div className="content-box home-chart">
                            <h3>Life Statistics Month</h3>
                            <LifeNumbersChart data={[2, 4, 5, 5]} />
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