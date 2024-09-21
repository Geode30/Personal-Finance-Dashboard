<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {

        $fields = $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create($fields);
        $token = $user->createToken($request->name);

        return [
            'message'=> 'User Created Successfully',
            'user'=> $user,
            'token'=> $token->plainTextToken
        ];
    }
}
