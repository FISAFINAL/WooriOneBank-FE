import React from 'react';
import logo from '../../assets/images/logo.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../../recoilState.ts';
import { useRecoilState } from 'recoil';

function Header(props) {
    const navigate = useNavigate();
    const [isLogin] = useRecoilState(loginState);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleJoinClick = () => {
        navigate('/join');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <img onClick={handleLogoClick} src={logo} width={90} height={20} alt='logo' />
                <p className='header-woori'>우리 WON THE STAGE</p>
            </div>
            {/* <div>
                <button onClick={handleLoginClick}>로그인</button>
                <button onClick={handleJoinClick}>회원가입</button>
            </div> */}

            {isLogin ? (
                <div>
                    {/* <img src={icon} alt='User Icon' /> */}
                    <span>김우리 님</span>
                </div>
            ) : (
                <div>
                    <button onClick={handleLoginClick}>로그인</button>
                    <button onClick={handleJoinClick}>회원가입</button>
                </div>
            )}
        </div>
    );
}

export default Header;
