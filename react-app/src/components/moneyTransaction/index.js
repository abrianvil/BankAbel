import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../../store/account";
import { createTransaction, getAllTransactions } from "../../store/transaction";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";

import CreateTransaction from "../moneyTransactionModal/createTransactionForm";
import LogoutButton from "../auth/LogoutButton";
import './index.css'


const MoneyTransaction = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [account, setAccount] = useState({})
    const [showTransModal, setShowTransModal] = useState(false)
    const [users, setUsers] = useState([]);

    const user = useSelector(state => state.session.user)
    const accounts = useSelector(state => Object.values(state.Accounts.accounts))
    const transactions = useSelector(state => Object.values(state.transaction.transactions))

    const outGoingTransactions = transactions.filter(transaction => transaction.sender.id === user.id && transaction.status === 'pending')

    // console.log('this is sending transaction', outGoingTransactions)



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



    useEffect(() => {
        dispatch(getAllAccounts())
        dispatch(getAllTransactions())
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

    const clickTrans = (account) => {
        setAccount(account)
        setShowTransModal(true)
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
                    <div className='container trans'>
                        <div>
                            <div className="text">Accounts:</div>
                            {accounts.map(account => (
                                <div className='single-account forMoney'>
                                    <div className='account-name'>
                                        <div>
                                            {account.name}
                                        </div>
                                        <div className='add-delete'>
                                            <div onClick={() => clickTrans(account)}>
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
                        {showTransModal && (
                            <Modal onClose={() => setShowTransModal(false)}>
                                <CreateTransaction account={account} setShowTransModal={setShowTransModal} />
                            </Modal>
                        )}
                        <div>
                            <div className="text">Pending Transactions:</div>
                            {outGoingTransactions.map(transaction => (
                                <div className="single-account forMoney" key={transaction.id}>
                                    <div className="account-name">
                                        <div> {users[transaction['receiver']]?.username}</div>
                                        <div className="add-delete">
                                            <div>
                                                <i className="fa-solid fa-pen-to-square" />
                                            </div>
                                            <div>
                                                <i className="fa-solid fa-rectangle-xmark" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="underline">
                                        <div>${transaction.amount}</div>
                                        <div>{transaction.createdAt.slice(0, 17)}</div>
                                    </div>
                                </div>
                            ))}
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

export default MoneyTransaction
