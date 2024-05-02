import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/header/Header';
import poster from '../../../../assets/images/poster.png';
import bg from '../../../../assets/images/bg2.png';
import '../apply/Apply.scss';
import Footer from '../../../../components/footer/Footer';

function Apply(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/concert/draw/result', {
            params: {
                concertId: 1
            },
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2MTk4NjEsImV4cCI6MTcxNTgyOTQ2MX0.Hf8MEeg30nFzmYfBvuztfM_XQpjrRaQBqYsXxVzk2Wo'
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2MTk4NjEsImV4cCI6MTcxNTgyOTQ2MX0.Hf8MEeg30nFzmYfBvuztfM_XQpjrRaQBqYsXxVzk2Wo'
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
        navigate('/seat');
    };

    return (
        <div>
            <Header />
            <img className='reserv-img' src={bg} alt='poster' width={800} />
            <div className="reserv-title">2024 우리 원 더 스테이지</div>
            <div className='apply-text'>
                <div>축하드립니다 김우리님</div>
                <div><span className='apply-bold'>2024</span> 우리 원 더 스테이지</div>
                <div><span className='apply-blue'>R석</span> 당첨되었습니다</div>
                <div className='apply-space'></div>
                <div>하단 안내사항을 참고하시어 좌석 예매해주시기 바랍니다.</div>
            </div>

            <div className='apply-postercontainer'>
                <img className='apply-poster' src={poster} alt='poset' width={200} />
                <div className='apply-info'>
                    <div className="concert-stages">
                        <div className="stage">
                            <p className="stage-title">공연 장소</p>
                            <p className="stage-info">{concertData && concertData.concertVenue}</p>
                        </div>
                        <div className="stage">
                            <p className="stage-title">공연 응모 기간</p>
                            <p className="stage-info">{concertData && new Date(...concertData.startDate).toLocaleDateString()} ~ {concertData && new Date(...concertData.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage">
                            <p className="stage-title">공연 당첨 확인</p>
                            <p className="stage-info">{concertData && new Date(...concertData.checkDate).toLocaleString()}</p>
                        </div>
                        <div className="stage">
                            <p className="stage-title">공연 티켓팅 일자</p>
                            <p className="stage-info">{concertData && new Date(...concertData.ticketingDate).toLocaleString()}</p>
                        </div>
                        <div className="stage">
                            <p className="stage-title">공연시간</p>
                            <p className="stage-info">{concertData && concertData.runningTime}분</p>
                        </div>
                        <div className="stage">
                            <p className="stage-title">관람연령</p>
                            <p className="stage-info">{concertData && concertData.ageLimit}</p>
                        </div>
                        <button className='apply-ctabtn' onClick={onClickHandler}>예매하러 가기</button>

                    </div>
                </div>
            </div>
            <div className='apply-bar'></div>
            <div className="concert-stages2">
                {concertData && (
                    <>
                        <div className="stage-bar">
                            <div className="circle"></div>
                            <div>응모 기간</div>
                            <p>~{new Date(...concertData.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-bar">
                            <div className="circle blue"></div>
                            <div>당첨 내역 확인</div>
                            <p>{new Date(...concertData.ticketingDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-bar">
                            <div className="circle"></div>
                            <div>좌석 티켓팅</div>
                            <p>{new Date(...concertData.checkDate).toLocaleDateString()}</p>
                        </div>
                        <div className="stage-bar">
                            <div className="circle"></div>
                            <div>콘서트 날짜</div>
                            <p>{new Date(...concertData.concertDate).toLocaleDateString()}</p>
                        </div>
                    </>
                )}
            </div>
            <Footer />

        </div>
    );
}

export default Apply;