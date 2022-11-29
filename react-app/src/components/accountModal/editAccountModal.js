import { useState} from 'react';
import { useDispatch } from 'react-redux';
import {  updateAccount } from '../../store/account';

import { getAllAccounts } from '../../store/account';
import './index.css'


const EditAccountForm = ({account,setShowEdit}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState(account.name)



    const submit = async (e) => {
        e.preventDefault()

        const data = await dispatch(updateAccount({ id: account.id, name, balance: account.balance }))
        await dispatch(getAllAccounts())
        // console.log('this is data from backend', data)
        if(data.errors){
            setShowEdit(true)
        }else setShowEdit(false)

        setName(account.name)
    }


    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Edit Account</h2>
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
                        name='name'
                    />
                    <button>Update Account</button>
                </form>
            </div>
        </div>
    )
}

export default EditAccountForm
