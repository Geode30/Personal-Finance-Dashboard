import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import Loading from '../components/Loading';
import MainContent from '../components/dashboard/MainContent';

export default function Dashboard() {
    const navigate = useNavigate();
    const { setToken, token } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

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
        navigate('/expense/add')
    }

    const data = [
        { name: 'Income', value: 400 },
        { name: 'Expenses', value: 300 },
    ];

    const COLORS = ['#32CD32', '#D71515'];

    const renderCustomizedLabel = ({ x, y, name, value, index }) => {
        return (
            <text x={x} y={y} fontWeight="bold" textAnchor="middle" dominantBaseline="central" fill={COLORS[index]}>
                {name}: {value}
            </text>
        );
    };

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center'>
            <Loading isLoading={isLoading} />
            <MainContent isLoading={isLoading} data={data} customizedLabel={renderCustomizedLabel} colors={COLORS} logout={logout} addIncome={toAddIncomeForm} />
        </div>
    )
}
