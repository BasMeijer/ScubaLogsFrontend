import { BASE_URL } from './constants.js'

function handleRestResponse(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
    } else {
        return Promise.resolve(response.json())
            .then(message => {
                const error = new Error(`${message.message} (code ${message.statusCode})`)
                error.status = response.status
                error.statusCode = message.statusCode

                throw error
            })
    }
}

export function getAllLocations() {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    return fetch(`${BASE_URL}/divelocations/`, options)
        .then(handleRestResponse)
        .then((response) => response)
}


export function createDivelog(divelog) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(divelog)
    }

    return fetch(`${BASE_URL}/divelogs`, options)
        .then(handleRestResponse)
        .then(response => response.token)
}

export function getSingleLocation(location_name) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    return fetch(`${BASE_URL}/divelocations/` + location_name, options)
        .then(handleRestResponse)
        .then((response) => response)
}

export function getLogsByLocation(location_name) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    return fetch(`${BASE_URL}/divelogs/divelocations/` + location_name, options)
        .then(handleRestResponse)
        .then((response) => response)
}