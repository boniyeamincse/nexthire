<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('slot_id')->constrained('interview_slots')->cascadeOnDelete();
            $table->foreignId('student_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('tutor_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status', 20)->default('pending');
            $table->dateTime('scheduled_start_at');
            $table->dateTime('scheduled_end_at');
            $table->dateTime('confirmed_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->string('cancellation_reason', 500)->nullable();
            $table->string('reschedule_note', 500)->nullable();
            $table->timestamps();

            $table->index(['student_user_id', 'status']);
            $table->index(['tutor_user_id', 'status']);
            $table->index(['slot_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
