import React from 'react';
import axios from 'axios';
import Footer from '../../../../components/footer/Footer';
import Header from '../../../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import poster from '../../../../assets/images/poster.png'
import '../stage/Stage.scss';
import { useEffect } from 'react';
import Navbar from '../../../navigation/Navbar';

function Stage(props) {
    const navigate = useNavigate();
    const [concertData, setConcertData] = useState(null);

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
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('공연 조회');
                console.log(response.data);
                setConcertData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onClickHandler = () => {
        console.log('응모하기 버튼');
        // axios.post('/api/concert/apply', {
        //     params: {
        //         concertId: 1
        //     },
        //     headers: {
        //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ3MTkyMzQsImV4cCI6MTcxNTkyODgzNH0.EzlCW0O0ZYlLZl3iRCOoaBCEhqzs1-Pfme1iqCtqNaw'
        //     }
        // })
        //     .then(response => {
        //         if (response.status !== 200) {
        //             throw new Error('Network response was not ok');
        //         }
        //         console.log('응모하기 버튼')
        //         navigate('/apply')
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });
    };

    return (
        <div>
            <Header />
            <Navbar />
            <img className='woori-poster' src={poster} alt='poster' width={500} />
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
            <button onClick={onClickHandler}>응모하기</button>
            <Footer />
        </div>
    );
}

export default Stage;