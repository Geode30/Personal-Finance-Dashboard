import React from "react";
import SetForm from "../components/SetForm";

export default function SetBudgets() {

    return (
        <SetForm
            title={'Set Budgets'}
            set={'Budget'}
            daily={'daily_budget'}
            weekly={'weekly_budget'}
            monthly={'monthly_budget'}
            yearly={'yearly_budget'}
            apiEndpoint={'budgets'}
            statusSuccessMsg={'Budgets Set Successfully'}
        />
    )
}