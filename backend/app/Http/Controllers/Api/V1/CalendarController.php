<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\CalendarEvent;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CalendarController extends Controller
{
    public function indexEvents(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        [$from, $to] = $this->resolveRange($request, now()->startOfMonth(), now()->endOfMonth());

        $events = $this->calendarItems($user, $from, $to);

        return response()->json([
            'data' => $events,
        ]);
    }

    public function storeEvent(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:4000'],
            'start_at' => ['required', 'date'],
            'end_at' => ['required', 'date', 'after:start_at'],
            'timezone' => ['nullable', 'string', 'max:100'],
            'is_all_day' => ['nullable', 'boolean'],
            'metadata' => ['nullable', 'array'],
        ]);

        $event = CalendarEvent::create([
            'owner_user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_at' => $validated['start_at'],
            'end_at' => $validated['end_at'],
            'timezone' => $validated['timezone'] ?? 'UTC',
            'source' => 'manual',
            'is_all_day' => $validated['is_all_day'] ?? false,
            'metadata' => $validated['metadata'] ?? null,
        ]);

        return response()->json([
            'data' => $event,
        ], 201);
    }

    public function showEvent(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);

        $event = CalendarEvent::query()
            ->where('owner_user_id', $user->id)
            ->findOrFail($id);

        return response()->json([
            'data' => $event,
        ]);
    }

    public function updateEvent(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);

        $event = CalendarEvent::query()
            ->where('owner_user_id', $user->id)
            ->findOrFail($id);

        abort_if($event->source !== 'manual', 422, 'Only manual calendar events can be edited.');

        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:180'],
            'description' => ['sometimes', 'nullable', 'string', 'max:4000'],
            'start_at' => ['sometimes', 'date'],
            'end_at' => ['sometimes', 'date'],
            'timezone' => ['sometimes', 'string', 'max:100'],
            'is_all_day' => ['sometimes', 'boolean'],
            'metadata' => ['sometimes', 'nullable', 'array'],
        ]);

        $startAt = $validated['start_at'] ?? $event->start_at;
        $endAt = $validated['end_at'] ?? $event->end_at;
        abort_if(strtotime((string) $endAt) <= strtotime((string) $startAt), 422, 'end_at must be after start_at.');

        $event->fill($validated)->save();

        return response()->json([
            'data' => $event->fresh(),
        ]);
    }

    public function deleteEvent(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);

        $event = CalendarEvent::query()
            ->where('owner_user_id', $user->id)
            ->findOrFail($id);

        abort_if($event->source !== 'manual', 422, 'Only manual calendar events can be deleted.');

        $event->delete();

        return response()->json([
            'data' => [
                'message' => 'Calendar event deleted successfully.',
            ],
        ]);
    }

    public function monthlyView(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $year = (int) $request->integer('year', (int) now()->format('Y'));
        $month = (int) $request->integer('month', (int) now()->format('m'));
        $month = max(1, min($month, 12));

        $from = now()->setDate($year, $month, 1)->startOfMonth();
        $to = now()->setDate($year, $month, 1)->endOfMonth();

        return response()->json([
            'data' => $this->calendarItems($user, $from, $to),
            'meta' => [
                'view' => 'monthly',
                'year' => $year,
                'month' => $month,
            ],
        ]);
    }

    public function weeklyView(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $start = $request->filled('start_date')
            ? Carbon::parse((string) $request->string('start_date'))->startOfDay()
            : now()->startOfWeek();

        $from = $start->copy();
        $to = $start->copy()->endOfWeek();

        return response()->json([
            'data' => $this->calendarItems($user, $from, $to),
            'meta' => [
                'view' => 'weekly',
                'start_date' => $from->toDateString(),
                'end_date' => $to->toDateString(),
            ],
        ]);
    }

    public function dailyView(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $day = $request->filled('date')
            ? Carbon::parse((string) $request->string('date'))
            : now();

        $from = $day->copy()->startOfDay();
        $to = $day->copy()->endOfDay();

        return response()->json([
            'data' => $this->calendarItems($user, $from, $to),
            'meta' => [
                'view' => 'daily',
                'date' => $from->toDateString(),
            ],
        ]);
    }

    private function calendarItems(User $user, $from, $to): array
    {
        $manual = CalendarEvent::query()
            ->where('owner_user_id', $user->id)
            ->where('start_at', '<=', $to)
            ->where('end_at', '>=', $from)
            ->get()
            ->map(fn (CalendarEvent $event) => [
                'id' => 'calendar-'.$event->id,
                'type' => 'calendar_event',
                'source' => $event->source,
                'title' => $event->title,
                'description' => $event->description,
                'start_at' => $event->start_at,
                'end_at' => $event->end_at,
                'timezone' => $event->timezone,
                'is_all_day' => $event->is_all_day,
                'booking_id' => $event->booking_id,
                'metadata' => $event->metadata,
            ]);

        $bookingsQuery = Booking::query()
            ->with(['slot:id,title', 'student:id,name', 'tutor:id,name'])
            ->where(function ($query) use ($user): void {
                $query->where('student_user_id', $user->id)
                    ->orWhere('tutor_user_id', $user->id);
            })
            ->where('scheduled_start_at', '<=', $to)
            ->where('scheduled_end_at', '>=', $from)
            ->whereNotIn('status', ['cancelled']);

        $bookings = $bookingsQuery->get()
            ->map(fn (Booking $booking) => [
                'id' => 'booking-'.$booking->id,
                'type' => 'booking_event',
                'source' => 'booking',
                'title' => $booking->slot?->title ?? 'Interview Session',
                'description' => 'Booking #'.$booking->id,
                'start_at' => $booking->scheduled_start_at,
                'end_at' => $booking->scheduled_end_at,
                'timezone' => $booking->slot?->timezone ?? 'UTC',
                'is_all_day' => false,
                'booking_id' => $booking->id,
                'metadata' => [
                    'status' => $booking->status,
                    'student' => $booking->student?->name,
                    'tutor' => $booking->tutor?->name,
                ],
            ]);

        return $manual
            ->concat($bookings)
            ->sortBy('start_at')
            ->values()
            ->all();
    }

    private function requireUser(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');

        return $user;
    }

    private function resolveRange(Request $request, $defaultFrom, $defaultTo): array
    {
        $from = $request->filled('from') ? Carbon::parse((string) $request->string('from')) : $defaultFrom;
        $to = $request->filled('to') ? Carbon::parse((string) $request->string('to')) : $defaultTo;
        abort_if($to->lt($from), 422, 'to must be greater than or equal to from.');

        return [$from, $to];
    }
}
