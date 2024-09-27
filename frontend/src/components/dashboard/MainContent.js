import React from "react";
import FinancePieChart from "../PieChart";
import CustomButton from "../CustomButton";

export default function MainContent({ isLoading, data, customizedLabel, colors, logout, addIncome, addExpense, resultValue, resultStatus }) {
    return (
        <div className={`h-fit w-screen ${isLoading ? 'hidden' : 'flex'} flex-col items-center bg-[color:--background-gray]`}>
            <h1 className={`text-[2em] font-bold text-center text-[color:--text-light-gray] mt-[1em]`}>You're Income and Expenses Today</h1>
            <FinancePieChart data={data} customizedLabel={customizedLabel} colors={colors} />
            <p className={`font-bold ${resultStatus === 'Saved' ? `text-[#32CD32]` : `text-[#D71515]`}`}>{`You ${resultStatus} ${resultValue} Today`}</p>
            <div className={`w-fit h-fit flex flex-row items-center gap-x-[1em]`}>
                <CustomButton onClickFunction={addIncome} buttonValue={"Add Income"} />
                <CustomButton onClickFunction={addExpense} buttonValue={"Add Expense"} />
            </div>
            <CustomButton onClickFunction={logout} buttonValue={"Logout"} customStyles={"mt-[2em] mb-[2em]"} />
        </div>
    )
}