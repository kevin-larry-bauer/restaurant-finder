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
    if(typeof(err) === 'string') window.location.href = window.location.origin + '/error?statusText=' + err.statusText

    if(err.status === 401) {
        alert("Your session has timed out, please login again to continue")
        return
    }
    if (err.status > 299) {
        const path = err.url.split('/')
        let pathTxt = ''
        for(let i = path.length - 1; i > 0; i--) {
            if(path[i] === 'api') i = -1
            else if (i > 0) pathTxt = path[i] + '/' + pathTxt
        }
        console.error(err)
        localStorage['error'] = JSON.stringify(err)
        window.location.href = window.location.origin + '/error?status=' + err.status + '&url=' + pathTxt + '&statusText=' + err.statusText
    }
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

export const makeFail = () => {
    const p = new Promise( function(resolve, reject) {
        reject({
            status: 456,
            url: 'https://api.byu.edu/lifesciences/api/some/endpoint',
            statusText: "I failed :/"
        })
    })

    return p
}