import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Apply(props) {
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8081/api/concert/draw/result', {
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
                console.log('공원 당첨 내역')
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

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
    }, []);



    const onClickHandler = () => {
        navigate('/reservation');
    };

    return (
        <div>
            응모 페이지
            <button onClick={onClickHandler}>예매하러 가기</button>
        </div>
    );
}

export default Apply;