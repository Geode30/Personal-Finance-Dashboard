<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

class RecordController extends Controller
{

    private function getCurrentDate()
    {
        $currentDateTime = Carbon::now()->format('Y-m-d H:i:s');
        return $currentDateTime;
    }

    private function addRecord(Request $request)
    {
        $fields = $request->validate([
            'type' => 'required|max:20',
            'category' => 'required|max:30',
            'amount' => 'required|numeric',
        ]);

        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $fields['date'] = $this->getCurrentDate();
        $fields['user_id'] = $verifyToken->tokenable_id;

        Record::create($fields);
    }

    public function addIncomeRecord(Request $request)
    {
        $this->addRecord($request);

        return response()->json([
            'message' => 'Income Successfully Added'
        ]);
    }

    public function addExpenseRecord(Request $request)
    {
        $this->addRecord($request);

        return response()->json([
            'message' => 'Expense Successfully Added'
        ]);
    }

    public function displayDataDay(Request $request)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $today = Carbon::today();

        $incomes = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Income')->whereDate('created_at', $today)->get();
        $expenses = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Expense')->whereDate('created_at', $today)->get();

        $totalIncome = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Income')->whereDate('created_at', $today)->sum('amount');
        $totalExpense = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Expense')->whereDate('created_at', $today)->sum('amount');

        $result = 0;
        $savedOrLoss = '';

        if ($totalIncome > $totalExpense) {
            $result = $totalIncome - $totalExpense;
            $savedOrLoss = 'Saved';
        } else {
            $result = $totalExpense - $totalIncome;
            $savedOrLoss = 'Loss';
        }

        return response()->json([
            'message' => 'Successful',
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'incomes' => $incomes,
            'expenses' => $expenses,
            'result' => $result,
            'resultStatus' => $savedOrLoss
        ]);
    }
}
