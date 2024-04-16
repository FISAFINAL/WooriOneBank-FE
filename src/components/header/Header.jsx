import React from 'react';
import logo from '../../assets/images/logo.png'
import './Header.scss'

function Header(props) {
    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img src={logo} width={90} height={20} alt="logo" />
                <p className='header-woori'>우리 WON THE STAGE</p>
            </div>

            <button>로그인</button>
            <button>회원가입</button>
        </div>
    );
}

export default Header;