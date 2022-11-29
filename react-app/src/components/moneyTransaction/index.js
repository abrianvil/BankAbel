import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../../store/account";
import { createTransaction } from "../../store/transaction";
import { useHistory } from "react-router-dom";

import LogoutButton from "../auth/LogoutButton";
import './index.css'


const MoneyTransaction = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    const accounts = useSelector(state => Object.values(state.Accounts.accounts))

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllAccounts())
        // dispatch(getWallet())
    }, [dispatch])

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

    const sendMoney = () => {
        history.push('/transaction')
    }

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

                    <div className='sendMoney' onClick={sendMoney}>
                        <i className="fa-solid fa-money-bill-transfer" /> Send Money
                    </div>
                </div>

                <LogoutButton />
            </div>

            <div className='content-footer'>
                <div className='content-display-box'>
                    <div className='container'>
                        {accounts.map(account => (
                            <div className='single-account'>
                                <div className='account-name'>
                                    <div>
                                        {account.name}
                                    </div>
                                    <div className='add-delete'>
                                        <div>
                                            <i className="fa-sharp fa-solid fa-money-bill-transfer"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='underline'>
                                    <div>
                                        <i className="fa-solid fa-sack-dollar" /> Balance
                                    </div>
                                    <div>${account.balance}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='footer'>
                    <div className='logo'></div>
                </div>
            </div>

        </div>
    )
}

export default MoneyTransaction
