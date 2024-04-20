import React from 'react';
import { useNavigate } from 'react-router-dom';

function Seat(props) {
    const navigate = useNavigate()

    const onClickHandler = () => {
        //[POST] 7. 공연 좌석 예매 
        navigate('/woori')
    }

    return (
        <div>
            예매 사이트
            <button onClick={onClickHandler}>좌석 선택 완료</button>
        </div>
    );
}

export default Seat;