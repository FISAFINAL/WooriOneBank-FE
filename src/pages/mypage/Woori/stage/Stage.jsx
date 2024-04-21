import React from 'react';
import axios from 'axios';
import Footer from '../../../../components/footer/Footer';
import Header from '../../../../components/header/Header';
import { useNavigate } from 'react-router-dom';

function Stage(props) {
    const navigate = useNavigate();

    const onClickHandler = () => {

        axios.post('http://localhost:8081/api/concert/apply', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTM0MjAzODIsImV4cCI6MTcxNDYyOTk4Mn0.isT1n30TW989RDI8cVd-p9nQYf2lgTT21gAWrLKIvJg'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('응모하기 버튼')
                navigate('/apply')

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <Header />
            <button onClick={onClickHandler}>응모하기</button>
            <Footer />
        </div>
    );
}

export default Stage;