import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../store/transaction';
import { getAllAccounts } from '../../store/account';

import { updateAccount } from '../../store/account';
import { createTransaction } from '../../store/transaction';
import './index.css'


const CreateTransaction = ({ setShowCreate, account }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [amount, setAmount] = useState()
    //NOTE - TO BE IMPLEMENTED/CHANGE FOR FUTURE FEATURE
    // const [due_date] = useState(new Date().toLocaleDateString('eng-US'))
    const [status] = useState('pending')
    const [receiverId, setReceiverId] = useState()
    const [users, setUsers] = useState([]);



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
        console.log('==========>', receiverId)
        if (account.balance >= amount && +receiverId > 0) {
            const newTransaction = {
                amount,
                status,
                receiver_id: +receiverId
            }
            const data = await dispatch(createTransaction(newTransaction))
            await dispatch(getAllTransactions())
            await dispatch(updateAccount({id:account.id, name:account.name, balance:account.balance-(+amount)}))
            await dispatch(getAllAccounts())
            // console.log('this is data from backend', data)
            // if (data.errors) {
            //     setShowCreate(true)
            // } else setShowCreate(false)
        } else{
        console.log('+++++++++++>', 'not enough money for transfer')
        }
    }


    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>New Transaction</h2>
                    </div>
                    <div>
                        <label>Amount</label>
                    </div>
                    <input
                        min={1}
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={0.00}
                        name='amount'
                    ></input>
                    <div>
                        <label>
                            Receiver
                        </label>
                    </div>
                    <select
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                    >
                        <option value={0}>Select Receiver</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                    <button>Send Money</button>
                </form>
            </div>
        </div>
    )
}


export default CreateTransaction
