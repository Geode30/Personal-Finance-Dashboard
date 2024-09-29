import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

export default function AddIncomeForm() {
    const navigate = useNavigate();
    const { token } = useContext(MyContext);
    const [data, setData] = useState({
        type: 'Income',
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

    const addIncome = async (event) => {
        event.preventDefault();

        console.log(data);

        await axios.post('http://127.0.0.1:8000/api/income/add', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        }).then(response => {
            if (response['data']['message'] === 'Income Successfully Added') {
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
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center justify-center'>
            <div className={`${messageShown ? 'block' : 'hidden'} h-[4em] w-[15em] border-2 pt-[1em] bg-[rgba(255,255,255,0.8)] text-center font-bold rounded-[10px] absolute`}>{message}</div>
            <div className="h-fit w-[20em] bg-[color:--border-dark-gray] flex flex-col items-center rounded-[10px]">
                <form
                    onSubmit={addIncome}
                    className="h-max w-max flex flex-col items-center text-[color:--text-light-gray] font-bold">
                    <p className="text-[2em] font-bold mt-[1em]">
                        Add Income
                    </p>
                    <label
                        className="mt-[1em]">
                        Income Category:
                    </label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={setCategory}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <label className="mt-[1em]">
                        Income Amount:
                    </label>
                    <input
                        type="text"
                        value={data.amount}
                        onChange={setAmount}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <input type="submit"
                        className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] mb-[2em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                        value='Submit' />
                </form>
            </div>
        </div>
    )
}