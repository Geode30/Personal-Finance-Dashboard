<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecordController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Auth Controller
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Record Controller
Route::post('/income/add', [RecordController::class, 'addIncomeRecord']);
Route::post('/expense/add', [RecordController::class, 'addExpenseRecord']);
Route::get('/data/day', [RecordController::class, 'displayDataDay']);
