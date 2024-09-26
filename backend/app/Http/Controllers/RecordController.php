<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;

class RecordController extends Controller
{

    private function getCurrentDate()
    {
        $currentDateTime = Carbon::now()->format('Y-m-d H:i:s');
        return $currentDateTime;
    }

    public function addIncomeRecord(Request $request)
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

        return [
            'message' => 'Income Successfully Added'
        ];
    }
}
