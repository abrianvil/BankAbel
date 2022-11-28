

/********************TYPES******************* */

const LOAD_ACCOUNTS = 'accounts/LOAD';
const LOAD_ONE_ACCOUNT = 'accounts/LOAD_ONE';
const CREATE_ACCOUNT = 'accounts/ADD';
const REMOVE_ACCOUNT = 'accounts/REMOVE';
const EDIT_ACCOUNT = 'accounts/EDIT';
const CLEAR_ACCOUNT = 'accounts/CLEAR'


/*******************ACTION CREATORS*********** */

const loadAccounts = (accounts) => ({
    type: LOAD_ACCOUNTS,
    accounts
})

const loadOneAccount = (account) => ({
    type: LOAD_ONE_ACCOUNT,
    account
})

const addAccount = (newAccount) => ({
    type: CREATE_ACCOUNT,
    newAccount
})

const removeAccount = (accountId) => ({
    type: REMOVE_ACCOUNT,
    accountId
})

const editAccount = (account) => ({
    type: EDIT_ACCOUNT,
    account
})

export const clearAccount = () => ({
    type: CLEAR_ACCOUNT
})


/*********************THUNKS********************** */


export const getAllAccounts = () => async dispatch => {
    const response = await fetch('/api/accounts/')

    if (response.ok) {
        const accounts = await response.json();
        dispatch(loadAccounts(accounts.accounts))
        return accounts
    }
}


export const getOneAccount = (accountId) => async dispatch => {
    const response = await fetch(`api/accounts/${accountId}`)

    if (response.ok) {
        const singleAccount = await response.json()
        dispatch(loadOneAccount(singleAccount))
        return singleAccount
    }
}

export const createAccount = (newAccount) => async dispatch => {
    const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccount)
    })

    if (response.ok) {
        const addedAccount = await response.json();
        dispatch(addAccount(addedAccount))
        return addedAccount
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
            newState = { ...state.accounts, [action.newAccount.id]: action.newAccount }
            return newState

        case EDIT_ACCOUNT:
            newState = { ...state, [action.account.id]: action.account }
            return newState

        case REMOVE_ACCOUNT:
            newState = { ...state }
            delete newState[action.accountId]

        case CLEAR_ACCOUNT:
            newState = { ...state }
            newState.accounts = {}
            return newState

        default:
            return state
    }
}

export default accountReducer
