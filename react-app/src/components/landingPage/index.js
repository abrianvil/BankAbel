import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';

import LogoutButton from '../auth/LogoutButton'
import './index.css'
import {  useHistory } from 'react-router-dom';





const LandingPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

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

    return (
        <div className='main-page'>
            <div className='navigation-bar'>

                <div className='user-card' onClick={clickUser}>
                    <div className='image'>
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

                </div>

                <div className='footer'>
                    <div className='logo'></div>
                </div>
            </div>

        </div>
    )
}


export default LandingPage
