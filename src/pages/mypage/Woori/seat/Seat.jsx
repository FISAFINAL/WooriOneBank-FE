import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import { SeatMap } from 'react-seatmap';

function Seat() {
    const [selectedSeat, setSelectedSeat] = useState(null);
    // const history = useHistory();

    const onClickHandler = () => {
        if (!selectedSeat) {
            alert('좌석을 선택해주세요!');
            return;
        }

        const [row, column] = selectedSeat.split('_');
        const seatX = parseInt(row, 10);
        const seatY = parseInt(column, 10);

        const requestData = {
            concertId: 1,
            seatX,
            seatY
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
                // history.push('/woori');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <Header />
            <SeatMap
                rows={10}
                columns={10}
                reserved={{ '1_1': 'R', '1_2': 'R', '1_3': 'R', '2_1': 'R', '2_2': 'R', '2_3': 'R', '3_1': 'R', '3_2': 'R', '3_3': 'R', '4_1': 'A', '4_2': 'A', '4_3': 'A', '5_1': 'A', '5_2': 'A', '5_3': 'A', '6_1': 'A', '6_2': 'A', '6_3': 'A', '7_1': 'A', '7_2': 'A', '7_3': 'A', '8_1': 'B', '8_2': 'B', '8_3': 'B', '9_1': 'B', '9_2': 'B', '9_3': 'B', '10_1': 'B', '10_2': 'B', '10_3': 'B' }}
                selected={selectedSeat}
                onSeatSelect={(seatId) => setSelectedSeat(seatId)}
            />
            <button onClick={onClickHandler}>좌석 선택 완료</button>
            <Footer />
        </div>
    );
}

export default Seat;
