import React from "react";
import SetForm from "../components/SetForm";

export default function SetSavingsGoals() {

    return (
        <SetForm
            title={'Set Savings Goals'}
            set={'Savings Goal'}
            daily={'daily_savings_goal'}
            weekly={'weekly_savings_goal'}
            monthly={'monthly_savings_goal'}
            yearly={'yearly_savings_goal'}
            apiEndpoint={'goals'}
            statusSuccessMsg={'Savings Goals Set Successfully'}
        />
    )
}