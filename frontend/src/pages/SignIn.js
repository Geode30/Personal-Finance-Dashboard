import { useContext, useState } from "react";
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

export default function Signin() {

    const navigate = useNavigate();
    const { setToken } = useContext(MyContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setIsLoginSuccess] = useState(false);
    const [successMsgShown, setSuccessMsgShown] = useState(false);

    const showSuccessMsg = () => {
        setIsLoading(false);
        setSuccessMsgShown(true);
        setTimeout(() => {
            setSuccessMsgShown(false);
        }, 1000);
    }

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
            if (response['data']['message'] === 'User Logged in Successfully') {
                setToken(response['data']['token']);
                console.log(response['data']['token']);
                setIsLoginSuccess(true);
                setIsLoading(false);
                setSuccessMsgShown(true);
                navigate('/dashboard');
            }
            else {
                setIsLoginSuccess(false);
                showSuccessMsg();
            }
        }).catch(error => {
            console.log(error);
            setIsLoginSuccess(false);
            showSuccessMsg();
        })
    }

    const emailChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray]">
            <div className={`h-screen w-screen ${successMsgShown ? 'flex' : 'hidden'} justify-center items-center absolute bg-[rgba(255,255,255,0.2)]`}>
                <div className="h-[4em] w-[20em] rounded-[10px] absolute bg-[rgba(30,30,30,0.95)] text-white text-center pt-[1.2em]">{loginSuccess ? 'Login Successful' : 'Login Failed'}</div>
            </div>
            {isLoading ?
                <div className="flex items-center justify-center min-h-screen">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
                :
                <div className="w-[20em] h-fit bg-[color:--border-dark-gray] border-2 border-[color:--border-light-gray] text-[color:--text-light-gray] mt-[8em] rounded-[10px] flex flex-col items-center">
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
                            className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                        <label className="mt-[1em]">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={passwordChange}
                            className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                        <input type="submit"
                            className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                            value='Sign In' />
                        <p className="mt-[1em] pointer-events-none">
                            Don't have an account?
                        </p>
                        <a href="/register"
                            className="mb-[1em]">
                            Sign Up here
                        </a>
                    </form>
                </div>}
        </div>
    )
}