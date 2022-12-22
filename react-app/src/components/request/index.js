import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getAllAccounts } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';
import { getAllTransactions, createTransaction } from '../../store/transaction';
import { getAllRequests, updateRequest } from '../../store/request';
import CreateRequest from './createRequestModal';

import { Modal } from '../../context/Modal'
import LogoutButton from '../auth/LogoutButton'
import './index.css'
import logo from '../../Images/logo.png'






const RequestComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [usersObj, setUsersObj] = useState({})
    const [showReq, setShowReq] = useState(false)

    // console.log('==================', showReq)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            const res = {}
            responseData.users.forEach(element => {
                res[element.id] = element
            });
            setUsersObj(res);
        }
        fetchData();
    }, []);

    const user = useSelector(state => state.session.user)
    const requests = useSelector(state => Object.values(state.request.requests)).reverse()
    const wallet = useSelector(state => state.wallet.wallet)

    const incomingReq = requests.filter(request => request.receiver === user.id && request.status === 'pending').reverse()
    const outGoingReq = requests.filter(request => request.sender.id === user.id && request.status === 'pending').reverse()
    incomingReq.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    outGoingReq.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // console.log('this is request', requests)
    // console.log('this is usersObj', usersObj)


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

    const acceptReq = async (request) => {
        if (request.amount <= wallet.totalFund) {
            console.log(request)
            const newTransaction = {
                amount: request.amount,
                status: 'pending',
                receiver_id: request['sender'].id
            }
            const data = await dispatch(createTransaction(newTransaction))
            if (!data.errors) {
                request.status = 'complete'
                request.sender = request['sender'].id
                request['receiver_id'] = request.receiver
                request['sender_id'] = request.sender

                await dispatch(updateWallet({ total_fund: wallet.totalFund - request.amount }))


                console.log('req after status update', request)

                await dispatch(updateRequest(request))
                // await dispatch(getAllRequests())

            } else {
                console.log('there was an error from trans response')
            }
            // dispatch()

        }


    }

    return (
        <div className='main-page'>
            <div className='navigation-bar'>

                <div className='user-card' onClick={clickUser}>
                    <div className='image'>
                        <img src={user.picture} alt={user.id}
                            onError={e => { e.currentTarget.src = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"; }}
                        />
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
                    <div className='inside-container'>
                        <div className='req-header'>
                            <button onClick={() => setShowReq(true)}>Send Request</button>
                        </div>
                        {showReq && (
                            <Modal onClose={() => setShowReq(false)}>
                                <CreateRequest setShowReq={setShowReq} />
                            </Modal>
                        )}
                        <div className='inner-box'>
                            <div className='req'>
                                <div className='out-req-container'>
                                    <label> OUTGOING PENDING REQUEST:</label>
                                    {
                                        outGoingReq.map(request => (
                                            <div className='single-request' key={request.id}>
                                                <div>
                                                    You requested {request.amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })} from {usersObj[request['receiver']]?.username}
                                                </div>

                                                <div className='req-time-status'>
                                                    <small id='pending'>{request.status}</small>
                                                    <small>{request.createdAt.slice(0, 17)}</small>
                                                </div>

                                            </div>

                                        ))
                                    }
                                </div>
                                <div className='in-req-container'>
                                    <label>INCOMING PENDING REQUEST:</label>
                                    {incomingReq.map(request => (
                                        <div className='single-request' key={request.id}>
                                            {request.status === 'pending' && (
                                                <div onClick={() => acceptReq(request)} className='req2'>
                                                    <div className='check'>
                                                        <i className="fa-regular fa-square-check" />
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                {request['sender']?.username} requested {request.amount.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })} from You
                                            </div>
                                            <div className='req-time-status'>
                                                <small id='pending'>{request.status}</small>
                                                <small>{request.createdAt.slice(0, 17)}</small>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
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

        </div >
    )
}


export default RequestComp
