import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const register = async (event) => {
        event.preventDefault();

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
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

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
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray]">
            <div className="w-[20em] h-fit bg-[color:--border-dark-gray] border-2 border-[color:--border-light-gray] text-[color:--text-light-gray] mt-[2.5em] rounded-[10px] flex flex-col items-center">
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
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <label
                        className="mt-[1em]">
                        Email:
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={emailChange}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <label
                        className="mt-[1em]">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <label
                        className="mt-[1em]">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={passwordConfirmChange}
                        className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]" />
                    <input
                        type="submit"
                        value='Sign Up'
                        className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out" />
                    <p
                        className="mt-[1em] pointer-events-none">
                        Already have an account?
                    </p>
                    <a
                        href="/login"
                        className="mb-[1em]">
                        Sign In here
                    </a>
                </form>
            </div>
        </div>
    )
}