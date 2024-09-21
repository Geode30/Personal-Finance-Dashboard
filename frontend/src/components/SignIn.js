import React from "react";

export default function Signin() {

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-[color:--background-gray]">
            <div className="w-[20em] h-fit bg-[color:--border-dark-gray] border-2 border-[color:--border-light-gray] text-[color:--text-light-gray] mt-[8em] rounded-[10px] flex flex-col items-center">
                <form className="w-max h-max flex flex-col items-center">
                    <p className="text-[2em] font-bold mt-[1em]">Sign In</p>
                    <label className="mt-[1em]">Name:</label>
                    <input type="text" className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]"></input>
                    <label className="mt-[1em]">Password:</label>
                    <input type="password" className="bg-[color:--background-dark-slate] border-2 rounded-[5px] p-[0.3em] w-[16em] mt-[0.5em]"></input>
                    <input type="submit" className="bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out" value='Sign Up'></input>
                    <p className="mt-[1em] pointer-events-none">Don't have an account?</p>
                    <a href="/register" className="mb-[1em]">Sign Up here</a>
                </form>
            </div>
        </div>
    )
}