import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import Menu from '../../../../components/menu/Menu';
import '../rules/Rules.scss';
import bts from "../../../../assets/images/bts.png"


function Rules(props) {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        axios.get('/api/saving/rules/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEyMTIyIiwiaWF0IjoxNzE0NTI3MzYzLCJleHAiOjE3MTU3MzY5NjN9.xjwv2mSPEmTHlRcu5TRs7ZPvUl7UwuGi5c-LwLBvqJQ'
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setRules(response.data.savingRuleList);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className='rules-container'>
                <Menu />
                <div className='rules-rules'>
                    <div className='rule-celebname'>BTS</div>
                    <div className='rule-row'>
                        <div>
                            {rules.map(rule => (
                                <div key={rule.savingRuleId}>
                                    <div className='rule-savingcontainer'>
                                        <div className='rule-namecontainer'>{rule.savingRuleName}</div>
                                        <div className='rule-balancecontainer'>{rule.depositAmount}원</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <img src={bts} width={200} height={200} alt="bts" />
                    </div>
                    <div className='rule-button-container'>
                        <input type="text" placeholder="규칙명/돈" />
                        <button>규칙 추가</button>
                    </div>
                </div>

            </div>


            <Footer />
        </div>
    );
}

export default Rules;
