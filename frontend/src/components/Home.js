import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

export default function Home() {

    const navigate = useNavigate();
    const { setToken, token } = useContext(MyContext);

    const logout = async () => {
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }).then(response => {
            setToken('No Token');
            navigate('/login');

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-y-[1em] justify-center bg-[color:--background-gray]">
            <div className="w-fit h-fit flex justify-center items-center text-[2em] font-bold text-[color:--text-light-gray]">
                You are signed in
            </div>
            <button className="w-[4em] h-[3em] text-[color:--text-light-gray] bg-[color:--border-dark-gray] border-2 rounded-[10px] border-[color:--text-light-gray] text-[1em] font-bold hover:bg-[color:--text-light-gray] hover:text-[color:--background-gray] hover:border-black"
                onClick={logout}>
                Logout
            </button>
        </div>
    )
}