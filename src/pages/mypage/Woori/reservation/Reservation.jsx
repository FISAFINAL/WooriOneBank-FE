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
import Modal from '../../modal/Modal';

function Reservation(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalMessage('');
      };

    useEffect(() => {
        axios.get('/api/concert', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'    
            }
        })
            .then(response => {
                console.log("response.status");
                console.log(response.status);
                
                console.log(response.data);
                if (response.status !== 200) {

                    throw new Error('Network response was not ok');
                }
                console.log('공연 조회')
                console.log(response)
                setConcertData(response.data);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                }
            });
    }, [])

    const onClickHandler = () => {
          axios.get('/api/concert/apply', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
            }
        })
            .then(response => {
                console.error(response);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setIsModalOpen(true);

                const message = (
                    <>
                      응모 완료 되었습니다.<br /><br />
                      공연 당첨 확인 : 2024. 5. 1. 18시
                    </>
                  );

                setModalMessage(message);
            })
            .catch(error => {
                console.log(error.response.data);

                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                }
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
            <Modal isOpen={isModalOpen} onClose={handleModalClose} message={modalMessage} />
            <Footer />
        </div>
    );
}

export default Reservation;
