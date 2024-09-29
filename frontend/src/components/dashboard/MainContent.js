import React, { useEffect, useState, useContext } from "react";
import FinancePieChart from "../PieChart";
import CustomButton from "../CustomButton";
import Loading from "../Loading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MyContext } from '../../MyContext';

export default function MainContent() {

    const [loading, setIsLoading] = useState(false);
    const [filterClicked, setFilterClicked] = useState(false);
    const [filteredBy, setFilteredBy] = useState('day');
    const [filterTitle, setFilterTitle] = useState('Today');

    const handleFilterClicked = () => { 
        if (filterClicked) {
            setFilterClicked(false);
        }
        else { 
            setFilterClicked(true);
        }
    }

    const navigate = useNavigate();
    const { setToken, token } = useContext(MyContext);
    const [result, setResult] = useState({
        resultValue: '',
        resultStatus: ''
    });
    const [data, setData] = useState([
        { name: 'Income', value: 0 },
        { name: 'Expenses', value: 0 },
    ]);
    const [noRecord, setNoRecord] = useState(false);

    useEffect(() => {
        const updateData = async () => {
            await axios.get('http://127.0.0.1:8000/api/data/day', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => {
                console.log(response);
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
                    setNoRecord(response['data']['noRecord']);
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => { 
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

    const filterByDay = () => {
        setFilteredBy('day');
        setFilterClicked(false);
        setFilterTitle('Today');
    }

    const filterByMonth = () => {
        setFilteredBy('month');
        setFilterClicked(false);

    }

    const filterByYear = () => {
        setFilteredBy('year');
        setFilterClicked(false);
    }

    useEffect(() => { 
        const updateData = async () => {
            await axios.get(`http://127.0.0.1:8000/api/data/${filteredBy}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(response => {
                console.log(response);
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
                    setNoRecord(response['data']['noRecord']);
                    setFilterTitle(response['data']['title']);
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => { 
            })
        };

        updateData();
    }, [filteredBy])

    return (
        <div className={`h-fit w-screen ${loading ? 'hidden' : 'flex'} flex-col items-center bg-[color:--background-gray]`}>
            <Loading isLoading={loading} />
            <h1 className={`text-[2em] font-bold ml-[1.2em] mr-[1.2em] text-center text-[color:--text-light-gray] mt-[1em]`}>You're Income and Expenses { filterTitle }</h1>
            <div>
                <div onClick={handleFilterClicked} className={`text-[1.5em] border-2 pl-[0.5em] pr-[0.5em] font-bold text-center text-[color:--text-light-gray] mt-[0.5em] hover:cursor-pointer`}>Filter ▼</div>
                <div className={`text-[1.25em] w-[8em] border-2 font-bold text-center text-[color:--text-light-gray] hover:cursor-pointer ${filterClicked ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                    <div onClick={filterByDay} className={`border-[1px] hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray] ${filterClicked ? 'animate-fadeInChildren' : 'animate-fadeOutChildren'}`}>Day</div>
                    <div onClick={filterByMonth} className={`border-[1px] hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray] animate-fadeInChildren ${filterClicked ? 'animate-fadeInChildren' : 'animate-fadeOutChildren'}`}>Month</div>
                    <div onClick={filterByYear} className={`border-[1px] hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray] animate- ${filterClicked ? 'animate-fadeInChildren' : 'animate-fadeOutChildren'}`}>Year</div>
                </div>
            </div>
            <h1 className={`${noRecord ? 'block' : 'hidden'} text-[3em] w-[15em] font-bold text-center text-[color:--text-light-gray] mt-[0.5em]`}>You got no records of income and expenses {filterTitle}</h1>
            <div className={`${noRecord ? 'hidden' : 'flex'} flex-col items-center`}>
                <FinancePieChart data={data} />
                <p className={`font-bold ${result.resultStatus === 'Saved' ? `text-[#32CD32]` : `text-[#D71515]`}`}>{`You ${result.resultStatus} ${result.resultValue} ${filterTitle}`}</p>
            </div>
            <div className={`w-fit h-fit flex flex-row items-center gap-x-[1em]`}>
                <CustomButton onClickFunction={toAddIncomeForm} buttonValue={"Add Income"} />
                <CustomButton onClickFunction={toAddExpenseForm} buttonValue={"Add Expense"} />
            </div>
            <CustomButton onClickFunction={logout} buttonValue={"Logout"} customStyles={"mt-[2em] mb-[2em]"} />
        </div>
    )
}