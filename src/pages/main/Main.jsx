import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import '../main/Main.scss';
import image1 from '../../assets/images/carousel2.png';
import image2 from '../../assets/images/carousel1.png';
import mainImg from '../../assets/images/mainposter.png';
import calendar from '../../assets/images/calendar.png';
import IU from '../../assets/images/iu.png';
import { useNavigate } from 'react-router-dom';

function Main(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [image1, image2];
    const navigate = useNavigate();

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    const onClickReservation = () => {
        navigate('/reservation')
    }

    const onClickFavorite = () => {
        navigate('/favorite')
    }

    return (
        <div>
            <Header />
            <div className="carousel-container">
                <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ backgroundImage: `url(${image})` }} alt={`Slide ${index + 1}`} className="carousel-image" >
                            {
                                index === 0 ? <>
                                    <img src={IU} alt="iu" width={250} height={250} className="calendar-image" />
                                    <div className="content-wrapper">
                                        <h1>우리 WON THE STAGE</h1>
                                        <p>콘서트 한다</p>
                                        <button onClick={onClickReservation}>티켓 예매하러 가기</button>
                                    </div>
                                </> :
                                    <>
                                        <div className="content-wrapper2">
                                            <h1>최애통장 가입하고</h1>
                                            <p>우리 WON THE STAGE 가자 !</p>
                                            <button onClick={onClickFavorite}>최애 통장 가입하기</button>
                                        </div>
                                        <img src={calendar} alt="calendar" width={200} height={200} className="calendar-image2" />
                                    </>
                            }

                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button className="prev-button" onClick={prevSlide}>
                        &lt;
                    </button>
                    <button className="next-button" onClick={nextSlide}>
                        &gt;
                    </button>
                </div>
            </div>

            <img src={mainImg} alt="main" className='main-image' />
            <button className='cta-button' onClick={onClickFavorite}>최애 통장 개설하기</button>
            <Footer />
        </div>
    );
}

export default Main;


{/* {images.map((image, index) => (
                        <div key={index} className="carousel-slide" style={{ backgroundImage: `url(${image})` }}>
                            {index === 0 ? (
                                <div className="content-wrapper">
                                    <h1>우리 WON THE STAGE</h1>
                                    <p>콘서트한다!</p>
                                    <button>좌석 예매하러 가기</button>
                                </div>
                            ) : (
                                <div className="content-wrapper">
                                    <h1>최애통장 가입하고</h1>
                                    <p>우리 WON THE STAGE 가자 !</p>
                                    <button>최애 통장 가입하기</button>
                                </div>
                            )}
                            <img src={index === 0 ? IU : calendar} alt={index === 0 ? "IU" : "calendar"} className={index === 0 ? "IU-image" : "calendar-image"} width={200} height={200} />
                        </div>
                    ))} */}