

/********************TYPES******************* */

const LOAD_JOINT_ACCOUNTS = 'jointAccounts/LOAD';
const LOAD_ONE_JOINT_ACCOUNT = 'jointAccounts/LOAD_ONE';
const CREATE_JOINT_ACCOUNT = 'jointAccounts/ADD';
const REMOVE_JOINT_ACCOUNT = 'jointAccounts/REMOVE';
const EDIT_JOINT_ACCOUNT = 'jointAccounts/EDIT';
const CLEAR_JOINT_ACCOUNT = 'jointAccounts/CLEAR'


/*******************ACTION CREATORS*********** */

const loadJointAccounts = (jointAccounts) => ({
    type: LOAD_JOINT_ACCOUNTS,
    jointAccounts
})

const loadOneJointAccount = (jointAccount) => ({
    type: LOAD_ONE_JOINT_ACCOUNT,
    jointAccount
})

const addJointAccount = (newJointAccount) => ({
    type: CREATE_JOINT_ACCOUNT,
    newJointAccount
})

const removeJointAccount = (jointAccountId) => ({
    type: REMOVE_JOINT_ACCOUNT,
    jointAccountId
})

const editJointAccount = (jointAccount) => ({
    type: EDIT_JOINT_ACCOUNT,
    jointAccount
})

export const clearJointAccount = () => ({
    type: CLEAR_JOINT_ACCOUNT
})



/*********************THUNKS********************** */


export const getAllJointAccounts = () => async dispatch => {
    const response = await fetch('/api/joint/')

    if (response.ok) {
        const jointAccounts = await response.json();
        dispatch(loadJointAccounts(jointAccounts.jointAccounts))
        return jointAccounts
    }
}


export const getOneJointAccount = (jointAccountId) => async dispatch => {
    const response = await fetch(`api/joint/${jointAccountId}`)

    if (response.ok) {
        const singleJointAccount = await response.json()
        dispatch(loadOneJointAccount(singleJointAccount))
        return singleJointAccount
    }
}

export const createJointAccount = (newJointAccount) => async dispatch => {
    const response = await fetch('/api/joint/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJointAccount)
    })

    if (response.ok) {
        const addedAccount = await response.json();
        dispatch(addJointAccount(addedAccount))
        return addedAccount
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    }
}


export const updateAccount = (jointAccount) => async dispatch => {
    const response = await fetch(`/api/joint/${jointAccount.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jointAccount)
    })

    if (response.ok) {
        const jointAccount = await response.json()
        dispatch(editJointAccount(jointAccount));
        return jointAccount
    }
}

export const deleteAccount = (id) => async dispatch => {
    const response = await fetch(`/api/joint/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const account = await response.json();
        dispatch(removeJointAccount(id));
        return account
    }
}

/************************REDUCER************************** */

const initialState = {
    jointAccounts: {},
    oneJointAccount: {}
}


const jointAccountReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_JOINT_ACCOUNTS:
            newState = { ...state }
            newState.jointAccounts = {}
            action.jointAccounts.forEach(jointAccount => {
                newState.jointAccounts[jointAccount.id] = jointAccount
            });
            return newState

        case LOAD_ONE_JOINT_ACCOUNT:
            newState = { ...state }
            newState.oneJointAccount = { ...action.JointAccount }
            return newState

        case CREATE_JOINT_ACCOUNT:
            newState = { ...state }
            newState.jointAccounts = { ...state.jointAccounts, [action.newJointAccount.id]: action.newJointAccount }
            return newState


        case EDIT_JOINT_ACCOUNT:
            newState = { ...state }
            newState.jointAccounts[action.jointAccount.id]= action.jointAccount
            return newState

        case REMOVE_JOINT_ACCOUNT:
            newState = { ...state }
            delete newState[action.jointAccountId]
            return newState
        case CLEAR_JOINT_ACCOUNT:
            newState = { ...state }
            newState.jointAccounts = {}
            return newState

        default:
            return state
    }
}

export default jointAccountReducer
