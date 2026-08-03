<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('wallet_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title')->default('Salary');
            $table->decimal('amount', 15, 2);
            $table->string('currency', 10)->default('USD');
            $table->unsignedTinyInteger('month');
            $table->unsignedSmallInteger('year');
            $table->date('payment_date');
            $table->text('note')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'month', 'year', 'currency']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
