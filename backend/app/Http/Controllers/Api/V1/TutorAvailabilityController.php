<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TutorAvailabilityRule;
use App\Models\TutorUnavailableDate;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TutorAvailabilityController extends Controller
{
    public function storeAvailabilityRule(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $validated = $request->validate([
            'day_of_week' => ['required', 'integer', 'min:0', 'max:6'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'break_start_time' => ['nullable', 'date_format:H:i', 'after:start_time', 'before:end_time'],
            'break_end_time' => ['nullable', 'date_format:H:i', 'after:break_start_time', 'before:end_time'],
            'slot_duration_minutes' => ['nullable', 'integer', 'min:15', 'max:240'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $rule = TutorAvailabilityRule::create([
            'user_id' => $user->id,
            'day_of_week' => $validated['day_of_week'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'break_start_time' => $validated['break_start_time'] ?? null,
            'break_end_time' => $validated['break_end_time'] ?? null,
            'slot_duration_minutes' => $validated['slot_duration_minutes'] ?? 60,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'data' => $rule,
        ], 201);
    }

    public function listAvailabilityRules(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $rules = TutorAvailabilityRule::query()
            ->where('user_id', $user->id)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'data' => $rules,
        ]);
    }

    public function showAvailabilityRule(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);

        $rule = TutorAvailabilityRule::query()
            ->where('user_id', $user->id)
            ->findOrFail($id);

        return response()->json([
            'data' => $rule,
        ]);
    }

    public function updateAvailabilityRule(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);

        $rule = TutorAvailabilityRule::query()
            ->where('user_id', $user->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'day_of_week' => ['sometimes', 'integer', 'min:0', 'max:6'],
            'start_time' => ['sometimes', 'date_format:H:i'],
            'end_time' => ['sometimes', 'date_format:H:i'],
            'break_start_time' => ['sometimes', 'nullable', 'date_format:H:i'],
            'break_end_time' => ['sometimes', 'nullable', 'date_format:H:i'],
            'slot_duration_minutes' => ['sometimes', 'integer', 'min:15', 'max:240'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $startTime = $validated['start_time'] ?? $rule->start_time;
        $endTime = $validated['end_time'] ?? $rule->end_time;
        abort_if($endTime <= $startTime, 422, 'The end_time must be after start_time.');

        $breakStart = $validated['break_start_time'] ?? $rule->break_start_time;
        $breakEnd = $validated['break_end_time'] ?? $rule->break_end_time;

        if ($breakStart !== null || $breakEnd !== null) {
            abort_if($breakStart === null || $breakEnd === null, 422, 'Both break_start_time and break_end_time are required together.');
            abort_if($breakStart <= $startTime || $breakStart >= $endTime, 422, 'break_start_time must be inside availability range.');
            abort_if($breakEnd <= $breakStart || $breakEnd >= $endTime, 422, 'break_end_time must be after break_start_time and inside availability range.');
        }

        $rule->fill($validated)->save();

        return response()->json([
            'data' => $rule->fresh(),
        ]);
    }

    public function deleteAvailabilityRule(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);

        $rule = TutorAvailabilityRule::query()
            ->where('user_id', $user->id)
            ->findOrFail($id);

        $rule->delete();

        return response()->json([
            'data' => [
                'message' => 'Availability rule deleted successfully.',
            ],
        ]);
    }

    public function storeUnavailableDate(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $validated = $request->validate([
            'date' => ['required', 'date', 'after_or_equal:today'],
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $date = TutorUnavailableDate::updateOrCreate(
            [
                'user_id' => $user->id,
                'date' => $validated['date'],
            ],
            [
                'reason' => $validated['reason'] ?? null,
            ]
        );

        return response()->json([
            'data' => $date,
        ], 201);
    }

    public function listUnavailableDates(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $dates = TutorUnavailableDate::query()
            ->where('user_id', $user->id)
            ->orderBy('date')
            ->get();

        return response()->json([
            'data' => $dates,
        ]);
    }

    public function deleteUnavailableDate(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);

        $date = TutorUnavailableDate::query()
            ->where('user_id', $user->id)
            ->findOrFail($id);

        $date->delete();

        return response()->json([
            'data' => [
                'message' => 'Unavailable date deleted successfully.',
            ],
        ]);
    }

    private function requireTutor(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');
        abort_unless($user->role === 'tutor', 403, 'Tutor role required.');

        return $user;
    }
}
