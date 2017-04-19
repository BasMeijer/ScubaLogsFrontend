import React, { Component } from 'react'
import update from 'immutability-helper'
import { createDivelog } from '../../api/rest'
import './DivelogForm.css'

class DivelogForm extends Component {

    constructor() {
        super()

        this.state = {
            error: null,
            date: '',
            username:'',
            divelogData: {
                location: '',
                maxDepth: '',
                avgDepth: '',
                surfaceTemperature: '',
                depthTemperature: '',
                diveTime: '',
                buddy: '',
                description: '',
                rating: '',
                flora: '',
                fauna: '',
                visibility: '',
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }


    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // const value = target.value
        const name = target.name;
        let divelogData = this.state.divelogData

        const newDivelogData = update(divelogData, {
            [name]: { $set: value }
        });

        this.setState({
            divelogData: newDivelogData
        });
    }

    render() {
        return (
                <div className="create-divelog-form-container">
                    <span className="form-title">New Divelog</span>
                    {this.state.error && <div className="error">{this.state.error}</div>}

                    <form className="login-form" onSubmit={this.handleCreateDivelog}>

                        <input className="textfield" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.usernameChangedHandler} />
                        <input className="textfield" type="date" name="date" placeholder="date" value={this.state.date} onChange={this.dateChangedHandler} />
                        

                        <input className="textfield" type="text" name="location" placeholder="location" value={this.state.divelogData.location} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="maxDepth" placeholder="maxDepth" value={this.state.divelogData.maxDepth} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="avgDepth" value="" placeholder="avgDepth" value={this.state.divelogData.avgDepth} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="surfaceTemperature" value="" placeholder="Surface Temp" value={this.state.divelogData.surfaceTemperature} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="depthTemperature" value="" placeholder="Depth Temp" value={this.state.divelogData.depthTemperature} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="diveTime" value="" placeholder="Dive Time" value={this.state.divelogData.diveTime} onChange={this.handleInputChange} />
                        <input className="textfield" type="text" name="buddy" value="" placeholder="Buddy" value={this.state.divelogData.buddy} onChange={this.handleInputChange} />
                        <textarea className="textfield" name="description" value="" placeholder="description" value={this.state.divelogData.description} onChange={this.handleInputChange} />

                        <input className="textfield" type="number" name="rating" value="" placeholder="rating" value={this.state.divelogData.rating} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="flora" value="" placeholder="flora" value={this.state.divelogData.flora} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="fauna" value="" placeholder="fauna" value={this.state.divelogData.fauna} onChange={this.handleInputChange} />
                        <input className="textfield" type="number" name="visibility" value="" placeholder="visibility" value={this.state.divelogData.visibility} onChange={this.handleInputChange} />

                        <input className="form-btn" type="submit" value="Create" />

                    </form>
                </div>
        )
    }

    usernameChangedHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    dateChangedHandler = (e) => {
        this.setState({ date: e.target.value })
    }

    //Handle login form submission
    handleCreateDivelog = (e) => {
        e.preventDefault()

        this.setState({
            error: null
        })

        const newDivelog = {
            username: this.state.username,
            date: this.state.date,
            divelogData: {
                location: this.state.divelogData.location,
                maxDepth: this.state.divelogData.maxDepth,
                avgDepth: this.state.divelogData.avgDepth,
                surfaceTemperature: this.state.divelogData.surfaceTemperature,
                depthTemperature: this.state.divelogData.depthTemperature,
                diveTime: this.state.divelogData.diveTime,
                buddy: this.state.divelogData.buddy,
                description: this.state.divelogData.description,
                rating: this.state.divelogData.rating,
                flora: this.state.divelogData.flora,
                fauna: this.state.divelogData.fauna,
                visibility: this.state.divelogData.visibility
            }
        }

        createDivelog(newDivelog)
            .then(() => {
                console.log('succes!')
            })
            .catch(err => {
                let message
                console.error(err)

                if (err.status === 401) { // login failed
                    message = 'Something went wrong!'
                } else {
                    message = err.message
                }

                this.setState({
                    error: message
                })
            })

        console.log(newDivelog)

    }
}

export default DivelogForm