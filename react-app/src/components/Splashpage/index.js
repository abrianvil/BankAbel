import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import bank from '../../Images/img1.webp'
import debitCard from '../../Images/debitCard.png'
import assets_nav_spend2 from '../../Images/assets_nav_spend2.png'
import './index.css'
import logo from '../../Images/logo.png'


function SplashPage() {
    const history = useHistory()
    function buttonClick(e) {
        e.preventDefault()
        history.push('/getstarted')
    }

    return (
        <div className='page'>
            <div className='nav-bar'>
                <div className='logo-div'>
                    <img src={logo} alt='logo' />
                </div>
                <button onClick={buttonClick} className='user-login'>
                    <i className="fa-solid fa-bars"></i>
                </button>

            </div>
            <div className='landing-page'>
                <div className='splash-body'>
                    <div className='title'>Do more with your money</div>
                    <div className='content-box'>
                        <div className='picture-box'>
                            <div className='photo'>
                                <img src={bank} alt='' />
                                <div className='title-2'>Bank</div>
                                <div className='tag'>Faster, simpler banking</div>
                            </div>

                            <div className='photo'>
                                <img src={debitCard} alt='' />
                                <div className='title-2'>Spend</div>
                                <div className='tag'>Save on everyday spending</div>
                            </div>

                            <div className='photo'>
                                <img src={assets_nav_spend2} alt='' />
                                <div className='title-2'>Send</div>
                                <div className='tag'>Pay and get paid instantly</div>
                            </div>
                        </div>
                        <div className='links-box'>
                            <div>Support</div>
                            <div>links</div>
                            <div>
                                Stay in touch
                                <Link
                                    className='contact-button'
                                    to={{
                                        pathname:
                                            'https://www.linkedin.com/in/abel-brianvil-ba4320170/',
                                    }}
                                    target='_blank'
                                >
                                    <div className='icon'>
                                        <i className='fa-brands fa-linkedin'></i>
                                    </div>
                                </Link>

                                <Link
                                    className='contact-button'
                                    to={{ pathname: 'https://github.com/abrianvil' }}
                                    target='_blank'
                                >
                                    <div className='icon'>
                                        <i className='fa-brands fa-square-github' />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SplashPage
