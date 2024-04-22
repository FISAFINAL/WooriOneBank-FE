import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import poster from '../../../../assets/images/poster.png';
import '../reservation/Reservation.scss';


function Reservation(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);

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
                setConcertData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const onClickHandler = () => {
        // get 6 호출
        navigate('/apply')
    }

    return (
        <div>
            <Header />
            <img className='reserv-img' src={poster} alt='poster' width={500} />
            <div className="concert-stages">
                {concertData && (
                    <>
                        <div className="stage">
                            <div className="circle blue"></div>
                            <div>응모 기간</div>
                            <p>~{new Date(...concertData.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div className="circle"></div>
                            <div>당첨 내역 확인</div>
                            <p>{new Date(...concertData.ticketingDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div className="circle"></div>
                            <div>좌석 티켓팅</div>
                            <p>{new Date(...concertData.checkDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div className="circle"></div>
                            <div>콘서트 날짜</div>
                            <p>{new Date(...concertData.concertDate).toLocaleDateString()}</p>
                        </div>
                    </>
                )}
            </div>
            <button className='reserv-button' onClick={onClickHandler}>응모하기</button>
            <Footer />
        </div>
    );
}

export default Reservation;
