import React, {useState, useContext, useEffect} from "react";
import axios from 'axios';
import { MyContext } from '../MyContext';
import Loading from './Loading';

export default function SetForm({ title, set, apiEndpoint, daily, weekly, monthly, yearly, statusSuccessMsg }) {
    const { token } = useContext(MyContext);

    const [dayValue, setDayValue] = useState('0');
    const [weekValue, setWeekValue] = useState('0');
    const [monthValue, setMonthValue] = useState('0');
    const [yearValue, setYearValue] = useState('0');

    const [isLoading, setIsLoading] = useState(false);
    const [statusMsgShown, setStatusMsgShown] = useState(false);
    const [statusSuccess, setStatusSuccess] = useState(false);

    const onChangeHandler = (e, setFunction) => { 
        setFunction(e.target.value);
        let value = e.target.value;
        if (value === '' || value === '00') {
            setFunction('0');
        }
        else { 
            value = value.replace(/^0+/, '');
            setFunction(value);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://127.0.0.1:8000/api/get/${apiEndpoint}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response);
            if (response['data']['message'] === 'Successful') {
                setDayValue(response['data'][apiEndpoint][daily]);
                setWeekValue(response['data'][apiEndpoint][weekly]);
                setMonthValue(response['data'][apiEndpoint][monthly]);
                setYearValue(response['data'][apiEndpoint][yearly]);
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => { 
            setIsLoading(false);
        })
    }, []);

    return (
        <div className='h-screen w-screen bg-[color:--background-gray] flex flex-col items-center justify-center'>
            <Loading isLoading={isLoading} />
            <div className={`h-screen w-screen ${statusMsgShown ? 'flex' : 'hidden'} justify-center items-center absolute bg-[rgba(255,255,255,0.2)]`}>
                <div className="h-[4em] w-[20em] rounded-[10px] absolute bg-[rgba(30,30,30,0.95)] text-white text-center pt-[1.2em]">{statusSuccess ? statusSuccessMsg : 'Operations Failed'}</div>
            </div>
            <div className={`${isLoading ? 'hidden' : 'flex'} h-fit w-[20em] bg-[color:--border-dark-gray] flex-col items-center rounded-[10px]`}>
                <form
                    onSubmit={e => { 
                        e.preventDefault();
                        setIsLoading(true);
                        const data = {
                            [daily]: dayValue,
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
                            if (response['data']['message'] === statusSuccessMsg) {
                                setStatusSuccess(true);
                            } else { 
                                setStatusSuccess(false);
                            }
                        }).catch(error => { 
                            console.log(error);
                            setStatusSuccess(false);
                        }).finally(()=> {
                            setIsLoading(false);
                            setStatusMsgShown(true);
                            setTimeout(() => { 
                                setStatusMsgShown(false);
                            }, 1000)
                        })
                    }}
                    className="h-max w-max flex flex-col items-center text-[color:--text-light-gray] font-bold">
                <p className="text-[2em] font-bold mt-[1em]">{title}</p>
                <label className="mt-[1em]">Set {set} for this day</label>
                <input
                    type="text"
                    value={dayValue}
                    onChange={e => { 
                        onChangeHandler(e, setDayValue);
                    }}
                    className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                <label className="mt-[1em]">Set {set} for this week</label>
                <input
                    type="text"
                    value={weekValue}
                    onChange={e => { 
                        onChangeHandler(e, setWeekValue);
                    }}
                    className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                <label className="mt-[1em]">Set {set} for this month</label>
                <input
                    type="text"
                    value={monthValue}
                    onChange={e => { 
                        onChangeHandler(e, setMonthValue);
                    }}
                    className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                <label className="mt-[1em]">Set {set} for this year</label>
                <input
                    type="text"
                    value={yearValue}
                    onChange={e => { 
                        onChangeHandler(e, setYearValue);
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