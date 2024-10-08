<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('daily_budget')->default(0)->change();
            $table->integer('daily_savings_goal')->default(0)->change();
            $table->integer('weekly_budget')->default(0)->change();
            $table->integer('monthly_budget')->default(0)->change();
            $table->integer('yearly_budget')->default(0)->change();
            $table->integer('weekly_savings_goal')->default(0)->change();
            $table->integer('monthly_savings_goal')->default(0)->change();
            $table->integer('yearly_savings_goal')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
