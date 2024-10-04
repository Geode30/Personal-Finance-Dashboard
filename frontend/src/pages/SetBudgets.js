import React from "react";
import SetForm from "../components/SetForm";

export default function SetBudgets() {

    return (
        <SetForm
            title={'Set Budgets'}
            set={'Budget'}
            weekly={'weekly_budget'}
            monthly={'monthly_budget'}
            yearly={'yearly_budget'}
            apiEndpoint={'budgets'}
        />
    )
}