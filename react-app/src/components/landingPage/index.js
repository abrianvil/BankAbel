import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';

import LogoutButton from '../auth/LogoutButton'
import './index.css'
import WalletComp from '../wallet';
import TransactionComp from '../transaction';





const LandingPage = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)


    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])

    return (
        <div className='main-page'>
            <div className='navigation-bar'>

                <div className='user-card'>
                    <div className='image'>
                        <img src={user.picture} alt={user.id} />
                    </div>
                    <div>{user.firstName} {user.lastName}</div>
                </div>

                <div className='components'>
                    <div className='wallet'>
                        <i className="fa-solid fa-wallet" /> Wallet
                    </div>

                    <div className='accounts'>
                        <i className="fa-solid fa-money-check-dollar" /> Accounts
                    </div>

                    <div className='activity'>
                        <i className="fa-solid fa-clock-rotate-left" /> Activity
                    </div>
                </div>

                <LogoutButton />
            </div>

            <div className='content-footer'>
                <div className='content-display-box'>
                    <WalletComp/>
                    <TransactionComp />
                </div>

                <div className='footer'>
                    <div className='logo'></div>
                    {/* <div>this is for abel</div> */}
                </div>
            </div>

        </div>
    )
}


export default LandingPage
