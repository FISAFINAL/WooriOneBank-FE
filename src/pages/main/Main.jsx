import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import '../main/Main.scss'

function Main(props) {
    return (
        <div>
            <Header />
            메인페이지
            <Footer />
        </div>
    );
}

export default Main;