import React from "react";
import FinancePieChart from "../PieChart";

export default function MainContent({ isLoading, data, customizedLabel, colors, logout, addIncome, addExpense }) {
    return (
        <div className={`h-fit w-fit ${isLoading ? 'hidden' : 'flex'} flex-col items-center bg-[color:--background-gray]`}>
            <h1 className={`text-[2em] font-bold text-center text-[color:--text-light-gray] mt-[1em]`}>You're Income and Expenses Today</h1>
            <FinancePieChart data={data} customizedLabel={customizedLabel} colors={colors} />

            <div className={`w-fit h-fit flex flex-row items-center gap-x-[1em]`}>
                <button
                    onClick={addIncome}
                    className='bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out'>
                    Add Income
                </button>
                <button
                    onClick={addExpense}
                    className='bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[1.5em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out'>
                    Add Expense
                </button>
            </div>
            <button
                className='bg-[color:--background-dark-slate] border-2 rounded-[10px] mt-[2em] mb-[2em] p-[0.5em] text-[color:--text-light-gray] font-bold hover:cursor-pointer hover:bg-[color:--text-light-gray] hover:text-[color:--background-dark-slate] hover:border-[color:--border-dark-gray] transition-all duration-[0.3s] ease-in-out'
                onClick={logout}>
                Logout
            </button>
        </div>
    )
}