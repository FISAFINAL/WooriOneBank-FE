import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button} from './Button';
import './Navbar.scss';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click) ;
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);


    return (
        <>
        <nav className = 'navbar'>
            <div className = 'navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <i className='fab fa-typo3' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick = {closeMobileMenu}>
                            홈
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/reservation' className='nav-links' onClick = {closeMobileMenu}>
                            콘서트 응모
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/apply' className='nav-links' onClick = {closeMobileMenu}>
                            콘서트 예매
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/favorite' className='nav-links' onClick = {closeMobileMenu}>
                            최애 적금
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/woori' className='nav-links' onClick = {closeMobileMenu}>
                            마이페이지
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </nav>
        </>
    );
}

export default Navbar