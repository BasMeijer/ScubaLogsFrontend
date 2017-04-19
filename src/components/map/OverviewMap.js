import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { getAllLocations } from '../../api/rest'
import { hashHistory } from 'react-router'

// Styles
import './OverviewMap.css'

class OverviewMap extends Component {

    constructor() {
        super()

        this.state = {
            diveLocations: null
        }
    }

    componentDidMount() {
        this.handleAllAsyncCalls()
    }

    render() {
        let allMarkers
        if (this.state.diveLocations) {
            allMarkers = this.createMarkers(this.state.diveLocations)
        }

        let position = [51.92, 4.44]

        if(this.props.center){
            // console.log('center' , this.props.center)
            position = this.props.center
        }
        // let allMarkers = this.addMarkersToMap()

        return (
            <div className="map-container">
                <Map center={position} zoom={12} zoomControl={false}>
                    <TileLayer
                        accessToken='pk.eyJ1IjoiYmFzbWVpamVyIiwiYSI6ImNpdXA4OXlvbDAwMnYydHBrNXp6MW9nMm8ifQ.YRsgU-MOVsYhYlkVb0R-1Q'
                        url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {allMarkers}

                </Map>
            </div>
        )
    }

    /**
    * Function to initiate all initial async calls with a success handler when all async calls are done
    */
    handleAllAsyncCalls = () => {
        getAllLocations().then((response) => {
            this.setState(
                {
                    diveLocations: response
                }
            )
        })
    }


    createMarkers(diveLocations) {

        let allMarkers = []

        diveLocations.forEach((diveLocation) => {
            let position = [diveLocation.location.lat,diveLocation.location.lng]
            allMarkers.push(
                <Marker
                    position={position}
                    key={diveLocation._id}
                    onClick={() => { this.selectDiveLocation(diveLocation.name) }}
                >
                    <Popup>
                        <div>
                            such tekst
                        </div>
                    </Popup>
                </Marker>
            )
        })

        return allMarkers
    }

    selectDiveLocation(locationName) {
        hashHistory.push('/divelocations/' + locationName)
    }


}

export default OverviewMap