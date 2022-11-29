import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts, deleteAccount } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal'

import AddFundForm from '../accountModal/addFundModal';
import LogoutButton from '../auth/LogoutButton'
import './index.css'
import CreateAccountForm from '../accountModal/createAccountModal';






const AccountComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [showAddFund, setShowAddFund] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [accountId, setAccountId] = useState()


    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const accountState = useSelector(state => state.Accounts.accounts)


    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getWallet())
        dispatch(getAllTransactions())
    }, [dispatch])

    let accounts = []
    if (accountState) {
        accounts = Object.values(accountState)
    } else return null



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




    const addFunds = (id) => {
        setShowAddFund(true)
        setAccountId(id)
    }

    const toDelete = async (id) => {
        const toEdit = accountState[id]
        dispatch(updateWallet({ total_fund: wallet.totalFund + (+toEdit.balance) }))
        await dispatch(deleteAccount(id))
        await dispatch(getAllAccounts())
        await dispatch(getWallet())
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
                </div>

                <LogoutButton />
            </div>

            <div className='content-footer'>
                <div className='content-display-box'>
                    <div className='container'>
                        <div className='header'>
                            <button onClick={() => setShowCreate(true)}> Create new Account</button>
                        </div>
                        {accounts.map(account => (
                            <div className='single-account'>
                                <div className='account-name'>
                                    <div>
                                        {account.name}
                                    </div>
                                    <div className='add-delete'>
                                        <div onClick={() => addFunds(account.id)}>
                                            <i className="fa-solid fa-plus" />
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-pen-to-square" />
                                        </div>
                                        <div onClick={() => toDelete(account.id)}>
                                            <i className="fa-solid fa-trash-can" />
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
                        {showAddFund && (
                            <Modal onClose={() => setShowAddFund(false)}>
                                <AddFundForm accountId={accountId} setShowAddFund={setShowAddFund} />
                            </Modal>
                        )}
                        {showCreate && (
                            <Modal onClose={() => setShowCreate(false)}>
                                <CreateAccountForm setShowCreate={setShowCreate} />
                            </Modal>
                        )}
                    </div>
                </div>

                <div className='footer'>
                    <div className='logo'></div>

                </div>
            </div>

        </div>



    )
}


export default AccountComp
