import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import poster from '../../../../assets/images/poster.png';
import '../reservation/Reservation.scss';
import bg from '../../../../assets/images/bg2.png';
import Navbar from '../../../navigation/Navbar';

function Reservation(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);

    useEffect(() => {
        axios.get('/api/concert', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2NDg1MjAsImV4cCI6MTcxNTg1ODEyMH0.gfRaXv-QFqdChHsXqm_s8mlf0y2i03GcwxydHyH40bI'
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
          axios.get('/api/concert/apply', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2NDg1MjAsImV4cCI6MTcxNTg1ODEyMH0.gfRaXv-QFqdChHsXqm_s8mlf0y2i03GcwxydHyH40bI'
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
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="reserv-bar"></div>
            <img className='reserv-img' src={bg} alt='poster' width={800} />
            <div className="reserv-title">2024 우리 원 더 스테이지</div>
            <img className='reserv-img' src={poster} alt='poster' width={500} />
            <div className="concert-stages-reserv">
                {concertData && (
                    <>
                        <div className="stage-reserv">
                            <div className="circle blue"></div>
                            <div>응모 기간</div>
                            <p>~{new Date(...concertData.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-reserv">
                            <div className="circle"></div>
                            <div>당첨 내역 확인</div>
                            <p>{new Date(...concertData.ticketingDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-reserv">
                            <div className="circle"></div>
                            <div>좌석 티켓팅</div>
                            <p>{new Date(...concertData.checkDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-reserv">
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
