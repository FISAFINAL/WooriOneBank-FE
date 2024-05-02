import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import poster from '../../../assets/images/poster.png';
import '../Woori/Woori.scss';
import Menu from '../../../components/menu/Menu';

function Woori(props) {
    const [concertData, setConcertData] = useState(null);

    useEffect(() => {
        axios.get('/api/concert/reservation/info', {
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
                console.log('공연 조회');
                console.log(response.data);
                setConcertData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className='woori-container'>
                <Menu />
                <div className="woori-content">
                    <img className='woori-poster' src={poster} alt='poster' width={200} />
                    {concertData && (
                        <div className="concert-info">
                            <h2>{concertData.concertName}</h2>
                            <p>{concertData.location}</p>
                            <p>공연 날짜: {new Date(...concertData.concertDate).toLocaleString()}</p>
                            {concertData.seatName ? (
                                <p>선택한 좌석: {concertData.seatName}</p>
                            ) : (
                                <p>좌석을 예매하지 않았습니다.</p>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Woori;