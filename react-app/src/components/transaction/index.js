import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import { getAllRequests } from '../../store/request';
import LogoutButton from '../auth/LogoutButton';
import './index.css'
import { useHistory, Link } from 'react-router-dom';
import logo from '../../Images/logo.png'




const TransactionComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const transactions = (useSelector(state => Object.values(state.transaction.transactions))).reverse()
    const requests = (useSelector(state => Object.values(state.request.requests))).reverse()
    const [users, setUsers] = useState({});

    transactions.forEach(transaction => transaction['isTransaction'] = true)
    requests.forEach(request => request['isTransaction'] = false)
    let transactionRequest=[...transactions, ...requests]
    transactionRequest.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())


    // console.log("this is transactions", transactionRequest)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            const res = {}
            responseData.users.forEach(element => {
                res[element.id] = element
            });
            setUsers(res);
        }
        fetchData();
    }, []);

    const clickUser = () => {
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

    const clickRequest = () => {
        history.push('/request')
    }


    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
        dispatch(getAllRequests())
    }, [dispatch])


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

                    <div className='wallet' onClick={clickRequest}>
                        <i className="fa-solid fa-hand-holding-dollar" />  Request
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
                            {transactionRequest.map(transaction => (
                                <div className='single-trans' key={transaction.updatedAt}>
                                    {transaction.isTransaction && (
                                        <div className='image'>
                                            <img src={users[transaction['receiver']]?.picture} alt={transaction.id} />
                                        </div>)
                                    }
                                    {+users[transaction['receiver']]?.id === user.id ? (
                                        transaction.isTransaction ? (
                                            <div>received {transaction.amount.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })
                                            }</div>
                                        ) :

                                            (
                                                <>
                                                    <div className='image'>
                                                        <img src={transaction['sender'].picture} alt={transaction.id} />
                                                    </div>
                                                    <div> Requested {transaction.amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })
                                                    }</div>
                                                </>
                                            )


                                    ) :
                                        (
                                            transaction.isTransaction ? (
                                                <div>Was sent {transaction.amount.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })
                                                }</div>
                                            ) :
                                                (
                                                    <>
                                                        <div className='image'>
                                                            <img src={users[transaction['receiver']]?.picture} alt={transaction.id} />
                                                        </div>
                                                        <div> Was sent a Requested of {transaction.amount.toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        })
                                                        }</div>
                                                    </>
                                                )
                                        )
                                    }
                                    <div>{transaction.createdAt.slice(0, 17)}</div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <Link
                        className='contact-button'
                        to={{
                            pathname:
                                'https://www.linkedin.com/in/abel-brianvil-ba4320170/',
                        }}
                        target='_blank'
                    >
                        <div className='icon'>
                            <i className='fa-brands fa-linkedin'></i>
                        </div>
                    </Link>
                    <div className='logo-div'>
                        <img src={logo} alt='logo' />
                    </div>

                    <Link
                        className='contact-button'
                        to={{ pathname: 'https://github.com/abrianvil' }}
                        target='_blank'
                    >
                        <div className='icon'>
                            <i className='fa-brands fa-square-github' />
                        </div>
                    </Link>

                </div>
            </div>

        </div>


    )

}


export default TransactionComp
