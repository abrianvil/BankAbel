import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../store/account';

import { getAllAccounts } from '../../store/account';
import './index.css'


const EditAccountForm = ({ account, setShowEdit }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState(account.name)
    const [nameErr, setNameErr] = useState('')
    const [renderErr, setRenderErr] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        if (!nameErr) {
            const data = await dispatch(updateAccount({ id: account.id, name, balance: account.balance }))
            await dispatch(getAllAccounts())
            // if (data.errors) {
            setShowEdit(false)
        } else {
            setShowEdit(true)
        }
        setName(account.name)
    }

    useEffect(() => {
        if (!name.length) {
            setNameErr('A name is required')
        } else if (name.length < 2) {
            setNameErr('Name must be 2 or more characters')
        } else if (name.length > 20) {
            setNameErr('Name must be 20 or less characters')
        }else {
            setNameErr('')
        }
    }, [name])


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

export default EditAccountForm
