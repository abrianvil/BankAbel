
import { useState, useEffect } from 'react';
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
    const [balanceErr, setBalanceErr] = useState('')
    const [renderErr, setRenderErr] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
        setRenderErr(true)
        if (!balanceErr) {
            dispatch(updateWallet({ total_fund: wallet.totalFund - balance }))
            const newAccount = {
                id: accountId,
                name,
                balance: (+toEdit.balance) + (+balance)
            }
            const data = await dispatch(updateAccount(newAccount))
            await dispatch(getAllAccounts())
            await dispatch(getWallet())

            setShowAddFund(false)
        } else {
            setShowAddFund(true)
        }
    }

    useEffect(() => {
        if (balance <= 0) {
            setBalanceErr('Transaction of 0 dollars not allowed')
        } else if (balance > wallet.totalFund) {
            setBalanceErr('Amount exceeds you wallet Funds')
        // } else if (wallet.totalFund - balance === 0) {
        //     setBalanceErr('Your not allowed to Empty your wallet')
        } else {
            setBalanceErr('')
        }

    }, [balance])

    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Add Funds to your account</h2>
                    </div>
                    <div>
                        {renderErr && balanceErr ?
                            <label className='renderError'>{balanceErr}</label> :
                            <label className='text noRenderError'>Balance</label>
                        }
                    </div>
                    <input
                        min={1}
                        type='number'
                        onChange={(e) => setBalance(e.target.value)}
                        placeholder={0}
                        step={0.01}
                        name='balance'
                    />
                    <button>Add Funds</button>
                </form>
            </div>
        </div>
    )
}


export default AddFundForm
