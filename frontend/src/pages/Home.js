import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const toSignIn = () => {
        navigate('/login');
    }

    const toSignUp = () => {
        navigate('/register');
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray] text-[color:--text-light-gray]">
            <div className="w-[25em] h-fit flex flex-col items-center mt-[10.5em]">
                <h1 className="text-[2.9em] font-bold w-fit h-fit text-center">
                    Personal Finance Dashboard by Jhio
                </h1>
                <div className="flex flex-row gap-x-[2em]">
                    <button className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                        onClick={toSignIn}>
                        Sign in here
                    </button>
                    <button className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out"
                        onClick={toSignUp}>
                        Sign up here
                    </button>
                </div>
            </div>
        </div>
    )
}