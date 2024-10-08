import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { MyContext } from "../MyContext";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
    const navigate = useNavigate();
    const { isDarkMode } = useContext(MyContext);

    const toSignIn = () => {
        navigate('/login');
    }

    const toSignUp = () => {
        navigate('/register');
    }

    return (
        <div className={`w-screen h-screen flex flex-col items-center ${isDarkMode === 'On' ? 'bg-[color:--background-gray] text-[color:--text-light-gray]' : 'bg-[color:--text-light-gray] text-[color:--background-gray]'}`}>
            <DarkModeToggle />
            <div className="w-[25em] h-fit flex flex-col items-center mt-[8.5em] md:mt-[11em]">
                <h1 className="text-[2.9em] font-bold w-[10em] md:w-[20em] h-fit text-center">
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