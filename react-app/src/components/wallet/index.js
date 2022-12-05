import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getAllAccounts } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';
import { getAllTransactions, deleteTransaction, updateTransaction } from '../../store/transaction';
import CreateTransaction from '../moneyTransactionModal/createTransactionForm';
import EditTransaction from '../moneyTransactionModal/editTransactionForm';
import LogoutButton from '../auth/LogoutButton';
import './index.css'
import logo from '../../Images/logo.png'




const WalletComp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [users, setUsers] = useState([]);
    const [showTransModal, setShowTransModal] = useState(false)
    const [showEditTransaction, setShowEditTransaction] = useState(false)
    const [toEdit, setToEdit] = useState({})


    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const transactions = useSelector(state => Object.values(state.transaction.transactions))

    const incomingTrans = transactions.filter(transaction => transaction.receiver === user.id && transaction.status === 'pending').reverse()
    const outGoingTransactions = transactions.filter(transaction => transaction.sender.id === user.id && transaction.status === 'pending').reverse()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            const res = {}
            responseData.users.forEach(element => {
                res[element.id] = element
            });
            delete res[user.id]
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

    const editTrans = (transaction) => {
        setToEdit(transaction)
        setShowEditTransaction(true)
    }

    const completeTransaction = async (transaction) => {
        transaction.receiver_id = transaction.receiver
        transaction.status = 'Complete'
        await dispatch(updateTransaction(transaction))
        await dispatch(updateWallet({ total_fund: wallet.totalFund + transaction.amount }))
    }

    const deleteTrans = async (transaction) => {
        await dispatch(deleteTransaction(transaction.id))
        await dispatch(updateWallet({ total_fund: wallet.totalFund + transaction.amount }))
        await dispatch(getWallet())
        await dispatch(getAllTransactions())
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

                    <div className='activity' onClick={() => setShowTransModal(true)}>
                        <i className="fa-sharp fa-solid fa-money-bill-transfer" />
                        Create a transaction
                    </div>

                    {showTransModal && (
                        <Modal onClose={() => setShowTransModal(false)}>
                            <CreateTransaction wallet={wallet} setShowTransModal={setShowTransModal} />
                        </Modal>
                    )}
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
                                            <div>${(wallet.totalFund)?.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='pending-trans'>
                            {incomingTrans.length > 0 && <label>INCOMING PENDING TRANSACTIONS</label>}
                            {incomingTrans.length > 0 ?
                                (
                                    incomingTrans.map(x => (
                                        <div className='incoming-trans' key={x.id}>
                                            <div className='accept'>
                                                <div>From: {x['sender'].username}</div>
                                                <div className='check' onClick={() => completeTransaction(x)}>
                                                    <i className="fa-regular fa-square-check" />
                                                </div>
                                            </div>
                                            <div className='underline'>
                                                <div>${x.amount.toFixed(2)}</div>
                                                <div>{x.createdAt.slice(0, 17)}</div>
                                            </div>
                                        </div>
                                    ))
                                ) :
                                (
                                    <>
                                        <label>INCOMING PENDING TRANSACTIONS</label>
                                        <div className='no-pending'>
                                            <div> There are no pending transactions</div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className='outgoing'>
                            <label>OUTGOING PENDING TRANSACTIONS</label>
                            {outGoingTransactions.length > 0 ? (outGoingTransactions.map(transaction => (
                                <div className="single-account" key={transaction.id}>
                                    <div className="account-name">
                                        <div> {users[transaction['receiver']]?.username}</div>
                                        <div className="add-delete">
                                            <div onClick={() => editTrans(transaction)}>
                                                <i className="fa-solid fa-pen-to-square" />
                                            </div>
                                            <div onClick={() => deleteTrans(transaction)}>
                                                <i className="fa-solid fa-rectangle-xmark" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="underline">
                                        <div>${transaction.amount.toFixed(2)}</div>
                                        <div>{transaction.createdAt.slice(0, 17)}</div>
                                    </div>
                                </div>
                            ))) :
                                <>

                                    <div className='no-pending'>
                                        <div> There are no pending transactions</div>
                                    </div>
                                </>
                            }
                        </div>
                        {showEditTransaction && (
                            <Modal onClose={() => setShowEditTransaction(false)}>
                                <EditTransaction transaction={toEdit} setShowEditTransaction={setShowEditTransaction} />
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


export default WalletComp
