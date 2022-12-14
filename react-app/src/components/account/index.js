import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts, deleteAccount } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';
import { getAllTransactions } from '../../store/transaction';
import { getAllJointAccounts, deleteJointAccount } from '../../store/jointAccount';
import { useHistory, Link } from 'react-router-dom';
import { Modal } from '../../context/Modal'

import AddJointFundForm from '../accountModal/addJointFundModal';
import EditJointAccountForm from '../accountModal/editJointAccountModal';
import EditAccountForm from '../accountModal/editAccountModal';
import AddFundForm from '../accountModal/addFundModal';
import CreateAccountForm from '../accountModal/createAccountModal';
import CreateJointAccountForm from '../accountModal/createJointAccountModal';
import LogoutButton from '../auth/LogoutButton'
import './index.css'
import logo from '../../Images/logo.png'





const AccountComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [showAddFund, setShowAddFund] = useState(false)
    const [showAddJointFund, setShowAddJointFund] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [showCreateJoint, setShowCreateJoint] = useState(false)
    const [accountId, setAccountId] = useState()
    const [account, setAccount] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [showEditJoint, setShowEditJoint] = useState(false)


    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const accountState = useSelector(state => state.Accounts.accounts)
    const jointAccounts = useSelector(state => Object.values(state.jointAccount.jointAccounts))


    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getAllJointAccounts())
        dispatch(getWallet())
        // dispatch(getAllTransactions())
    }, [dispatch])

    let accounts = Object.values(accountState)

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



    const addFunds = (id) => {
        setShowAddFund(true)
        setAccountId(id)
    }

    const addJointFunds = (id) => {
        setShowAddJointFund(true)
        setAccountId(id)
    }

    const toDelete = async (id) => {
        const toBeDeleted = accountState[id]
        dispatch(updateWallet({ total_fund: wallet.totalFund + (+toBeDeleted.balance) }))
        await dispatch(deleteAccount(id))
        await dispatch(getAllAccounts())
        await dispatch(getWallet())
    }

    const toDeleteJoint = async (id) => {
        const toBeDeleted = jointAccounts.find(account=>account.id===id)
        dispatch(updateWallet({ total_fund: wallet.totalFund + (+toBeDeleted.balance) }))
        await dispatch(deleteJointAccount(id))
        await dispatch(getAllJointAccounts())
        await dispatch(getWallet())
        console.log('this is toBeDeleted', toBeDeleted)
    }

    const toEdit = async (account) => {
        setShowEdit(true)
        setAccount(account)
    }

    const toEditJoint = async (account) => {
        setShowEditJoint(true)
        setAccount(account)
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
                    <div className='container'>
                        <div className='header'>
                            <button onClick={() => setShowCreate(true)}> Create new Account</button>
                            <button onClick={() => setShowCreateJoint(true)}>Create Joint Account</button>
                        </div>
                        <div className='account-jointAccount'>
                            <div className='account-list'>
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
                                                <div onClick={() => toEdit(account)}>
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
                                            <div>{account.balance.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })
                                            }</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='joint-account-list'>
                                {
                                    jointAccounts.map(account => (
                                        <div className='single-account'>
                                            <div className='account-name'>
                                                <div>
                                                    {account.name}
                                                </div>
                                                <div className='add-delete'>
                                                    <div onClick={() => addJointFunds(account.id)}>
                                                        <i className="fa-solid fa-plus" />
                                                    </div>
                                                    <div onClick={() => toEditJoint(account)}>
                                                        <i className="fa-solid fa-pen-to-square" />
                                                    </div>
                                                    <div onClick={() => toDeleteJoint(account.id)}>
                                                        <i className="fa-solid fa-trash-can" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='underline'>
                                                <div>
                                                    <i className="fa-solid fa-sack-dollar" /> Balance
                                                </div>
                                                <div>{account.balance.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })
                                                }</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {showAddFund && (
                            <Modal onClose={() => setShowAddFund(false)}>
                                <AddFundForm accountId={accountId} setShowAddFund={setShowAddFund} />
                            </Modal>
                        )}
                        {showCreate && (
                            <Modal onClose={() => setShowCreate(false)}>
                                <CreateAccountForm setShowCreate={setShowCreate} accounts={accounts} />
                            </Modal>
                        )}
                        {showEdit && (
                            <Modal onClose={() => setShowEdit(false)}>
                                <EditAccountForm account={account} setShowEdit={setShowEdit} accounts={accounts} />
                            </Modal>
                        )}
                        {showCreateJoint && (
                            <Modal onClose={() => setShowCreateJoint(false)}>
                                <CreateJointAccountForm setShowCreateJoint={setShowCreateJoint} accounts={jointAccounts} />
                            </Modal>
                        )}
                        {showAddJointFund && (
                            <Modal onClose={()=>setShowAddJointFund(false)}>
                                <AddJointFundForm accountId={accountId} setShowAddJointFund={setShowAddJointFund} />
                            </Modal>
                        ) }
                        {showEditJoint && (
                            <Modal onClose={()=>setShowEditJoint(false)}>
                                <EditJointAccountForm account={account} setShowEditJoint={setShowEditJoint}  accounts={jointAccounts} />
                            </Modal>
                        )}
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


export default AccountComp
