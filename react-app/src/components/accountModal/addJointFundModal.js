
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllJointAccounts,updateJointAccount } from '../../store/jointAccount';
import { getWallet, updateWallet } from '../../store/wallet';

import './index.css'

const AddJointFundForm = ({ accountId, setShowAddJointFund }) => {
    const dispatch = useDispatch()

    const wallet = useSelector(state => state.wallet.wallet)
    const accounts = useSelector(state => state.jointAccount.jointAccounts)
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
            const newJointAccount = {
                id: accountId,
                name,
                first_owner_id: toEdit['owner'].id,
                second_owner_id:toEdit.secondUser,
                balance: (+toEdit.balance) + (+balance)
            }
            
            const data = await dispatch(updateJointAccount(newJointAccount))
            await dispatch(getAllJointAccounts())
            await dispatch(getWallet())

            setShowAddJointFund(false)
        } else {
            setShowAddJointFund(true)
        }
    }

    useEffect(() => {
        if (balance <= 0) {
            setBalanceErr('Transaction of 0 dollars not allowed')
        } else if (balance > wallet.totalFund) {
            setBalanceErr('Amount exceeds you wallet Funds')
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


export default AddJointFundForm
