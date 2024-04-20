import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reservation(props) {
    const navigate = useNavigate(); 


    useEffect(() => {
        axios.get('http://localhost:8081/api/concert', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTM0MjAzODIsImV4cCI6MTcxNDYyOTk4Mn0.isT1n30TW989RDI8cVd-p9nQYf2lgTT21gAWrLKIvJg'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('공연 조회')
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const onClickHandler = () => {
        navigate('/seat')
    }
    return (
        <div>
            예매하기
            <button onClick={onClickHandler}>좌석 에매하기</button>
        </div>
    );
}

export default Reservation;