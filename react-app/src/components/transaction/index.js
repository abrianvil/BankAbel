import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import LogoutButton from '../auth/LogoutButton';
import './index.css'
import { useHistory } from 'react-router-dom';




const TransactionComp = () => {
    const dispatch = useDispatch()
    const history=useHistory()

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
    }, []);

    const clickUser=()=>{
        history.push('/dashboard')
    }
    const clickWallet = () => {
        history.push('/wallet')
    }

    const clickAccount = () => {
        history.push('/account')
    }

    const clickActivity = () => {
        history.push('/activity')
    }

    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])

    console.log(users[2])

    return (

        <div className='main-page'>
            <div className='navigation-bar'>

            <div className='user-card' onClick={clickUser}>
                    <div className='image' >
                        <img src={user.picture} alt={user.id} />
                    </div>
                    <div>{user.firstName} {user.lastName}</div>
                </div>

                <div className='components'>
                    <div className='wallet' onClick={clickWallet}>
                        <i className="fa-solid fa-wallet" /> Wallet
                    </div>

                    <div className='accounts' onClick={clickAccount}>
                        <i className="fa-solid fa-money-check-dollar" /> Accounts
                    </div>

                    <div className='activity' onClick={clickActivity}>
                        <i className="fa-solid fa-clock-rotate-left" /> Activity
                    </div>
                </div>

                <LogoutButton />
            </div>

            <div className='content-footer'>
                <div className='content-display-box'>
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
                </div>

                <div className='footer'>
                    <div className='logo'></div>
                    {/* <div>this is for abel</div> */}
                </div>
            </div>

        </div>


    )

}


export default TransactionComp
