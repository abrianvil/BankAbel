import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';

import LogoutButton from '../auth/LogoutButton'
import './index.css'





const LandingPage = () => {
    const user = useSelector(state => state.session.user)
    const dispatch=useDispatch()


    useEffect(()=>{
        dispatch(getAllAccounts())
    },[dispatch])

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
                    <div className='wallet'>wallet</div>

                    <div className='accounts'>Accounts</div>
                    <div className='activity'>activity</div>
                </div>

                <LogoutButton />
            </div>

            <div className='content+footer'>
                <div className='content-display-box'>

                </div>

                <div className='footer'>

                </div>
            </div>

        </div>
    )
}


export default LandingPage
