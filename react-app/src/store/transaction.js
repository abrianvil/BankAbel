

/********************TYPES******************* */

const LOAD_TRANSACTIONS = 'transactions/LOAD';
const LOAD_ONE_TRANSACTION = 'transactions/LOAD_ONE';
const CREATE_TRANSACTION = 'transactions/ADD';
const REMOVE_TRANSACTION = 'transactions/REMOVE';
const EDIT_TRANSACTION = 'transactions/EDIT';
const CLEAR_TRANSACTION = 'transactions/CLEAR'


/*******************ACTION CREATORS*********** */

const loadTransactions = (transactions) => ({
    type: LOAD_TRANSACTIONS,
    transactions
})

const loadOneTransaction = (transaction) => ({
    type: LOAD_ONE_TRANSACTION,
    transaction
})

const addTransaction = (newTransaction) => ({
    type: CREATE_TRANSACTION,
    newTransaction
})

const removeTransaction = (transactionId) => ({
    type: REMOVE_TRANSACTION,
    transactionId
})

const editTransaction = (transaction) => ({
    type: EDIT_TRANSACTION,
    transaction
})

export const clearTransaction = () => ({
    type: CLEAR_TRANSACTION
})


/*********************THUNKS********************** */

export const getAllTransactions = () => async dispatch => {
    const response = await fetch('/api/transactions/')

    if (response.ok) {
        const transactions = await response.json()
        dispatch(loadTransactions(transactions.transactions))
        return transactions
    }
}


export const getOneTransaction = (transactionId) => async dispatch => {
    const response = await fetch(`/api/transactions/${transactionId}`)

    if (response.ok) {
        const singleTransaction = await response.json()
        dispatch(loadOneTransaction(singleTransaction))
        return singleTransaction
    }
}

export const createTransaction = (newTransaction) => async dispatch => {
    const response = await fetch('/api/transactions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
    })

    if (response.ok) {
        const newTransaction = await response.json()
        dispatch(addTransaction(newTransaction))
        return newTransaction
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    }
}

export const updateTransaction = (transaction) => async dispatch => {
    const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    })

    if (response.ok) {
        const updatedTransaction = await response.json()
        dispatch(editTransaction(updatedTransaction))
        return updatedTransaction
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }

    } else {
        console.log('response in update trans. thunk',response)
    }

}

export const deleteTransaction = (id) => async dispatch => {
    const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const transaction = await response.json();
        dispatch(removeTransaction(id))
        return transaction
    }
}


/************************REDUCER************************** */

const initialState = {
    transactions: {},
    oneTransaction: {}
}

const transactionReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_TRANSACTIONS:
            newState = { ...state }
            newState.transactions = {}
            action.transactions.forEach(transaction => {
                newState.transactions[transaction.id] = transaction
            });
            return newState

        case LOAD_ONE_TRANSACTION:
            newState = { ...state }
            newState.oneTransaction = { ...action.transaction }
            return newState

        case CREATE_TRANSACTION:
            newState.transactions = { ...state.transactions, [action.newTransaction.id]: action.newTransaction }
            return newState

        case EDIT_TRANSACTION:
            newState = { ...state, [action.transaction.id]: action.transaction }
            return newState

        case REMOVE_TRANSACTION:
            newState = { ...state }
            delete newState[action.transactionId]
            return newState
        case CLEAR_TRANSACTION:
            newState = { ...state }
            newState.transactions = {}
            return newState

        default:
            return state;
    }
}



export default transactionReducer
