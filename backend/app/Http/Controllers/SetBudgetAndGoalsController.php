<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;

class SetBudgetAndGoalsController extends Controller
{

    private function set(Request $request, $weekly, $monthly, $yearly, $successMessage)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $fields = $request->validate([
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
        return $this->set($request, 'weekly_budget', 'monthly_budget', 'yearly_budget', 'Budgets Set Successfully');
    }

    public function setSavingsGoals(Request $request)
    {
        return $this->set($request, 'weekly_savings_goal', 'monthly_savings_goal', 'yearly_savings_goal', 'Savings Goals Set Successfully');
    }
}
