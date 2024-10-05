<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;

class SetBudgetAndGoalsController extends Controller
{

    private function set(Request $request, $daily, $weekly, $monthly, $yearly, $successMessage)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $fields = $request->validate([
            $daily => 'numeric',
            $weekly => 'numeric',
            $monthly => 'numeric',
            $yearly => 'numeric'
        ]);

        $user = User::find($verifyToken->tokenable_id);

        if ($user) {
            $user->update($fields);
        }

        return response()->json([
            'message' => $successMessage
        ]);
    }

    public function setBudgets(Request $request)
    {
        return $this->set($request, 'daily_budget', 'weekly_budget', 'monthly_budget', 'yearly_budget', 'Budgets Set Successfully');
    }

    public function setSavingsGoals(Request $request)
    {
        return $this->set($request, 'daily_savings_goal', 'weekly_savings_goal', 'monthly_savings_goal', 'yearly_savings_goal', 'Savings Goals Set Successfully');
    }

    private function get(Request $request, $daily, $weekly, $monthly, $yearly, $typeOfRecord)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $userRecord = User::select($daily, $weekly, $monthly, $yearly)->where('id', $verifyToken->tokenable_id)->first();

        return response()->json([
            'message' => 'Successful',
            $typeOfRecord => [
                $daily => intval($userRecord->{$daily}),
                $weekly => intval($userRecord->{$weekly}),
                $monthly => intval($userRecord->{$monthly}),
                $yearly => intval($userRecord->{$yearly})
            ]
        ]);
    }


    public function getBudgets(Request $request)
    {
        return $this->get($request, 'daily_budget', 'weekly_budget', 'monthly_budget', 'yearly_budget', 'budgets');
    }

    public function getSavingsGoals(Request $request)
    {
        return $this->get($request, 'daily_savings_goal', 'weekly_savings_goal', 'monthly_savings_goal', 'yearly_savings_goal', 'goals');
    }
}
