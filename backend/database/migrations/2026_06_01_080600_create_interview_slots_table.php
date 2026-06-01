<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('interview_slots', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('tutor_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('interview_categories')->nullOnDelete();
            $table->string('title', 160);
            $table->text('description')->nullable();
            $table->string('interview_type', 60)->default('mock_interview');
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->string('timezone', 100)->default('UTC');
            $table->decimal('price', 10, 2)->default(0);
            $table->string('status', 20)->default('active');
            $table->boolean('is_published')->default(false);
            $table->dateTime('cancelled_at')->nullable();
            $table->timestamps();

            $table->index(['tutor_user_id', 'start_at']);
            $table->index(['is_published', 'status', 'start_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interview_slots');
    }
};
