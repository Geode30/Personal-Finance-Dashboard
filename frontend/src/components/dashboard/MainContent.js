import React, { useEffect, useState, useContext } from "react";
import FinancePieChart from "../PieChart";
import CustomButton from "../CustomButton";
import Loading from "../Loading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MyContext } from '../../MyContext';
import FilterOptions from "../FilterOptions";
import ProgressChart from "../ProgressChart";
import DarkModeToggle from "../DarkModeToggle";

export default function MainContent({ logout, loading }) {

    const [filterClicked, setFilterClicked] = useState(false);
    const [filteredBy, setFilteredBy] = useState('day');
    const [filterTitle, setFilterTitle] = useState('Today');
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');

    const handleFilterClicked = () => { 
        if (filterClicked) {
            setFilterClicked(false);
        }
        else { 
            setFilterClicked(true);
        }
    }

    useEffect(() => { 
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [])

    const navigate = useNavigate();
    const { isDarkMode, token } = useContext(MyContext);
    const [result, setResult] = useState({
        resultValue: 0,
        resultStatus: ''
    });
    const [data, setData] = useState([
        { name: 'Income', value: 0 },
        { name: 'Expenses', value: 0 },
    ]);
    const [noRecord, setNoRecord] = useState(true);
    const [financials, setFinancials] = useState({
        budget: 0,
        goal: 0
    });

    useEffect(() => { 
        console.log('Token: ', token);
    }, [])

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
                    setUserName(response['data']['username']);
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
                    setFinancials({
                        budget: response['data']['budget'],
                        goal: response['data']['goal']
                    })
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => { 
            })
        };

        updateData();
    }, []);

    //Navigation Functions

    const toAddIncomeForm = () => {
        navigate('/income/add');
    }

    const toAddExpenseForm = () => {
        navigate('/expense/add');
    }

    const toAddHistoryPage = () => {
        navigate('/entry/history');
    }

    const toSetGoalsPage = () => {
        navigate('/set/goals');
    }

    const toSetBudgetsPage = () => {
        navigate('/set/budgets');
    }

    //Filter Click Functions

    const filterByDay = () => {
        setFilteredBy('day');
        setFilterClicked(false);
    }

    const filterByWeek = () => {
        setFilteredBy('week');
        setFilterClicked(false);
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
                    setFinancials({
                        budget: response['data']['budget'],
                        goal: response['data']['goal']
                    })
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
        <div className={`h-[350vh] w-screen ${loading ? 'hidden' : 'flex'} flex-col items-center ${isDarkMode === 'On' ? 'bg-[color:--background-gray] text-[color:--text-light-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-gray]'}`}>
            <div className={`${isLoading ? 'hidden' : 'flex'} ml-auto`}>
                <DarkModeToggle />
            </div>
            <Loading isLoading={isLoading} />
            <h1 className={`text-[2em] w-[10em] md:w-[20em] font-bold ml-[1.2em] mr-[1.2em] text-center mt-[1em]`}>Hello, { userName }!</h1>
            <div className={`w-[40em] md:w-[40em] border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} mt-[2.5em]`}></div>
            <h1 className={`text-[2em] w-[10em] md:w-[20em] font-bold ml-[1.2em] mr-[1.2em] text-center  mt-[1em]`}>Your income and expenses { filterTitle }</h1>
            <div>
                <div onClick={handleFilterClicked} className={`text-[1.5em] select-none border-2 ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} pl-[0.5em] pr-[0.5em] font-bold text-center mt-[0.5em] hover:cursor-pointer`}>Filter ▼</div>
                <div className={`text-[1.25em] w-[8em] border-2 font-bold text-center  hover:cursor-pointer opacity-0 ${filterClicked ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                    <FilterOptions onClickFunction={filterByDay} filterClicked={filterClicked} optionValue={'Day'} />
                    <FilterOptions onClickFunction={filterByWeek} filterClicked={filterClicked} optionValue={'Week'} />
                    <FilterOptions onClickFunction={filterByMonth} filterClicked={filterClicked} optionValue={'Month'} />
                    <FilterOptions onClickFunction={filterByYear} filterClicked={filterClicked} optionValue={'Year'} />
                </div>
            </div>
            <h1 className={`${noRecord ? 'block' : 'hidden'} text-[2em] w-[10em] md:w-[15em] font-bold text-center  mt-[0.5em]`}>You got no records of income and expenses {filterTitle}</h1>
            <div className={`${noRecord ? 'hidden' : 'flex'} flex-col items-center`}>
                <FinancePieChart data={data} />
                <p className={`font-bold ${result.resultStatus === 'Saved' ? `text-[#32CD32]` : `text-[#D71515]`}`}>{`You ${result.resultStatus} ${result.resultValue} ${filterTitle}`}</p>

                <div className={`w-[40em] md:w-[50em] border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} mt-[2.5em]`}></div>

                <h1 className={`${financials.goal === 0 ? 'block' : 'hidden'} text-[2em] w-[12em] md:w-[20em] font-bold ml-[1.2em] mr-[1.2em] text-center  mt-[1em]`}>You have not set a goal {filterTitle}</h1>
                <div className={`${financials.goal === 0 ? 'hidden' : 'flex'} flex-col items-center`}>
                    <h1 className={`text-[2em] w-[12em] md:w-[25em] font-bold ml-[1.2em] mr-[1.2em] text-center  mt-[1em]`}>Your progress toward achieving your goal {filterTitle}</h1>
                    <ProgressChart key1={'Savings'} value1={result.resultValue} key2={'Goal'} value2={financials.goal} fill1={'#4CAF50'} fill2={'#007bff'} />
                </div>
                <div className={`w-[45em] border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} mt-[2.5em]`}></div>
                <h1 className={`${financials.budget === 0 ? 'block' : 'hidden'} text-[2em] w-[15em] md:w-[25em] font-bold ml-[1.2em] mr-[1.2em] text-center  mt-[1em]`}>You have not set a budget {filterTitle}</h1>
                <div className={`${financials.budget === 0 ? 'hidden' : 'flex'} flex-col items-center`}>
                    <h1 className={`w-[14em] md:w-[25em] text-[2em] font-bold ml-[1.2em] mr-[1.2em] text-center  mt-[1em]`}>Expense VS. Budget {filterTitle}</h1>
                    <ProgressChart key1={'Expense'} value1={data.find(item => item.name === 'Expenses').value} key2={'Budget'} value2={financials.budget} fill1={'#ff3b30'} fill2={'#4CAF50'} />
                </div>
            </div>
            <div className={`w-[35em] border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} mt-[2.5em]`}></div>
            <div className={`w-[25em] md:w-fit h-fit flex flex-row flex-wrap justify-center items-center gap-x-[1em]`}>
                <CustomButton onClickFunction={toAddIncomeForm} buttonValue={"Add Income"} />
                <CustomButton onClickFunction={toAddExpenseForm} buttonValue={"Add Expense"} />
                <CustomButton onClickFunction={toAddHistoryPage} buttonValue={"History"} />
                <CustomButton onClickFunction={toSetBudgetsPage} buttonValue={"Set Budget"} />
                <CustomButton onClickFunction={toSetGoalsPage} buttonValue={"Set Goal"} />
            </div>
            <div className={`w-[35em] border-[1px] ${isDarkMode === 'On' ? 'border-[color:--text-light-gray]' : 'border-[color:--background-gray]'} mt-[2.5em]`}></div>
            <CustomButton onClickFunction={logout} buttonValue={"Logout"} customStyles={`mt-[2em] mb-[2em] ${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate] text-[color:--text-light-gray] border-[color:--text-light-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray] hover:bg-[color:--background-dark-slate] hover:text-[color:--text-light-gray] hover:border-[color:--border-dark-gray]'}`} />
        </div>
    )
}