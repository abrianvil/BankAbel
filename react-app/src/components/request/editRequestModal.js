import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequests } from '../../store/request';


import { updateRequest } from '../../store/request';
import './index.css'



const EditRequest = ({ setShowEditReq,request }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)

    const [amount, setAmount] = useState(request.amount)
    //NOTE - TO BE IMPLEMENTED/CHANGE FOR FUTURE FEATURE
    // const [due_date] = useState(new Date().toLocaleDateString('eng-US'))
    const [status] = useState('pending')
    const [receiverId, setReceiverId] = useState(request.receiver)
    const [users, setUsers] = useState([]);
    const [message, setMessage]= useState(request.message)
    const [amountError, setAmountError] = useState('')
    const [receiverError, setReceiverError] = useState('')
    const [messageError, setMessageError]= useState('')
    const [renderErr, setRenderErr] = useState(false);


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

        if (!receiverError && !amountError && !messageError) {
            const newReq = {
                id: request.id,
                amount,
                status,
                receiver_id: +receiverId,
                sender_id:+user.id,
                message
            }
            const data = await dispatch(updateRequest(newReq))
            await dispatch(getAllRequests())

            setShowEditReq(false)

        } else {
            setShowEditReq(true)
        }
    }

    useEffect(() => {
        if (amount <= 0) {
            setAmountError('Transaction of 0 dollars not allowed')
        } else if (amount > wallet.totalFund) {
            setAmountError('Amount exceeds you wallet Funds')
        } else {
            setAmountError('')
        }

        if (receiverId <= 0) {
            setReceiverError('Please select a receiver')
        } else {
            setReceiverError('')
        }

        if(message.trim().length >80){
            setMessageError('Maximum input length exceeded ')
        }else{
            setMessageError('')
        }

    }, [amount, receiverId, message])



    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Edit Request</h2>
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
                            <option value={request.receiver_id}>Select Receiver</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {renderErr && messageError ? <label className='renderError'>{messageError}</label>:
                            <label className='text noRenderError'>
                                Message
                            </label>
                        }
                    </div>
                    <textarea
                    className='text-area'
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    maxLength={85}
                    ></textarea>
                    <button>Update Request</button>
                </form>
            </div>
        </div>
    )
}


export default EditRequest
