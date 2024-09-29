<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecordController;

// Auth Controller
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Record Controller
Route::post('/income/add', [RecordController::class, 'addIncomeRecord']);
Route::post('/expense/add', [RecordController::class, 'addExpenseRecord']);
Route::get('/data/day', [RecordController::class, 'displayDataDay']);
Route::get('/data/month', [RecordController::class, 'displayDataMonth']);
Route::get('/data/year', [RecordController::class, 'displayDataYear']);
Route::get('/entry/history', [RecordController::class, 'displayHistory']);
