import React, { useState } from 'react';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Join/Join.scss';
import Navbar from '../../navigation/Navbar';


function Join(props) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            id: id,
            password: password,
            name: name,
            age: age,
            email: email,
            grade: 'None'
        };
        // console.log('User Data:', userData);

        axios.post('/api/member/signup', userData, {
            headers: {
                // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
            }
        })
            .then(response => {
                console.log('회원가입');
                console.log(response);
                if (response.status === 200) {
                    navigate('/');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="join-container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="id">아이디:</label>
                            <input
                                type="text"
                                id="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
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
                        <div>
                            <label htmlFor="name">이름:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="age">나이:</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">이메일:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit">가입하기</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Join;