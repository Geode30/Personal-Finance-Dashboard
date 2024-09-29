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

        $noRecord = false;

        if ($totalExpense == 0 && $totalIncome == 0) {
            $noRecord = true;
        }

        return response()->json([
            'message' => 'Successful',
            'title' => 'Today',
            'noRecord' => $noRecord,
            'totalIncome' => intval($totalIncome),
            'totalExpense' => intval($totalExpense),
            'result' => intval($result),
            'resultStatus' => $savedOrLoss
        ]);
    }

    public function displayDataMonth(Request $request)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $thisMonth = Carbon::now()->month;
        $thisYear = Carbon::now()->year;

        $monthName = Carbon::now()->format('F');

        $totalIncome = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Income')->whereMonth('created_at', $thisMonth)->whereYear('created_at', $thisYear)->sum('amount');
        $totalExpense = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Expense')->whereMonth('created_at', $thisMonth)->whereYear('created_at', $thisYear)->sum('amount');

        $result = 0;
        $savedOrLoss = '';

        if ($totalIncome > $totalExpense) {
            $result = $totalIncome - $totalExpense;
            $savedOrLoss = 'Saved';
        } else {
            $result = $totalExpense - $totalIncome;
            $savedOrLoss = 'Loss';
        }

        $noRecord = false;

        if ($totalExpense == 0 && $totalIncome == 0) {
            $noRecord = true;
        }

        return response()->json([
            'message' => 'Successful',
            'noRecord' => $noRecord,
            'title' => sprintf('This Month, %s', $monthName),
            'month' => $monthName,
            'totalIncome' => intval($totalIncome),
            'totalExpense' => intval($totalExpense),
            'result' => intval($result),
            'resultStatus' => $savedOrLoss
        ]);
    }

    public function displayDataYear(Request $request)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $thisYear = Carbon::now()->year;

        $totalIncome = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Income')->whereYear('created_at', $thisYear)->sum('amount');
        $totalExpense = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Expense')->whereYear('created_at', $thisYear)->sum('amount');

        $result = 0;
        $savedOrLoss = '';

        if ($totalIncome > $totalExpense) {
            $result = $totalIncome - $totalExpense;
            $savedOrLoss = 'Saved';
        } else {
            $result = $totalExpense - $totalIncome;
            $savedOrLoss = 'Loss';
        }

        $noRecord = false;

        if ($totalExpense == 0 && $totalIncome == 0) {
            $noRecord = true;
        }

        return response()->json([
            'message' => 'Successful',
            'noRecord' => $noRecord,
            'title' => sprintf('This Year, %d', $thisYear),
            'year' => intval($thisYear),
            'totalIncome' => intval($totalIncome),
            'totalExpense' => intval($totalExpense),
            'result' => intval($result),
            'resultStatus' => $savedOrLoss
        ]);
    }
}
