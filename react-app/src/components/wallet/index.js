import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllAccounts } from '../../store/account';
import { getWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import LogoutButton from '../auth/LogoutButton';
import './index.css'



const WalletComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const transactions = useSelector(state => Object.values(state.transaction.transactions))

    const incomingTrans = transactions.filter(transaction => transaction.receiver === user.id)

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

    const sendMoney=()=>{
        history.push('/transaction')
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

                    <div className='sendMoney' onClick={sendMoney}>
                        <i className="fa-solid fa-money-bill-transfer" /> Send Money
                    </div>
                </div>

                <LogoutButton />
            </div>

            <div className='content-footer'>
                <div className='content-display-box'>

                    <div className='inner-box'>
                        <div className='info-col'>
                            <div>
                                <label>
                                    USERNAME
                                    <div className='user-name'>
                                        <div>{user.username}</div>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                    YOUR INFO
                                    <div className='user-info'>
                                        <div>{user.firstName}</div>
                                        <div>{user.lastName}</div>
                                        <div>{user.email}</div>
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
                            {incomingTrans.length > 0 ?
                                (
                                    incomingTrans.map(x => (
                                        <div className='incoming-trans' key={x.id}>
                                            <div className='underline'>
                                                <div>${x.amount}</div>
                                                <div>{x.createdAt}</div>
                                            </div>
                                        </div>
                                    ))
                                ) :
                                (
                                    <>
                                        <label>INCOMING PENDING TRANSACTIONS</label>
                                        <div className='no-pending'>
                                            <div> There no pending transactions</div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div className='logo'></div>
                </div>
            </div>

        </div>



    )


}


export default WalletComp
