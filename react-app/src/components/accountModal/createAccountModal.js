import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/account';

import { getAllAccounts } from '../../store/account';
import './index.css'


const CreateAccountForm = ({ setShowCreate, accounts }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [renderErr, setRenderErr] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        if (!nameErr) {
            const data = await dispatch(createAccount({ name, balance: 0.00 }))
            await dispatch(getAllAccounts())
            setShowCreate(false)
        } else {
            setShowCreate(true)
        }
    }


    useEffect(() => {
        if (!name.length) {
            setNameErr('A name is required')
        }else if(accounts.find(account=>account.name.toLowerCase() ===name.toLowerCase())){
            setNameErr('Account with that name already exist')
        } else if (name.length < 2) {
            setNameErr('Name must be 2 or more characters')
        } else if (name.length > 20) {
            setNameErr('Name must be 20 or less characters')
        } else{
            setNameErr('')
        }
    }, [name])

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
                    <button>Create Account</button>
                </form>
            </div>
        </div>
    )
}


export default CreateAccountForm
