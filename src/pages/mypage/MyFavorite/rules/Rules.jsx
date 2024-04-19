import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Rules(props) {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/saving/rules/1', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJRDEiLCJpYXQiOjE3MTMyNDYzNjksImV4cCI6MTcxNDQ1NTk2OX0.gM1Uhd2bQqxwC9fWXKuA2n3pOqg3-e-SUTzzZsAwmeU'
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
            <h2>규칙 조회</h2>
            <ul>
                {rules.map(rule => (
                    <li key={rule.savingRuleId}>
                        <div>규칙 ID: {rule.savingRuleId}</div>
                        <div>적금 액수: {rule.depositAmount}</div>
                        <div>규칙 이름: {rule.savingRuleName}</div>
                    </li>
                ))}
            </ul>
            <h2>규칙 추가</h2>
        </div>
    );
}

export default Rules;
