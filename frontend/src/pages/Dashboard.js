import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import Loading from '../components/Loading';
import MainContent from '../components/dashboard/MainContent';

export default function Dashboard() {
    const navigate = useNavigate();
    const { setToken, token } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({
        resultValue: '',
        resultStatus: ''
    });
    const [data, setData] = useState([
        { name: 'Income', value: 0 },
        { name: 'Expenses', value: 0 },
    ]);

    useEffect(() => {
        const updateData = async () => {

            await axios.get('http://127.0.0.1:8000/api/data/day', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => {
                if (response['data']['message'] === 'Successful') {
                    setResult({
                        resultValue: response['data']['result'],
                        resultStatus: response['data']['resultStatus']
                    })
                    setData(prevData =>
                        prevData.map(item =>
                            item.name === 'Income' ? { ...item, value: response['data']['totalIncome'] } : { ...item, value: response['data']['totalExpense'] }
                        )
                    );
                }
            }).catch(error => {
                console.log(error);
            })
        };

        updateData();
    }, []);

    const logout = async () => {
        setIsLoading(true);
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }).then(response => {
            setToken('No Token');
            navigate('/');

        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const toAddIncomeForm = () => {
        navigate('/income/add')
    }

    const toAddExpenseForm = () => {
        navigate('/expense/add')
    }

    const COLORS = ['#32CD32', '#D71515'];

    const renderCustomizedLabel = ({ x, y, name, value, index }) => {
        const positions = [
            { x: x + -40, y: y + -20 },
            { x: x + 40, y: y + 20 }
        ];

        const { x: adjustedX, y: adjustedY } = positions[index % positions.length];
        return (
            <text x={adjustedX} y={adjustedY} fontWeight="bold" textAnchor='middle' dominantBaseline="central" fill={COLORS[index]}>
                {name}: {value}
            </text>
        );
    };

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center'>
            <Loading isLoading={isLoading} />
            <MainContent isLoading={isLoading} data={data} customizedLabel={renderCustomizedLabel} colors={COLORS} logout={logout} addIncome={toAddIncomeForm} addExpense={toAddExpenseForm} resultValue={result.resultValue} resultStatus={result.resultStatus} />
        </div>
    )
}
