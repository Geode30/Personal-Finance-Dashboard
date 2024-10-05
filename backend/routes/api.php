<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\SetBudgetAndGoalsController;

// Auth Controller
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Record Controller
Route::post('/income/add', [RecordController::class, 'addIncomeRecord']);
Route::post('/expense/add', [RecordController::class, 'addExpenseRecord']);
Route::get('/data/day', [RecordController::class, 'displayDataDay']);
Route::get('/data/week', [RecordController::class, 'displayDataWeek']);
Route::get('/data/month', [RecordController::class, 'displayDataMonth']);
Route::get('/data/year', [RecordController::class, 'displayDataYear']);
Route::get('/entry/history', [RecordController::class, 'displayHistory']);
Route::get('/entry/history/type/{type}', [RecordController::class, 'displayHistoryType']);
Route::get('/entry/history/month/{month}', [RecordController::class, 'displayHistoryMonth']);
Route::get('/entry/history/type/month/{type}/{month}', [RecordController::class, 'displayHistoryTypeMonth']);

// Set Budget and Goals Controller
Route::post('/set/budgets', [SetBudgetAndGoalsController::class, 'setBudgets']);
Route::post('/set/goals', [SetBudgetAndGoalsController::class, 'setSavingsGoals']);
Route::get('/get/budgets', [SetBudgetAndGoalsController::class, 'getBudgets']);
Route::get('/get/goals', [SetBudgetAndGoalsController::class, 'getSavingsGoals']);
