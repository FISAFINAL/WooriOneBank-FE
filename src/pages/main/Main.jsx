import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import '../main/Main.scss';
import image1 from '../../assets/images/carousel2.png';
import image2 from '../../assets/images/carousel1.png';
import mainImg from '../../assets/images/main.png';

function Main(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [image1, image2];

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div>
            <Header />
            <div className="carousel-container">
                <div className="carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
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
            <button className='cta-button'>최애 통장 개설하기</button>
            <Footer />
        </div>
    );
}

export default Main;
