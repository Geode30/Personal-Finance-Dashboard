import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { MyContext } from '../MyContext';

export default function History() {
    const { token } = useContext(MyContext);
    const [records, setRecords] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(records);
    }, [records]);

    useEffect(() => { 
        const fetchRecords = async () => {
            setIsLoading(true);
            await axios.get('http://127.0.0.1:8000/api/entry/history', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => { 
                if (response['data']['message'] === 'Successful') { 
                    setRecords(prevRecords => [
                        ...response['data']['records']
                    ]);
                }
            }).then(error => { 
                console.log(error);
            }).finally(() => { 
                setIsLoading(false);
            })
        }
        fetchRecords();
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray] text-[color:--text-light-gray]">
            <h1 className="text-[2em] font-bold mt-[1em]">Entry History</h1>
            <div className="flex flex-col items-center w-[25em] h-[30em] border-[2px] rounded-[10px] overflow-y-auto overflow-x-hidden custom-scrollbar mt-[1em] md:w-[40em] lg:w-[60em]">
                <div className={`${isLoading ? 'flex' : 'hidden'} items-center justify-center h-[100%]`}>
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
                {records.map((record, index) => ( 
                    <div key={index} className={`${isLoading ? 'hidden' : 'flex'} flex-row items-center w-[25em] h-fit pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] border-[1px] border-t-0 border-r-0 border-l-0 md:w-[40em] lg:w-[60em]`}>
                        <div className="">
                            <p>{record['type']}</p>
                            <p>{record['category']}</p>
                            <p>{record['month']} {record['day']}, {record['year']}, {record['time']}</p>
                        </div>
                        <div className="text-[1.5em] ml-auto">
                            <p>{record['amount']}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}