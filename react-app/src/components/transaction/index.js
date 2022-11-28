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

    const [users, setUsers] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            const res = {}
            responseData.users.forEach(element => {
                res[element.id] = element
            });
            delete res[user.id]
            setUsers(res);
        }
        fetchData();
    }, [dispatch]);

    console.log('this is the user list', users)

    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])

    console.log(users[2])

    return (
        <div className='trans'>
            <div id='header'>
                TRANSACTIONS
            </div>
            <div className='transaction-box'>
                {transactions.map(transaction => (
                    <div className='single-trans' key={transaction.id}>
                        <div className='image'>
                            <img src={users[transaction['receiver']].picture} />
                        </div>
                        <div>${transaction.amount}</div>
                        <div>{transaction.createdAt}</div>
                    </div>
                ))}

            </div>
        </div>
    )

}


export default TransactionComp
