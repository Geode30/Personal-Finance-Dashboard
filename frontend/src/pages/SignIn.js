import { useContext, useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';
import DarkModeToggle from "../components/DarkModeToggle";

export default function Signin() {

    const navigate = useNavigate();
    const { setToken, isDarkMode } = useContext(MyContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setIsLoginSuccess] = useState(false);
    const [successMsgShown, setSuccessMsgShown] = useState(false);

    useEffect(() => { 
        if (loginSuccess) { 
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        }
    }, [loginSuccess])

    const login = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            email: email,
            password: password,
        }

        await axios.post('http://127.0.0.1:8000/api/login', data, {
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            console.log(response);
            if (response['data']['message'] === 'User Logged in Successfully') {
                setToken(response['data']['token']);
                setIsLoginSuccess(true);
            }
            else {
                setIsLoginSuccess(false);
            }
        }).catch(error => {
            console.log(error);
            setIsLoginSuccess(false);
        }).finally(() => { 
            setIsLoading(false);
            setSuccessMsgShown(true);
            setTimeout(() => {
                setSuccessMsgShown(false);
            }, 500);
        })
    }

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className={`w-screen h-screen flex flex-col items-center ${isDarkMode === 'On' ? 'bg-[color:--background-gray]' : 'bg-[color:--text-light-gray]'}`}>
            <div className={`${isLoading ? 'hidden' : 'flex'} mb-[3.5em] ml-auto`}>
                <DarkModeToggle />
            </div>
            <div className={`h-screen w-screen ${successMsgShown ? 'flex' : 'hidden'} justify-center items-center absolute bg-[rgba(255,255,255,0.2)]`}>
                <div className="h-[4em] w-[20em] rounded-[10px] absolute bg-[rgba(30,30,30,0.95)] text-white text-center pt-[1.2em]">{loginSuccess ? 'Login Successful' : 'Login Failed'}</div>
            </div>
            {isLoading ?
                <div className="flex items-center justify-center min-h-screen">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
                :
                <div className={`w-[20em] h-fit border-2 ${isDarkMode === 'On' ? 'text-[color:--text-light-gray] bg-[color:--border-dark-gray] border-[color:--text-light-gray]' : 'text-[color:--background-gray] bg-[color:--text-light-gray] border-[color:--background-gray]'} rounded-[10px] flex flex-col items-center`}>
                    <form onSubmit={login}
                        className="w-max h-max flex flex-col items-center">
                        <p className="text-[2em] font-bold mt-[1em]">
                            Sign In
                        </p>
                        <label
                            className="mt-[1em]">
                            Email:
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={emailChange}
                            className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                        <label className="mt-[1em]">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={passwordChange}
                            className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate]' : 'bg-[color:--text-light-gray] border-[color:--background-gray]'} border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]`} />
                        <input type="submit"
                            className={`${isDarkMode === 'On' ? 'bg-[color:--background-dark-slate] text-[color:--text-light-gray] border-[color:--text-light-gray] hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-dark-slate] border-[color:--border-dark-gray] hover:bg-[color:--background-dark-slate] hover:text-[color:--text-light-gray] hover:border-[color:--border-dark-gray]'} border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer transition-all duration-[0.3s] ease-in-out`}
                            value='Sign In' />
                        <p className="mt-[1em] pointer-events-none">
                            Don't have an account?
                        </p>
                        <a 
                            onClick={() => { 
                                navigate('/register');
                            }}
                            className="mb-[1em] hover:cursor-pointer">
                            Sign Up here
                        </a>
                    </form>
                </div>}
        </div>
    )
}