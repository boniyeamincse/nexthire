<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'slot_id',
        'student_user_id',
        'tutor_user_id',
        'status',
        'scheduled_start_at',
        'scheduled_end_at',
        'confirmed_at',
        'completed_at',
        'cancelled_at',
        'cancellation_reason',
        'reschedule_note',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_start_at' => 'datetime',
            'scheduled_end_at' => 'datetime',
            'confirmed_at' => 'datetime',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(InterviewSlot::class, 'slot_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_user_id');
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_user_id');
    }
}
