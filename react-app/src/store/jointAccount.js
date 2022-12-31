

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
        dispatch(loadAccounts(jointAccounts.jointAccounts))
        return jointAccounts
    }
}


export const getOneAccount = (jointAccountId) => async dispatch => {
    const response = await fetch(`api/accounts/${jointAccountId}`)

    if (response.ok) {
        const singleJointAccount = await response.json()
        dispatch(loadOneAccount(singleJointAccount))
        return singleJointAccount
    }
}

export const createAccount = (newAccount) => async dispatch => {
    const response = await fetch('/api/accounts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccount)
    })

    if (response.ok) {
        const addedAccount = await response.json();
        dispatch(addAccount(addedAccount))
        return addedAccount
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    }
}


export const updateAccount = (account) => async dispatch => {
    const response = await fetch(`/api/accounts/${account.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account)
    })

    if (response.ok) {
        const account = await response.json()
        dispatch(editAccount(account));
        return account
    }
}

export const deleteAccount = (id) => async dispatch => {
    const response = await fetch(`/api/accounts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const account = await response.json();
        dispatch(removeAccount(id));
        return account
    }
}

/************************REDUCER************************** */

const initialState = {
    accounts: {},
    oneAccount: {}
}


const accountReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_ACCOUNTS:
            newState = { ...state }
            newState.accounts = {}
            action.accounts.forEach(account => {
                newState.accounts[account.id] = account
            });
            return newState

        case LOAD_ONE_ACCOUNT:
            newState = { ...state }
            newState.oneAccount = { ...action.account }
            return newState
        case CREATE_ACCOUNT:
            newState.accounts = { ...state.accounts,[action.newAccount.id]:action.newAccount }
            return newState

        case EDIT_ACCOUNT:
            newState = { ...state, [action.account.id]: action.account }
            return newState

        case REMOVE_ACCOUNT:
            newState = { ...state }
            delete newState[action.accountId]
            return newState
        case CLEAR_ACCOUNT:
            newState = { ...state }
            newState.accounts = {}
            return newState

        default:
            return state
    }
}

export default accountReducer
