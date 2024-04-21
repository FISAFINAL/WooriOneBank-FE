import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Seat(props) {
    const navigate = useNavigate()

    const onClickHandler = () => {
        const requestData = {
            concertId: 1,
            seatX: 1,
            seatY: 1
        };

        axios.post('http://localhost:8081/api/concert/reservation', requestData, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('좌석 예매 완료');
                navigate('/woori')

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div>
            예매 사이트
            <button onClick={onClickHandler}>좌석 선택 완료</button>
        </div>
    );
}

export default Seat;