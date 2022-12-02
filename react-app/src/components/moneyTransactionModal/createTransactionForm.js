import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../store/transaction';
// import { getAllAccounts } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';

// import { updateAccount } from '../../store/account';
import { createTransaction } from '../../store/transaction';
import './index.css'


const CreateTransaction = ({ setShowTransModal }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)

    const [amount, setAmount] = useState(0)
    //NOTE - TO BE IMPLEMENTED/CHANGE FOR FUTURE FEATURE
    // const [due_date] = useState(new Date().toLocaleDateString('eng-US'))
    const [status] = useState('pending')
    const [receiverId, setReceiverId] = useState(0)
    const [users, setUsers] = useState([]);
    const [amountError, setAmountError] = useState('')
    const [receiverError, setReceiverError] = useState('')
    const [renderErr, setRenderErr] = useState(false);



    useEffect(() => {
        dispatch(getWallet())
    }, [dispatch])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            const res = []
            responseData.users.forEach(element => {
                if (element.id !== user.id) {
                    res.push(element)
                }
            });
            setUsers(res);
        }
        fetchData();
    }, [dispatch]);


    const submit = async (e) => {
        e.preventDefault()
        setRenderErr(true)

        if (!receiverError && !amountError) {
            const newTransaction = {
                amount,
                status,
                receiver_id: +receiverId
            }
            const data = await dispatch(createTransaction(newTransaction))
            await dispatch(getAllTransactions())
            await dispatch(updateWallet({ total_fund: wallet.totalFund - amount }))
            await dispatch(getWallet())

            setShowTransModal(false)

        } else {
            setShowTransModal(true)
        }
    }

    useEffect(() => {
        if (amount <= 0) {
            setAmountError('Transaction of 0 dollars not allowed')
        } else if (amount > wallet.totalFund) {
            setAmountError('Amount exceeds you wallet Funds')
        }else if(wallet.totalFund - amount === 0) {
            setAmountError('Your not allowed to Empty your wallet')
        } else {
            setAmountError('')
        }

        if (receiverId <= 0) {
            setReceiverError('Please select a receiver')
        } else {
            setReceiverError('')
        }

    }, [amount, receiverId])



    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>New Transaction</h2>
                    </div>
                    <div>
                        {renderErr && amountError ? <label className='renderError'>{amountError}</label> :
                            <label className='text noRenderError'>Amount</label>}
                    </div>
                    <input
                        type='number'
                        step={0.01}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={0.00}
                        name='amount'
                    ></input>
                    <div>
                        {renderErr && receiverError ? <label className='renderError'>{receiverError}</label> :
                            <label className='text noRenderError'>
                                Receiver
                            </label>}
                    </div>
                    <div className='custom-select'>
                        <select
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                        >
                            <option value={0}>Select Receiver</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <button>Send Money</button>
                </form>
            </div>
        </div>
    )
}


export default CreateTransaction
