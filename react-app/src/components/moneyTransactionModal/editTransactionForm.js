import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../store/transaction';

import { getWallet, updateWallet } from '../../store/wallet';
import { updateTransaction } from '../../store/transaction';
import './index.css'


const EditTransaction = ({ setShowEditTransaction, transaction }) => {
    const dispatch = useDispatch()

    const wallet = useSelector(state => state.wallet.wallet)
    const [amount, setAmount] = useState(transaction.amount)

    useEffect(() => {
        dispatch(getWallet())
    }, [dispatch])


    const submit = async (e) => {
        e.preventDefault()
        console.log('wallet after first update', wallet)
        if (wallet.totalFund >= amount) {
            const newTransaction = { ...transaction }
            newTransaction.amount = amount
            newTransaction.receiver_id = newTransaction.receiver
            if (newTransaction.amount > transaction.amount) {

               const newAmount=(+newTransaction.amount) - (+transaction.amount)
                const data = await dispatch(updateTransaction(newTransaction))


                await dispatch(updateWallet({ total_fund: wallet.totalFund - newAmount }))
                await dispatch(getAllTransactions())
                await dispatch(getWallet())
                console.log('wallet after second update', wallet)


                if (data.errors) {

                    setShowEditTransaction(true)
                } else setShowEditTransaction(false)
            } else if (newTransaction.amount < transaction.amount){

               const newAmount= (+transaction.amount)- (+newTransaction.amount)
               const data = await dispatch(updateTransaction(newTransaction))


               await dispatch(updateWallet({ total_fund: wallet.totalFund + newAmount }))
               await dispatch(getAllTransactions())
               await dispatch(getWallet())
               console.log('wallet after second update', wallet)


               if (data.errors) {

                   setShowEditTransaction(true)
               } else setShowEditTransaction(false)
            }
        }
    }


    return (
        <div>
            <div>
                <form className='form' onSubmit={submit}>
                    <div className='text'>
                        <h2>Edit Transaction</h2>
                    </div>
                    <div>
                        <label>Amount</label>
                    </div>
                    <input
                        min={1}
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={0.00}
                        name='amount'
                    ></input>

                    <button>Update Transaction</button>
                </form>
            </div>
        </div>
    )
}


export default EditTransaction
