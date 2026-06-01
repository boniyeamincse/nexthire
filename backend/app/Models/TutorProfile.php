<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TutorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'headline',
        'bio',
        'experience_years',
        'specialties',
        'languages',
        'timezone',
        'hourly_rate',
        'is_verified',
        'approved_at',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'specialties' => 'array',
            'languages' => 'array',
            'hourly_rate' => 'decimal:2',
            'is_verified' => 'boolean',
            'approved_at' => 'datetime',
            'verified_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
