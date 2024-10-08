import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

export default function AddExpenseForm() {
    const navigate = useNavigate();
    const { token, isDarkMode } = useContext(MyContext);
    const [data, setData] = useState({
        type: 'Expense',
        category: '',
        amount: '',
    });
    const [message, setMessage] = useState('');
    const [messageShown, setMessageShown] = useState(false);
    const [operationSuccess, setOperationSuccess] = useState(false);

    const setCategory = (event) => {
        setData(prevData => ({
            ...prevData,
            category: event.target.value
        }))
    }

    const setAmount = (event) => {
        setData(prevData => ({
            ...prevData,
            amount: event.target.value
        }))
    }

    useEffect(() => {
        if (operationSuccess) { 
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        }
    }, [operationSuccess]);

    const addExpense = async (event) => {
        event.preventDefault();

        console.log(data);

        await axios.post('http://127.0.0.1:8000/api/expense/add', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        }).then(response => {
            console.log(response);
            if (response['data']['message'] === 'Expense Successfully Added') {
                setMessage(response['data']['message']);
                setOperationSuccess(true);
            }
            else {
                setMessage('Something is wrong');
            }
        }).catch(error => {
            console.log(error);
            setMessage('Something is wrong');
        }).finally(() => {
            setMessageShown(true);
            setTimeout(() => {
                setMessageShown(false);
            }, 1000);
        })
    }

    return (
        <div className={`h-screen w-screen ${isDarkMode === 'On' ? 'bg-[color:--background-gray] text-[color:--text-light-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-gray]'} flex flex-col items-center`}>
            <DarkModeToggle mbValue={'mb-[5em]'} />
            <div className={`h-screen w-screen ${messageShown ? 'flex' : 'hidden'} justify-center items-center absolute bg-[rgba(255,255,255,0.2)]`}>
                <div className="h-[4em] w-[20em] rounded-[10px] absolute bg-[rgba(30,30,30,0.95)] text-white text-center pt-[1.2em]">{operationSuccess ? message : 'Operations Failed'}</div>
            </div>
            <div className={`h-fit w-[20em] ${isDarkMode === 'On' ? 'bg-[color:--border-dark-gray] border-[color:--text-light-gray]' : 'bg-[color:--text-light-gray] border-[color:--border-dark-gray]'} border-[2px] flex flex-col items-center rounded-[10px] pb-[2em]`}>
                <form
                    onSubmit={addExpense}
                    className="h-max w-max flex flex-col items-center  font-bold">
                    <p className="text-[2em] font-bold mt-[1em]">
                        Add Expense
                    </p>
                    <label
                        className="mt-[1em]">
                        Expense Category:
                    </label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={setCategory}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <label className="mt-[1em]">
                        Expense Amount:
                    </label>
                    <input
                        type="text"
                        value={data.amount}
                        onChange={setAmount}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <input type="submit"
                            className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate] text-[color:--text-light-gray] border-[color:--text-light-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray] hover:bg-[color:--background-dark-slate] hover:text-[color:--text-light-gray] hover:border-[color:--border-dark-gray]'} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer transition-all duration-[0.3s] ease-in-out`}
                        value='Submit' />
                </form>
            </div>
        </div>
    )
}