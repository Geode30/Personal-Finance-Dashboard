import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';
import DarkModeToggle from "../components/DarkModeToggle";

export default function SignUp() {

    const navigate = useNavigate();
    const { isDarkMode } = useContext(MyContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [successMsgShown, setSuccessMsgShown] = useState(false);

    const register = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirm
        }

        await axios.post('http://127.0.0.1:8000/api/register', data, {
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            console.log(response);
            if (response['data']['message'] === 'User Created Successfully') { 
                setRegisterSuccess(true);
            }
        }).catch(error => {
            console.log(error)
            setRegisterSuccess(false);
        }).finally(() => { 
            setIsLoading(false);
            setSuccessMsgShown(true);
            setTimeout(() => {
                setSuccessMsgShown(false);
            }, 1000);
        })
    }

    useEffect(() => {
        if (registerSuccess) { 
            setTimeout(() => { 
                navigate('/login');
            }, [1200])
        }

    }, [registerSuccess])

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const passwordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };


    return (
        <div className={`w-screen h-fit pb-[2em] flex flex-col items-center ${isDarkMode === 'On' ? 'bg-[color:--background-gray]' : 'bg-[color:--text-light-gray]'}`}>
            <div className={`${isLoading ? 'hidden' : 'flex'} ml-auto`}>
                <DarkModeToggle mtValue={'mt-[1em]'} />
            </div>
            <div className={`h-screen w-screen ${successMsgShown ? 'flex' : 'hidden'} justify-center items-center absolute bg-[rgba(255,255,255,0.2)]`}>
                <div className="h-[4em] w-[20em] rounded-[10px] absolute bg-[rgba(30,30,30,0.95)] text-white text-center pt-[1.2em]">{registerSuccess ? 'User Created Successfully' : 'Operations Failed'}</div>
            </div>
            {isLoading ? <div className="flex items-center justify-center min-h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
            </div> : <div className={`w-[20em] h-fit border-2 ${isDarkMode === 'On' ? 'text-[color:--text-light-gray] bg-[color:--border-dark-gray] border-[color:--text-light-gray]' : 'text-[color:--background-gray] bg-[color:--text-light-gray] border-[color:--background-gray]'} rounded-[10px] flex flex-col items-center`}>
                <form onSubmit={register}
                    className="w-max h-max flex flex-col items-center">
                    <p
                        className="text-[2em] font-bold mt-[1em]">
                        Sign Up
                    </p>
                    <label
                        className="mt-[1em]">
                        Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={nameChange}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <label
                        className="mt-[1em]">
                        Email:
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={emailChange}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <label
                        className="mt-[1em]">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <label
                        className="mt-[1em]">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={passwordConfirmChange}
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                    <input
                        type="submit"
                        value='Sign Up'
                        className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate] text-[color:--text-light-gray] border-[color:--text-light-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray] hover:bg-[color:--background-dark-slate] hover:text-[color:--text-light-gray] hover:border-[color:--border-dark-gray]'} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer transition-all duration-[0.3s] ease-in-out`} />
                    <p
                        className="mt-[1em] pointer-events-none">
                        Already have an account?
                    </p>
                    <a
                        onClick={() => { 
                            navigate('/login');
                        }}
                        className="mb-[1em] hover:cursor-pointer">
                        Sign In here
                    </a>
                </form>
            </div>}
        </div>
    )
}