import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Mypage from './pages/mypage/Mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        {/* <Route path="/taeinfit" element={<TaeinFit />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
