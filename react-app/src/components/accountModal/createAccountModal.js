import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../store/account';

import { getAllAccounts } from '../../store/account';
import './index.css'


const CreateAccountForm = ({setShowCreate}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const submit = async (e) => {
        e.preventDefault()

        const data = await dispatch(createAccount({ name, balance: 0.00 }))
        await dispatch(getAllAccounts())
        console.log('this is data from backend', data)
        if(data.errors){
            setShowCreate(true)
        }else setShowCreate(false)
    }


    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Your New Account</h2>
                    </div>
                    <div>
                        <label>
                            Name
                        </label>
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
