<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('calendar_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('owner_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->nullOnDelete();
            $table->string('title', 180);
            $table->text('description')->nullable();
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->string('timezone', 100)->default('UTC');
            $table->string('source', 30)->default('manual');
            $table->boolean('is_all_day')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['owner_user_id', 'start_at']);
            $table->index(['owner_user_id', 'source']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
