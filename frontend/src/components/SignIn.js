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

    const login = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        }

        await axios.post('http://127.0.0.1:8000/api/login', data, {
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            setToken(response['data']['token']);
            navigate('/home')

        }).catch(error => {
            console.log(error)
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
                        className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                        value='Sign In' />
                    <p className="mt-[1em] pointer-events-none">
                        Don't have an account?
                    </p>
                    <a href="/register"
                        className="mb-[1em]">
                        Sign Up here
                    </a>
                </form>
            </div>
        </div>
    )
}