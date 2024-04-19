import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Details(props) {



    useEffect(() => {
        axios.get('http://localhost:8081/api/saving/info', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('적금 상세 조회');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            상세 조회
        </div>
    );
}

export default Details;