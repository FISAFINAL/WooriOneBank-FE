import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Mypage from './pages/mypage/Mypage'
import MyFavorite from './pages/mypage/MyFavorite/MyFavorite';
import Woori from './pages/mypage/Woori/Woori';
import Rules from './pages/mypage/MyFavorite/rules/Rules';
import Details from './pages/mypage/MyFavorite/details/Details';

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
