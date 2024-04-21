import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import poster from '../../../assets/images/poster.png';
import '../Woori/Woori.scss';

function Woori(props) {
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
            {/* <img className='woori-poster' src={poster} alt='poster' width={500} />
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
            </div> */}
            <Footer />
        </div>
    );
}

export default Woori;
