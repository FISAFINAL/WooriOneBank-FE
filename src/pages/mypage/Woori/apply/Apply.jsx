import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header/Header';
import poster from '../../../../assets/images/poster.png';

function Apply(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);

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
                setConcertData(response.data)
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
            <Header />
            <img src={poster} alt='poset' width={200} />
            <div>2024 우리 원 더 스테이지</div>
            <div>축하드립니다 김우리님</div>
            <div>2024 우리 원 더 스테이지</div>
            <div>R석 당첨되었습니다</div>

            <div>하단 안내사항을 참고하시어 좌석 예매해주시기 바랍니다.</div>
            <div>포스터</div>
            <div>
                <div>공연 정보들</div>
                <button onClick={onClickHandler}>예매하러 가기</button>
            </div>
            <div>
                스테이지 바 (2번째 포커스)
            </div>
            <div className="concert-stages">
                {concertData && (
                    <>
                        <div className="stage">
                            <div>Entry Period</div>
                            <p>{new Date(...concertData.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div>Ticketing Date</div>
                            <p>{new Date(...concertData.ticketingDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div>Check Date</div>
                            <p>{new Date(...concertData.checkDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <div>Concert Date</div>
                            <p>{new Date(...concertData.concertDate).toLocaleDateString()}</p>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}

export default Apply;