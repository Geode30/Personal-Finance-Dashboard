<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\User;
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

        $currentMonth = Carbon::now()->format('F');
        $currentDay = Carbon::now()->format('j');
        $currentYear = Carbon::now()->format('Y');
        $currentTime = Carbon::now()->format('g:i A');

        $fields['month'] = $currentMonth;
        $fields['day'] = intval($currentDay);
        $fields['year'] = intval($currentYear);
        $fields['time'] = $currentTime;

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

        $budget = User::where('id', $verifyToken->tokenable_id)->pluck('daily_budget')->first();
        $goal = User::where('id', $verifyToken->tokenable_id)->pluck('daily_savings_goal')->first();

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
            'title' => 'today',
            'budget' => intval($budget),
            'goal' => intval($goal),
            'noRecord' => $noRecord,
            'totalIncome' => intval($totalIncome),
            'totalExpense' => intval($totalExpense),
            'result' => intval($result),
            'resultStatus' => $savedOrLoss
        ]);
    }

    public function displayDataWeek(Request $request)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $totalIncome = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Income')->whereBetween('created_at', [$startOfWeek, $endOfWeek])->sum('amount');
        $totalExpense = Record::where('user_id', $verifyToken->tokenable_id)->where('type', 'Expense')->whereBetween('created_at', [$startOfWeek, $endOfWeek])->sum('amount');

        $budget = User::where('id', $verifyToken->tokenable_id)->pluck('weekly_budget')->first();
        $goal = User::where('id', $verifyToken->tokenable_id)->pluck('weekly_savings_goal')->first();

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
            'title' => 'this week',
            'budget' => intval($budget),
            'goal' => intval($goal),
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

        $budget = User::where('id', $verifyToken->tokenable_id)->pluck('monthly_budget')->first();
        $goal = User::where('id', $verifyToken->tokenable_id)->pluck('monthly_savings_goal')->first();

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
            'title' => sprintf('this month, %s', $monthName),
            'month' => $monthName,
            'budget' => intval($budget),
            'goal' => intval($goal),
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

        $budget = User::where('id', $verifyToken->tokenable_id)->pluck('yearly_budget')->first();
        $goal = User::where('id', $verifyToken->tokenable_id)->pluck('yearly_savings_goal')->first();

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
            'title' => sprintf('this year, %d', $thisYear),
            'budget' => intval($budget),
            'goal' => intval($goal),
            'year' => intval($thisYear),
            'totalIncome' => intval($totalIncome),
            'totalExpense' => intval($totalExpense),
            'result' => intval($result),
            'resultStatus' => $savedOrLoss
        ]);
    }

    public function displayHistory(Request $request)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $records = Record::select('id', 'type', 'category', 'amount', 'month', 'day', 'year', 'time')->where('user_id', $verifyToken->tokenable_id)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Successful',
            'records' => $records
        ]);
    }

    public function displayHistoryType(Request $request, $type)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $records = Record::select('id', 'type', 'category', 'amount', 'month', 'day', 'year', 'time')->where('user_id', $verifyToken->tokenable_id)->where('type', $type)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Successful',
            'records' => $records
        ]);
    }

    public function displayHistoryMonth(Request $request, $month)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $records = Record::select('id', 'type', 'category', 'amount', 'month', 'day', 'year', 'time')->where('user_id', $verifyToken->tokenable_id)->where('month', $month)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Successful',
            'records' => $records
        ]);
    }

    public function displayHistoryTypeMonth(Request $request, $type, $month)
    {
        $verifyToken = PersonalAccessToken::findToken($request->bearerToken());

        $records = Record::select('id', 'type', 'category', 'amount', 'month', 'day', 'year', 'time')->where('user_id', $verifyToken->tokenable_id)->where('type', $type)->where('month', $month)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Successful',
            'records' => $records
        ]);
    }
}
