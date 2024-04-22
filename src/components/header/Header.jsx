import React from 'react';
import logo from '../../assets/images/logo.png'
import './Header.scss'
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate('/')
    }
    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img onClick={onClickHandler} src={logo} width={90} height={20} alt="logo" />
                <p className='header-woori'>우리 WON THE STAGE</p>
            </div>

            <button>로그인</button>
            <button>회원가입</button>
        </div>
    );
}

export default Header;