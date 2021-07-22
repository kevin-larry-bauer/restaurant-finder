import store from '../store/index'

export const ApiUrl = (endPoint) => {
    let url ='' 
    if(endPoint) url = url + endPoint

    return url
}

export const makeHeader = (reqBody, reqMethod) => {
    let req = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(store.state.AuthToken) {
        req.headers['Authorization'] = 'Bearer ' + store.state.AuthToken
    }

    if(reqBody) req.body = JSON.stringify(reqBody)
    if(reqMethod) req.method = reqMethod

    return req
}

export const handleErr = (err) => {
    // We could expand this to do something fancier in the future, but for now just log the error
    console.error(err)
    return
}

export const APICall = (endpoint, method, body) => {
    return fetch(ApiUrl(endpoint), makeHeader(body, method))
        .then(data => {
            if(data.status > 299) handleErr(data)
            else if(data.status === 204) return data.text()
            return data.json()
        })
        .catch(err => { handleErr(err) })
}


export const getHours = () => APICall('rest_hours.json')