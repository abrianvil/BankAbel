import React from 'react'
import LoginForm from '../auth/LoginForm'
import img1 from '../../images'
import debitCard from '../../images'
import assets_nav_spend2 from '../../images'
import assets_nav_spend from '../../images'


function SplashPage() {


    return (
        <div className='landing-page'>
            <div className='nav-bar'></div>
            <div className='splash-body'>
                <div>Do more with your money</div>
                <div className='content-box'>
                    <div className='picture-box'>
                        <div className='photo'>
                            <img src={img1} alt='' />
                        </div>

                        <div className='photo'>
                            <img src={debitCard} alt='' />
                        </div>

                        <div className='photo'>
                            <img src={assets_nav_spend} alt='' />
                        </div>

                        <div className='photo'>
                            <img src={assets_nav_spend2} alt='' />
                        </div>
                    </div>
                    <div className='links-box'></div>
                </div>
            </div>
        </div>
    )
}
