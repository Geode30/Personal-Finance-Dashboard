import React, {useState, useContext} from "react";
import axios from 'axios';
import { MyContext } from '../MyContext';

export default function SetForm({ title, set, apiEndpoint, weekly, monthly, yearly }) {
    const { token } = useContext(MyContext);

    const [weekValue, setWeekValue] = useState('0');
    const [monthValue, setMonthValue] = useState('0');
    const [yearValue, setYearValue] = useState('0');

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center justify-center'>
            <div className="h-fit w-[20em] bg-[color:--border-dark-gray] flex flex-col items-center rounded-[10px]">
                <form
                    onSubmit={e => { 
                        e.preventDefault();
        
                        const data = {
                            [weekly]: weekValue,
                            [monthly]: monthValue,
                            [yearly]: yearValue
                        }
        
                        axios.post(`http://127.0.0.1:8000/api/set/${apiEndpoint}`, data, {
                            headers: {
                                Accept: 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        }).then(response => { 
                            if (response['data']['message'] === 'Savings Goals Set Successfully') { 
        
                            }
                        }).catch(error => { 
                            console.log(error);
                        })
                    }}
                    className="h-max w-max flex flex-col items-center text-[color:--text-light-gray] font-bold">
                <p className="text-[2em] font-bold mt-[1em]">{title}</p>

                <label className="mt-[1em]">Set {set} for this week</label>
                <input
                    type="text"
                    value={weekValue}
                    onChange={e => { 
                        setWeekValue(e.target.value);
                    }}
                    className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                
                <label className="mt-[1em]">Set {set} for this month</label>
                <input
                    type="text"
                    value={monthValue}
                    onChange={e => { 
                        setMonthValue(e.target.value);
                    }}
                    className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                
                <label className="mt-[1em]">Set {set} for this year</label>
                <input
                    type="text"
                    value={yearValue}
                    onChange={e => { 
                        setYearValue(e.target.value);
                    }}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                
                <input
                    type="submit"
                    className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] mb-[2em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                    value='Submit' />
            </form>
        </div>
        </div>
    )
}