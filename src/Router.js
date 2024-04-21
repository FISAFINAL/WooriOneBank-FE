import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Mypage from './pages/mypage/Mypage'
import MyFavorite from './pages/mypage/MyFavorite/MyFavorite';
import Woori from './pages/mypage/Woori/Woori';
import Rules from './pages/mypage/MyFavorite/rules/Rules';
import Details from './pages/mypage/MyFavorite/details/Details';
import Apply from './pages/mypage/Woori/apply/Apply';
import Reservation from './pages/mypage/Woori/reservation/Reservation';
import Seat from './pages/mypage/Woori/seat/Seat';
import Stage from './pages/mypage/Woori/stage/Stage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/favorite" element={<MyFavorite />} />
                <Route path="/woori" element={<Woori />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/details" element={<Details />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/seat" element={<Seat />} />
                <Route path="/stage" element={<Stage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
