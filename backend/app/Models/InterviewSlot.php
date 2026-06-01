<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InterviewSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutor_user_id',
        'category_id',
        'title',
        'description',
        'interview_type',
        'start_at',
        'end_at',
        'timezone',
        'price',
        'status',
        'is_published',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'start_at' => 'datetime',
            'end_at' => 'datetime',
            'price' => 'decimal:2',
            'is_published' => 'boolean',
            'cancelled_at' => 'datetime',
        ];
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(InterviewCategory::class, 'category_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'slot_id');
    }
}
