import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import Menu from '../../../../components/menu/Menu';
import '../details/Details.scss';

function Details(props) {
    const [savingInfo, setSavingInfo] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/saving/info/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const transformedData = transformData(response.data);
                setSavingInfo(transformedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const getTransactionTypeText = (type) => {
        switch (type) {
            case 'CREATION':
                return '적금 최초 가입';
            case 'FREE':
                return '최애 규칙 입금';
            case 'WEEK':
                return '최애 적금 자동 이체';
            default:
                return '최애 적금 자유 이체';
        }
    };

    const transformData = (data) => {
        const transformedData = { ...data };
        transformedData.savingHistoryList.forEach(history => {
            const [year, month, day, hour, minute, second] = history.createdAt;
            const createdAt = new Date(year, month - 1, day, hour, minute, second);
            history.formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
        });
        return transformedData;
    };

    return (
        <div>
            <Header />
            <div className='details-container'>
                <Menu />
                <div className='details-detailinfo'>
                    <p className='details-titletext'>우리 <span className='details-bluetext'>WON</span> 최애 통장</p>
                    {savingInfo && (
                        <div>
                            <div className='details-infocontainer'>
                                <p className='details-total'>적금 금액 : {savingInfo.savingDTO.totalAmount}원</p>
                                <p className='details-rate'>현재 금리: {savingInfo.nowInterestRate}%</p>
                            </div>
                            <p className='detail-title'>입금 내역</p>
                            <div className='detail-infolistcontainer'>
                                {savingInfo.savingHistoryList.map((history, index) => (
                                    <div key={index}>
                                        <p>{history.formattedCreatedAt}</p>
                                        <div className='detail-amountinfo'>
                                            <p>{getTransactionTypeText(history.transactionType)}</p>
                                            <p>{history.amount}원</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Details;
