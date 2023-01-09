import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJointAccount } from '../../store/jointAccount';

import { getAllJointAccounts } from '../../store/jointAccount';
import './index.css'


const CreateJointAccountForm = ({ setShowCreateJoint, accounts }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)


    const [name, setName] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [users, setUsers] = useState([]);
    const [nameErr, setNameErr] = useState('')
    const [receiverError, setReceiverError] = useState('')
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
        if (!nameErr && !receiverError) {
            const data = await dispatch(createJointAccount({ name, balance: 0.00, second_owner_id: receiverId }))
            await dispatch(getAllJointAccounts())
            setShowCreateJoint(false)
        } else {
            setShowCreateJoint(true)
        }
    }


    useEffect(() => {
        if (!name.trim().length) {
            setNameErr('A name is required')
        } else if (accounts.find(account => account.name.trim().toLowerCase() === name.trim().toLowerCase())) {
            setNameErr('Account with that name already exist')
        } else if (name.length < 2) {
            setNameErr('Name must be 2 or more characters')
        } else if (name.length > 20) {
            setNameErr('Name must be 20 or less characters')
        } else {
            setNameErr('')
        }

        if (receiverId <= 0) {
            setReceiverError('Please select a receiver')
        } else {
            setReceiverError('')
        }
    }, [name, receiverId])

    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Your New Account</h2>
                    </div>
                    <div>
                        {renderErr && nameErr ?
                            <label className='renderError'>{nameErr}</label> :
                            <label className='text noRenderError'> Name </label>}
                    </div>
                    <input
                        type='text'
                        className='inp'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Account Name"
                        name='name'
                    />
                    <div>
                        {renderErr && receiverError ? <label className='renderError'>{receiverError}</label> :
                            <label className='text noRenderError'>
                                Select other Owner
                            </label>}
                    </div>
                    <div className='custom-select'>
                        <select
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                        >
                            <option value={0}>Select other Owner</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <button>Create Joint Account</button>
                </form>
            </div>
        </div>
    )
}


export default CreateJointAccountForm
