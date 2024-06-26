import React, { useState } from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import '../Login/Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../../../recoilState.ts';
import Navbar from '../../navigation/Navbar.jsx';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [, setLogin] = useRecoilState(loginState);


    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            id: username,
            password: password
        };

        axios.post('/api/user/login', requestBody, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/');
                    setLogin(true);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        //통신 확인되면 아래 지우기
        setLogin(true);
        navigate('/');
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="login-container">

                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">아이디:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">로그인</button>
                </form>

            </div>
            <Footer />
        </div>
    );
}

export default Login;