import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequests, deleteRequest } from '../../store/request';


import { createRequest } from '../../store/request';
import './index.css'



const CancelRequest = ({ setShowCancelReq, toCancel }) => {
    const dispatch = useDispatch()

    const deleteReq = async () => {
        const deleted = await dispatch(deleteRequest(toCancel))
        await dispatch(getAllRequests())
        setShowCancelReq(false)
    }






    return (
        <div>
            <form className='form'>
                <div className='text bold'>Are you sure you want to cancel this request? </div>
                <div className='wrapper'>
                    <div onClick={() => deleteReq()} className='confirmation'>
                        Confirm
                    </div>
                    <div onClick={() => setShowCancelReq(false)} className='confirmation'>
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    )
}


export default CancelRequest
