import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

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
                    <CustomButton onClickFunction={toSignIn} buttonValue={"Sign in here"} />
                    <CustomButton onClickFunction={toSignUp} buttonValue={"Sign up here"} />
                </div>
            </div>
        </div>
    )
}