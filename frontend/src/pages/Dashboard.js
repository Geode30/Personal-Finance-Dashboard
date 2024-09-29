import React, { useState, useEffect } from 'react';
import MainContent from '../components/dashboard/MainContent';
import Loading from '../components/Loading';

export default function Dashboard() {

    
    const [loading, setIsLoading] = useState(false);

    useEffect(() => { 
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center'>
            <Loading isLoading={loading} />
            <MainContent />
        </div>
    )
}
