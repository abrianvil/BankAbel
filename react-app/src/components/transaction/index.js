import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import './index.css'




const TransactionComp = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const transactions = useSelector(state => Object.values(state.transaction.transactions))

    console.log('this is transactions', transactions)

    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])


    return (
        <div className='transaction-box'>
            {transactions.map(transaction => (
                <div key={transaction.id}>
                    
                </div>
            ))}

        </div>
    )

}


export default TransactionComp
