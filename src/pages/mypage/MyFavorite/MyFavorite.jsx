import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 불러오기
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';
import terms from '../../../assets/images/terms.png';

function MyFavorite(props) {
    const [savingList, setSavingList] = useState([]);
    const [showTerms, setShowTerms] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [savingName, setSavingName] = useState(''); // 적금 이름 상태 변수 추가
    const [bankName, setBankName] = useState(''); // 은행 이름 상태 변수 추가
    const [accountNumber, setAccountNumber] = useState(''); // 계좌 번호 상태 변수 추가
    const [celebrityId, setCelebrityId] = useState(''); // 연예인 ID 상태 변수 추가
    const [memberId, setMemberId] = useState(''); // 최애적금 주인 ID 상태 변수 추가
    const navigate = useNavigate(); // useNavigate 인스턴스 생성


    useEffect(() => {
        axios.get('http://localhost:8081/api/saving/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setSavingList(response.data.savingList);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onClickOpened = () => {
        setShowTerms(true);
    };

    const onClickJoin = () => {
        setShowTerms(false);
        setShowInfo(true);
    };

    const onClickComplete = () => {
        setShowInfo(false);
        const requestData = {
            savingName,
            bankName,
            accountNumber,
            celebrityId,
            memberId
        };

        axios.post('http://localhost:8081/api/saving', requestData, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('적금 가입 성공');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const showRules = () => {
        navigate('/rules');
    };

    const showDetails = () => {
        navigate('/details');
    };

    return (
        <div>
            <Menu />
            <div>
                {showTerms ? (
                    <>
                        <img src={terms} alt="terms" width={500} height={400} />
                        <button onClick={onClickJoin}>가입하기</button>
                    </>

                ) : showInfo ? (
                    <>
                        <div>
                            <label>통장 이름: </label>
                            <input type="text" value={savingName} onChange={e => setSavingName(e.target.value)} />
                        </div>
                        <div>
                            <label>자동 이체할 은행: </label>
                            <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} />
                        </div>
                        <div>
                            <label>자동 이체할 계좌: </label>
                            <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                        </div>
                        <div>
                            <label>연예인 ID: </label>
                            <input type="text" value={celebrityId} onChange={e => setCelebrityId(e.target.value)} />
                        </div>
                        <div>
                            <label>최애적금 주인 ID: </label>
                            <input type="text" value={memberId} onChange={e => setMemberId(e.target.value)} />
                        </div>
                        <button onClick={onClickComplete}>완료</button>
                    </>
                ) : (
                    <>
                        <h2>최애 통장 리스트</h2>
                        <ul>
                            {savingList.map((saving, index) => (
                                <li key={index}>
                                    <h3>{saving.savingName}</h3>
                                    <p>종료일: {new Date(...saving.endDate).toLocaleDateString()}</p>
                                    <p>총 금액: {saving.totalAmount}</p>
                                    <p>연예인 이름: {saving.celebrityName}</p>
                                    <p>연예인 URL: {saving.celebrityUrl}</p>
                                    <button onClick={showRules}>규칙</button>
                                    <button onClick={showDetails}>상세</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={onClickOpened}>최애 통장 개설하기</button>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default MyFavorite;
