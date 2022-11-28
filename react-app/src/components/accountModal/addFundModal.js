
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../../store/account';
import { updateWallet } from '../../store/wallet';

import { getAllAccounts } from '../../store/account';
import './index.css'

const AddFundForm = ({ accountId, setShowAddFund }) => {
    const dispatch = useDispatch()

    const wallet = useSelector(state => state.wallet.wallet)
    const accounts = useSelector(state => state.Accounts.accounts)
    const toEdit = accounts[accountId]
    console.log('====>', wallet.totalFund)
    const [name, setName] = useState(`${toEdit.name}`)
    const [balance, setBalance] = useState(0.00)


    const submit = async (e) => {
        e.preventDefault()
        if (balance <= wallet.totalFund) {
            dispatch(updateWallet({total_fund: wallet.totalFund-balance}))
            const newAccount = {
                id: accountId,
                name,
                balance:(+toEdit.balance)+(+balance)
            }
            const data = dispatch(updateAccount(newAccount))
            if (data.errors) {
                setShowAddFund(true)
            } else setShowAddFund(false)
        }else console.log('not enough money to do that')

        await dispatch(getAllAccounts())
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
                    <div>
                        <label>Balance</label>
                    </div>
                    <input
                        min={0}
                        type='number'
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder='0.00'
                        name='balance'
                    />
                    <button>Create Account</button>
                </form>
            </div>
        </div>
    )
}


export default AddFundForm
