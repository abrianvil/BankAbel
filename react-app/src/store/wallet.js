

/********************TYPES******************* */

const LOAD_WALLET = 'wallet/LOAD';
const EDIT_WALLET = 'wallet/EDIT';



const loadWallet = (wallet) => ({
    type: LOAD_WALLET,
    wallet
})


const editWallet = (wallet) => ({
    type: EDIT_WALLET,
    wallet
})



/*********************THUNKS********************** */


export const getWallet = () => async dispatch => {
    const response = await fetch('/api/wallets/')

    if (response.ok) {
        const wallet = await response.json();
        dispatch(loadWallet(wallet.wallet))
        return wallet
    }
}


export const updateWallet = (wallet) => async dispatch => {
    const response = await fetch(`/api/wallets/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wallet)
    })

    if (response.ok) {
        const wallet = await response.json()
        dispatch(editWallet(wallet));
        return wallet
    }
}


/************************REDUCER************************** */

const initialState = {
    wallet:{}
}


const walletReducer=(state=initialState, action)=>{
    let newState={}

    switch (action.type) {
        case LOAD_WALLET:
            newState={...state}
            newState.wallet={...action.wallet}
            return newState
        case EDIT_WALLET:
            newState={...state}
            newState.wallet={...action.wallet}
            return newState
        default:
            return state
    }
}


export default walletReducer
