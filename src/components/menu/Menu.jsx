import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../menu/Menu.scss';

function Menu() {
    const location = useLocation();

    return (
        <div className="menu">
            <button className={location.pathname === '/mypage' ? 'active' : ''}><Link to="/mypage" style={{ textDecoration: "none" }}>내 정보</Link></button>
            <button className={location.pathname === '/favorite' ? 'active' : ''}><Link to="/favorite" style={{ textDecoration: "none" }}>최애 통장</Link></button>
            <button className={location.pathname === '/woori' ? 'active' : ''}><Link to="/woori" style={{ textDecoration: "none" }}>우리 WON THE STAGE</Link></button>
        </div>
    );
}

export default Menu;
