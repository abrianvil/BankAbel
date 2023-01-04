import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllJointAccounts, updateJointAccount } from '../../store/jointAccount';


import './index.css'


const EditJointAccountForm = ({ account, setShowEditJoint, accounts }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState(account.name)
    const [nameErr, setNameErr] = useState('')
    const [renderErr, setRenderErr] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        if (!nameErr) {
            const data = await dispatch(updateJointAccount(
                {
                    id: account.id,
                    name,
                    balance: account.balance,
                    first_owner_id: account['owner'].id,
                    second_owner_id:account.secondUser
                }
            ))
            await dispatch(getAllJointAccounts())

            setShowEditJoint(false)
        } else {
            setShowEditJoint(true)
        }
    }

    useEffect(() => {
        if (!name.trim().length) {
            setNameErr('A name is required')
        } else if (accounts.find(account => account.name.toLowerCase() === name.toLowerCase())) {
            setNameErr('Account with that name already exist')
        } else if (name.length < 2) {
            setNameErr('Name must be 2 or more characters')
        } else if (name.length > 20) {
            setNameErr('Name must be 20 or less characters')
        } else {
            setNameErr('')
        }
    }, [name])

    console.log('this is name Error', nameErr)

    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Edit Account</h2>
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
                        name='name'
                    />
                    <button>Update Account</button>
                </form>
            </div>
        </div>
    )
}

export default EditJointAccountForm
