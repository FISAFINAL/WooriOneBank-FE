import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/menu/Menu';
import Footer from '../../../components/footer/Footer';
import terms from '../../../assets/images/terms.png';
import '../MyFavorite/MyFavorite.scss';
import Header from '../../../components/header/Header';

function MyFavorite(props) {
    const [savingList, setSavingList] = useState([]);
    const [showTerms, setShowTerms] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [savingName, setSavingName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [celebrityId, setCelebrityId] = useState('1');
    const [memberId, setMemberId] = useState('1');
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/api/saving/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2MTk4NjEsImV4cCI6MTcxNTgyOTQ2MX0.Hf8MEeg30nFzmYfBvuztfM_XQpjrRaQBqYsXxVzk2Wo'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data.savingList)
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2MTk4NjEsImV4cCI6MTcxNTgyOTQ2MX0.Hf8MEeg30nFzmYfBvuztfM_XQpjrRaQBqYsXxVzk2Wo'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('적금 가입 성공');
                // navigate('/favorite');
                axios.get('http://localhost:8081/api/saving/1', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2MTk4NjEsImV4cCI6MTcxNTgyOTQ2MX0.Hf8MEeg30nFzmYfBvuztfM_XQpjrRaQBqYsXxVzk2Wo'
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

    const celebrityOptions = [
        { id: 1, name: 'BTS' },
        { id: 2, name: 'EXO' },
        { id: 3, name: '뉴진스' },
        { id: 4, name: '라이즈' },
        { id: 5, name: '아이유' }
    ];

    return (
        <div>
            <Header />
            <div className='favorite-container'>
                <Menu />
                <div>
                    {showTerms ? (
                        <>
                            <div className='join-container'>
                                <div className='favorite-info'>
                                    <div className='join-title'>최애 적금</div>
                                    <div className='join-subtitle'>우리 WON 최애 적금</div>
                                    <div className='join-message'>최애를 응원하며 저금해요</div>
                                    <div className='info-details'>
                                        <p>상품 상세 정보</p>
                                        <ul>
                                            <p>
                                                <li>가입 대상</li>
                                                <div>
                                                    <div>실명의 개인 (1인 1계좌) *기존 스마트폰 적금 포함</div>
                                                    <div>(단, 우리 WON 더 스테이지 응모는 만 12세 이상부터 가능)</div>
                                                </div>
                                            </p>
                                            <p>
                                                <li>가입 기간</li>
                                                <div>26주</div>
                                            </p>
                                            <p>
                                                <li>적립 금액</li>
                                                <div>월 10,000 ~ 100,000원</div>
                                            </p>
                                            <p>
                                                <li>만기 후 이율</li>
                                                <div>만기일 당시 영업점 및 인터넷 홈페이지에 고시한 일반정기적금 만기 후 이율을 적용</div>
                                            </p>
                                            <p>
                                                <li>중도 해지 이율</li>
                                                <div>신규일 당시 영업점 및 인터넷 홈페이지에 고시한 중도해지 이율을 적용</div>
                                            </p>
                                        </ul>
                                    </div>
                                </div>
                                <img className='info-detailimg' src={terms} alt="terms" width={500} height={400} />
                                <button className="join-button" onClick={onClickJoin}>가입하기</button>
                            </div>
                        </>
                    ) : showInfo ? (
                        <>
                            <div className="last-container">
                                <p className='savinglist-titletext'>우리 <span className='savinglist-bluetext'>WON</span> 최애 적금</p>
                                <div className='last-message'>아래의 정보를 입력해 주세요.</div>
                                <div>
                                    <label>통장 이름</label>
                                    <input type="text" value={savingName} onChange={e => setSavingName(e.target.value)} />
                                </div>
                                <div className="gap" />
                                <div>
                                    <label>자동 이체할 계좌</label>
                                    <input className='account-select' type="text" value={bankName} onChange={e => setBankName(e.target.value)} />
                                    <input className='account-number' type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                                </div>
                                <div className="gap" />
                                <div>
                                    <label>연예인</label>
                                    <select className='select-box' value={celebrityId} onChange={e => setCelebrityId(e.target.value)}>
                                        <option value="" ></option>
                                        {celebrityOptions.map(option => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div>
                                    <label>최애적금 주인 ID</label>
                                    <input type="text" value={memberId} onChange={e => setMemberId(e.target.value)} />
                                </div> */}
                                <button className='last-ctabutton' onClick={onClickComplete}>완료</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className='savinglist-h2title'>최애 통장</h2>
                            <div>
                                {savingList.map((saving, index) => (
                                    <div key={index} className='savinglist-container'>
                                        <div className='savinglist-title'>
                                            <div>
                                                <p className='savinglist-titletext'>우리 <span className='savinglist-bluetext'>WON</span> 최애 통장</p>
                                                <p className='savinglist-account'>123-456-789</p>
                                            </div>
                                            <p className='savinglist-celebrity'>{saving.celebrityName}</p>
                                        </div>
                                        <p className='savinglist-balance'>{saving.totalAmount}원</p>
                                        <p className='savinglist-savingname'>{saving.savingName}</p>
                                        {/* <p>종료일: {new Date(...saving.endDate).toLocaleDateString()}</p> */}
                                        {/* <p>연예인 URL: {saving.celebrityUrl}</p> */}
                                        <div className='savinglist-buttoncontainer'>
                                            <button onClick={showRules}>규칙</button>
                                            <button onClick={showDetails}>상세</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className='savinglist-ctabutton' onClick={onClickOpened}>최애 통장 개설하기</button>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyFavorite;
