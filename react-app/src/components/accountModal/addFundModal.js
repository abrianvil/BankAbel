
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../store/account';
import { getWallet, updateWallet } from '../../store/wallet';

import { getAllAccounts } from '../../store/account';
import './index.css'

const AddFundForm = ({ accountId, setShowAddFund }) => {
    const dispatch = useDispatch()

    const wallet = useSelector(state => state.wallet.wallet)
    const accounts = useSelector(state => state.Accounts.accounts)
    const toEdit = accounts[accountId]

    const [name] = useState(`${toEdit.name}`)
    const [balance, setBalance] = useState(0.00)


    const submit = async (e) => {
        e.preventDefault()
        if (balance > 0 && balance <= wallet.totalFund) {
            dispatch(updateWallet({ total_fund: wallet.totalFund - balance }))
            const newAccount = {
                id: accountId,
                name,
                balance: (+toEdit.balance) + (+balance)
            }
            const data = await dispatch(updateAccount(newAccount))
            await dispatch(getAllAccounts())
            await dispatch(getWallet())
            if (data.errors) {
                setShowAddFund(true)
            } else setShowAddFund(false)
        } else {
            setShowAddFund(true)
        }
    }


    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Add Funds to your account</h2>
                    </div>
                    <div>
                        <label>Balance</label>
                    </div>
                    <input
                        min={1}
                        type='number'
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder='0.00'
                        name='balance'
                    />
                    <button>Add Funds</button>
                </form>
            </div>
        </div>
    )
}


export default AddFundForm
