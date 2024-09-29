import React, { useState, useEffect, useContext } from 'react';
import MainContent from '../components/dashboard/MainContent';
import Loading from '../components/Loading';
import axios from 'axios';
import { MyContext } from '../MyContext';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken, token } = useContext(MyContext);

    useEffect(() => { 
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

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

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center'>
            <Loading isLoading={loading} />
            <MainContent logout={logout} loading={loading} />
        </div>
    )
}
