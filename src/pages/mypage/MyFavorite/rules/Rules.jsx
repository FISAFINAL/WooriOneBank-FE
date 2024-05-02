import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import Menu from '../../../../components/menu/Menu';
import '../rules/Rules.scss';
import bts from "../../../../assets/images/bts.png"

function Rules(props) {
    const [rules, setRules] = useState([]);
    const [newRule, setNewRule] = useState('');

    useEffect(() => {
        axios.get('/api/saving/rules/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2NDg1MjAsImV4cCI6MTcxNTg1ODEyMH0.gfRaXv-QFqdChHsXqm_s8mlf0y2i03GcwxydHyH40bI'
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

    const handleAddRule = () => {
        const [savingRuleName, depositAmount] = newRule.split('/');
        
        if (savingRuleName && depositAmount) {
            axios.post('/api/saving/rules', {
                savingRuleName: savingRuleName.trim(), 
                depositAmount: parseInt(depositAmount.trim()), 
                savingId: 1 
            }, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTQ2NDg1MjAsImV4cCI6MTcxNTg1ODEyMH0.gfRaXv-QFqdChHsXqm_s8mlf0y2i03GcwxydHyH40bI'
                }
            })
            .then(response => {
                if (response.status === 200) {
                   
                    axios.get('/api/saving/rules/1')
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('Network response was not ok');
                        }
                        setRules(response.data.savingRuleList);
                        setNewRule('');
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error creating new rule:', error);
            });
        }
    };

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
                        <input type="text" placeholder="규칙명/돈" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
                        <button onClick={handleAddRule}>규칙 추가</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Rules;
