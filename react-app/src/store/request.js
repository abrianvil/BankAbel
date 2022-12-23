

/********************TYPES******************* */

const LOAD_REQUESTS = 'requests/LOAD';
const LOAD_ONE_REQUEST = 'requests/LOAD_ONE';
const CREATE_REQUEST = 'requests/ADD';
const REMOVE_REQUEST = 'requests/REMOVE';
const EDIT_REQUEST = 'requests/EDIT';
const CLEAR_REQUEST = 'requests/CLEAR'


/*******************ACTION CREATORS*********** */

const loadRequests = (requests) => ({
    type: LOAD_REQUESTS,
    requests
})

const loadOneRequest = (request) => ({
    type: LOAD_ONE_REQUEST,
    request
})

const addRequest = (newRequest) => ({
    type: CREATE_REQUEST,
    newRequest
})

const removeRequest = (requestId) => ({
    type: REMOVE_REQUEST,
    requestId
})

const editRequest = (request) => ({
    type: EDIT_REQUEST,
    request
})

export const clearRequest = () => ({
    type: CLEAR_REQUEST
})


/*********************THUNKS********************** */

export const getAllRequests = () => async dispatch => {
    const response = await fetch('/api/requests/')

    if (response.ok) {
        const requests = await response.json()
        dispatch(loadRequests(requests.requests))
        return requests
    }
}


export const getOneRequest = (requestId) => async dispatch => {
    const response = await fetch(`/api/requests/${requestId}`)

    if (response.ok) {
        const oneRequest = await response.json()
        dispatch(loadOneRequest(oneRequest))
        return oneRequest
    }
}


export const createRequest = (newRequest) => async dispatch => {
    const response = await fetch('/api/requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
    })
    if (response.ok) {
        const newRequest = await response.json()
        dispatch(addRequest(newRequest))
        return newRequest
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    }
}


export const updateRequest = (request) => async dispatch => {
    const response = await fetch(`/api/requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })

    if (response.ok) {
        const updatedRequest = await response.json()
        dispatch(editRequest(updatedRequest))
        return updateRequest
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    }
}


export const deleteRequest = (id) => async dispatch => {
    const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const request = await response.json()
        dispatch(removeRequest(id))
        return request
    }
}



/************************REDUCER************************** */

const initialState = {
    requests: {},
    oneRequest: {}
}

const requestReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_REQUESTS:
            newState = { ...state }
            newState.requests = {}
            action.requests.forEach(request => {
                newState.requests[request.id] = request
            });
            return newState

        case LOAD_ONE_REQUEST:
            newState = { ...state }
            newState.oneRequest = { ...action.request }
            return newState

        case CREATE_REQUEST:
            newState.requests = { ...state.requests, [action.newRequest.id]: action.newRequest }
            return newState

        case EDIT_REQUEST:
            newState = { ...state } //, [action.request.id]: action.request
            newState.requests[action.request.id] = action.request
            return newState

        case REMOVE_REQUEST:
            newState = { ...state }
            delete newState[action.requestId]
            return newState

        case CLEAR_REQUEST:
            newState = { ...state }
            newState.requests = {}
            return newState

        default:
            return state

    }
}


export default requestReducer
