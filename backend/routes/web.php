<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controller\UserController;

Route::get('/api/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

#API routes
Route::post('/api/register', [UserController::class, 'register']);
