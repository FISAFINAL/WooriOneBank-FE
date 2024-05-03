import React, { useState, useEffect } from 'react';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import '../seat/Seat.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../navigation/Navbar';

function Seat() {
    const totalRows1 = 15;
    const totalRows2 = 5;
    const totalRows3 = 8;
    const totalColumns1 = 30;
    const totalColumns2 = 30;
    const totalColumns3 = 30;

    const [selectedSeat, setSelectedSeat] = useState(null);
    const [concertData, setConcertData] = useState(null);
    const navigate = useNavigate();

    const handleSeatClick = (row, column) => {
        const seat = `${row}_${column}`;
        setSelectedSeat(seat);
    };


    useEffect(() => {
        axios.get('/api/concert', {
            params: { concertId: 1 },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('공연 조회')
                console.log(response)
                setConcertData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onClickHandler = () => {
        if (!selectedSeat) {
            alert('좌석을 선택해주세요!');
            return;
        }

        const [row, column] = selectedSeat.split('_');
        console.log(`선택된 좌석: 행 ${row}, 열 ${column}`);

        const seatX = parseInt(row, 10);
        const seatY = parseInt(column, 10);

        const requestData = {
            concertId: 1,
            seatX,
            seatY
        };

        axios.post('/api/concert/reservation', requestData, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
            }
        })
            .then(response => {
                console.log(response);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('좌석 예매 완료');
                navigate('/woori');
            })
            .catch(error => {
                console.log('Error fetching data:', error);
                
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                }
            });

    };

    return (
        <div>
            <Header />
            <Navbar />
            {/* <div className='seat-stage'>STAGE</div> */}
            <div className='seat-container' style={{ textAlign: 'center' }}>
                <div className='render-seats'>
                    <div className='seat-stage'>STAGE</div>
                    <SeatPart totalRows={totalRows1} totalColumns={totalColumns1} selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} />
                    {/* <div className='seat-gap'></div>
                    <SeatPart totalRows={totalRows2} totalColumns={totalColumns2} selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} />
                    <div className='seat-gap'></div>
                    <SeatPart totalRows={totalRows3} totalColumns={totalColumns3} selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} /> */}
                </div>
                <div className="concert-stages-seat">
                    <div className="stage-seat">
                        <p className="stage-title-seat">공연 장소</p>
                        <p className="stage-info-seat">{concertData && concertData.concertVenue}</p>
                    </div>
                    <div className="stage-seat">
                        <p className="stage-title-seat">공연 응모 기간</p>
                        <p className="stage-info-seat">{concertData && new Date(...concertData.startDate).toLocaleDateString()} ~ {concertData && new Date(...concertData.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="stage-seat">
                        <p className="stage-title-seat">공연 당첨 확인</p>
                        <p className="stage-info-seat">{concertData && new Date(...concertData.checkDate).toLocaleString()}</p>
                    </div>
                    <div className="stage-seat">
                        <p className="stage-title-seat">공연 티켓팅 일자</p>
                        <p className="stage-info-seat">{concertData && new Date(...concertData.ticketingDate).toLocaleString()}</p>
                    </div>
                    <div className="stage-seat">
                        <p className="stage-title-seat">공연시간</p>
                        <p className="stage-info-seat">{concertData && concertData.runningTime}분</p>
                    </div>
                    <div className="stage-seat">
                        <p className="stage-title-seat">관람연령</p>
                        <p className="stage-info-seat">{concertData && concertData.ageLimit}</p>
                    </div>
                    <button className='apply-ctabtn' onClick={onClickHandler}>좌석 선택 완료</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function SeatPart({ totalRows, totalColumns, selectedSeat, handleSeatClick }) {
    const renderSeat = (row, column) => {
        const seat = `${row}_${column}`;
        const isSelected = selectedSeat === seat;
        const seatStyle = {
            backgroundColor: isSelected ? 'blue' : 'white',
            width: '10px',
            height: '10px',
            border: '1px solid black',
            margin: '1px',
            display: 'inline-block',
            cursor: 'pointer',
            boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.5)'
        };

        return (
            <div
                key={seat}
                style={seatStyle}
                onClick={() => handleSeatClick(row, column)}
            />
        );
    };

    const renderRow = row => {
        const rowSeats = [];
        for (let column = 1; column <= totalColumns; column++) {
            rowSeats.push(renderSeat(row, column));
        }
        return rowSeats;
    };

    const rows = [];
    for (let row = 1; row <= totalRows; row++) {
        rows.push(
            <div key={row}>
                {renderRow(row)}
            </div>
        );
    }

    return rows;
}

export default Seat;
