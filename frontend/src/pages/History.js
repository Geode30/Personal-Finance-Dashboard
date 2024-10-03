import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { MyContext } from '../MyContext';
import CustomButton from "../components/CustomButton";
import FilterOptions from "../components/FilterOptions";
import Loading from "../components/Loading";

export default function History() {
    const { token } = useContext(MyContext);
    const [records, setRecords] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [filterClicked, setFilterClicked] = useState(false);
    const [month, setMonth] = useState('');
    const [type, setType] = useState('');
    const [recordAvailable, setRecordAvailable] = useState(false);
    
    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ];

    const optionFunction = (value) => { 
        setMonth(value);
        setFilterClicked(false);
    }

    useEffect(() => { 
        setTimeout(() => {
            setInitialLoading(false);
        }, 1000);
    }, [])

    useEffect(() => { 
        console.log(recordAvailable)
    }, [recordAvailable])

    const selectedURL = () => { 
        let url = 'http://127.0.0.1:8000/api/entry/history';

        if (type) { 
            url = `http://127.0.0.1:8000/api/entry/history/type/${type}`;
        }

        if (month) { 
            url = `http://127.0.0.1:8000/api/entry/history/month/${month}`;
        }

        if (type && month) { 
            url = `http://127.0.0.1:8000/api/entry/history/type/month/${type}/${month}`
        }

        return url;
    }

    useEffect(() => { 
        const fetchRecords = async () => {
            setRecordAvailable(true);
            setIsLoading(true);
            await axios.get(selectedURL(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => { 
                if (response['data']['message'] === 'Successful') { 
                    setRecords(prevRecords => [
                        ...response['data']['records']
                    ]);
                    
                    debugger;
                    if (response['data']['records'].length === 0) {
                        setRecordAvailable(false);
                    } else { 
                        setRecordAvailable(true);
                    }
                }
            }).then(error => { 
                console.log(error);
            }).finally(() => { 
                setIsLoading(false);
            })
        }
        fetchRecords();
    }, [month, type])

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray] text-[color:--text-light-gray] pb-[2em]">
            <Loading isLoading={initialLoading}/>
            <h1 className={`${initialLoading ? 'hidden' : 'block'} text-[2em] font-bold mt-[0.5em]`}>Entry History</h1>
            <div className={`${initialLoading ? 'opacity-0' : 'opacity-100'} flex flex-row w-[25em] gap-x-[1em] ml-[4em]`}>
                <CustomButton
                    customStyles={`${type === 'Income' ? 'text-[color:--background-dark-slate] bg-[color:--text-light-gray]' : 'bg-[color:--background-dark-slate] text-[color:--text-light-gray]'}`}
                    onClickFunction={() => { 
                    setType('Income');
                }} buttonValue={'Income'} />
                <CustomButton
                    customStyles={`${type === 'Expense' ? 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray]' : 'bg-[color:--background-dark-slate] text-[color:--text-light-gray]'}`}
                    onClickFunction={() => { 
                    setType('Expense');
                }} buttonValue={'Expense'} />

                <div>
                    <div
                        className={`${month ? 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray]': 'bg-[color:--background-dark-slate] text-[color:--text-light-gray]'} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out`}
                        onClick={() => { 
                                if (filterClicked) {
                                    setFilterClicked(false);
                                }
                                else { 
                                    setFilterClicked(true);
                                }
                        }}>{month ? month : 'Month'} ▼
                    </div>
                    <div className={`absolute flex-col hover:cursor-pointer w-[10em] bg-[color:--background-gray] text-center mt-[0.2em] ${filterClicked ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                    {months.map((month) => (
                        <FilterOptions
                            key={month}
                            onClickFunction={() => optionFunction(month)}
                            filterClicked={filterClicked}
                            optionValue={month}
                        />
                    ))}
                    </div>
                </div>

                <CustomButton
                    onClickFunction={() => { 
                    setType('');
                    setMonth('');
                }} buttonValue={'All'}/>
                </div>
            <div className={`${initialLoading ? 'opacity-0' : 'opacity-100'} flex flex-col items-center w-[25em] h-[30em] border-[2px] rounded-[10px] overflow-y-auto overflow-x-hidden custom-scrollbar mt-[1em] md:w-[40em] lg:w-[60em]`}>
                <div className={`${isLoading ? 'flex' : 'hidden'} items-center justify-center h-[100%]`}>
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
                <div className={`${recordAvailable ? 'hidden' : 'block'} mt-[4em] text-center ml-[0.5em] mr-[0.5em] text-[3em] font-bold`}>You've got no Records</div>
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