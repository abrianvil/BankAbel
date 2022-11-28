import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import './index.css'



const WalletComp = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)

    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])

    return (
        <div>
            <div className='info-col'>
                <div>
                    <label>
                        YOUR INFO
                        <div className='user-info'>
                            <div>{user.email}</div>
                            <div>{user.username}</div>
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        FUNDS
                        <div className='funds'>
                            <div className='underline'>
                                <div>
                                    <i className="fa-solid fa-sack-dollar" /> Balance
                                </div>
                                <div>${wallet.totalFund}</div>
                            </div>

                        </div>
                    </label>
                </div>
            </div>

            <div className='pending-trans'>

            </div>
        </div>
    )


}


export default WalletComp
