<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\InterviewSlot;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $student = $this->requireUser($request);

        $validated = $request->validate([
            'slot_id' => ['required', 'integer', 'exists:interview_slots,id'],
        ]);

        $slot = InterviewSlot::query()->findOrFail((int) $validated['slot_id']);

        abort_if($slot->tutor_user_id === $student->id, 422, 'You cannot book your own slot.');
        abort_if($slot->status !== 'active' || ! $slot->is_published || $slot->cancelled_at !== null, 422, 'This slot is not bookable.');
        abort_if($slot->start_at->isPast(), 422, 'Cannot book a past slot.');

        $hasActiveBooking = Booking::query()
            ->where('slot_id', $slot->id)
            ->whereIn('status', ['pending', 'confirmed', 'rescheduled'])
            ->exists();

        abort_if($hasActiveBooking, 422, 'This slot is already booked.');

        $booking = Booking::create([
            'slot_id' => $slot->id,
            'student_user_id' => $student->id,
            'tutor_user_id' => $slot->tutor_user_id,
            'status' => 'pending',
            'scheduled_start_at' => $slot->start_at,
            'scheduled_end_at' => $slot->end_at,
        ]);

        $slot->forceFill([
            'is_published' => false,
        ])->save();

        return response()->json([
            'data' => $this->bookingPayload($booking->fresh(['slot', 'student:id,name,email', 'tutor:id,name,email'])),
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $query = Booking::query()
            ->with(['slot', 'student:id,name,email', 'tutor:id,name,email'])
            ->orderByDesc('id');

        if ($user->role === 'student') {
            $query->where('student_user_id', $user->id);
        } elseif ($user->role === 'tutor') {
            $query->where('tutor_user_id', $user->id);
        } elseif (in_array($user->role, ['admin', 'super_admin'], true)) {
            if ($request->filled('student_user_id')) {
                $query->where('student_user_id', (int) $request->integer('student_user_id'));
            }

            if ($request->filled('tutor_user_id')) {
                $query->where('tutor_user_id', (int) $request->integer('tutor_user_id'));
            }
        } else {
            abort(403, 'Unsupported role for booking list.');
        }

        if ($request->filled('status')) {
            $query->where('status', (string) $request->string('status'));
        }

        $paginator = $query->paginate(max(1, min((int) $request->integer('per_page', 20), 100)));

        return response()->json([
            'data' => collect($paginator->items())->map(fn (Booking $booking) => $this->bookingPayload($booking))->values(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);
        $booking = Booking::query()->with(['slot', 'student:id,name,email', 'tutor:id,name,email'])->findOrFail($id);
        $this->authorizeBookingAccess($user, $booking);

        return response()->json([
            'data' => $this->bookingPayload($booking),
        ]);
    }

    public function cancel(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);
        $booking = Booking::query()->with('slot')->findOrFail($id);
        $this->authorizeBookingAccess($user, $booking);

        abort_if(in_array($booking->status, ['completed', 'cancelled'], true), 422, 'This booking is already closed.');

        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $booking->forceFill([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $validated['reason'] ?? null,
        ])->save();

        $booking->slot?->forceFill([
            'status' => 'active',
            'is_published' => true,
            'cancelled_at' => null,
        ])->save();

        return response()->json([
            'data' => $this->bookingPayload($booking->fresh(['slot', 'student:id,name,email', 'tutor:id,name,email'])),
        ]);
    }

    public function reschedule(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);
        $booking = Booking::query()->with('slot')->findOrFail($id);
        $this->authorizeBookingAccess($user, $booking);

        abort_if(in_array($booking->status, ['completed', 'cancelled'], true), 422, 'This booking cannot be rescheduled.');

        $validated = $request->validate([
            'slot_id' => ['required', 'integer', 'exists:interview_slots,id'],
            'note' => ['nullable', 'string', 'max:500'],
        ]);

        $newSlot = InterviewSlot::query()->findOrFail((int) $validated['slot_id']);

        abort_if($newSlot->tutor_user_id !== $booking->tutor_user_id, 422, 'Reschedule must target the same tutor.');
        abort_if($newSlot->status !== 'active' || ! $newSlot->is_published || $newSlot->cancelled_at !== null, 422, 'Target slot is not bookable.');
        abort_if($newSlot->start_at->isPast(), 422, 'Cannot reschedule to a past slot.');

        $hasActiveBooking = Booking::query()
            ->where('slot_id', $newSlot->id)
            ->whereIn('status', ['pending', 'confirmed', 'rescheduled'])
            ->where('id', '!=', $booking->id)
            ->exists();

        abort_if($hasActiveBooking, 422, 'Target slot is already booked.');

        $oldSlot = $booking->slot;

        $booking->forceFill([
            'slot_id' => $newSlot->id,
            'status' => 'rescheduled',
            'scheduled_start_at' => $newSlot->start_at,
            'scheduled_end_at' => $newSlot->end_at,
            'reschedule_note' => $validated['note'] ?? null,
            'cancelled_at' => null,
            'cancellation_reason' => null,
        ])->save();

        $newSlot->forceFill([
            'is_published' => false,
        ])->save();

        if ($oldSlot && $oldSlot->id !== $newSlot->id) {
            $oldSlot->forceFill([
                'status' => 'active',
                'is_published' => true,
                'cancelled_at' => null,
            ])->save();
        }

        return response()->json([
            'data' => $this->bookingPayload($booking->fresh(['slot', 'student:id,name,email', 'tutor:id,name,email'])),
        ]);
    }

    public function confirm(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);
        $booking = Booking::query()->with('slot')->findOrFail($id);

        abort_unless($user->id === $booking->tutor_user_id || in_array($user->role, ['admin', 'super_admin'], true), 403, 'Only tutor/admin can confirm booking.');
        abort_if(in_array($booking->status, ['completed', 'cancelled'], true), 422, 'This booking cannot be confirmed.');

        $booking->forceFill([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ])->save();

        return response()->json([
            'data' => $this->bookingPayload($booking->fresh(['slot', 'student:id,name,email', 'tutor:id,name,email'])),
        ]);
    }

    public function complete(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);
        $booking = Booking::query()->with('slot')->findOrFail($id);

        abort_unless($user->id === $booking->tutor_user_id || in_array($user->role, ['admin', 'super_admin'], true), 403, 'Only tutor/admin can complete booking.');
        abort_if($booking->status === 'cancelled', 422, 'Cancelled booking cannot be completed.');

        $booking->forceFill([
            'status' => 'completed',
            'completed_at' => now(),
        ])->save();

        return response()->json([
            'data' => $this->bookingPayload($booking->fresh(['slot', 'student:id,name,email', 'tutor:id,name,email'])),
        ]);
    }

    public function upcoming(Request $request): JsonResponse
    {
        return $this->listByStatus($request, ['pending', 'confirmed', 'rescheduled'], true);
    }

    public function completed(Request $request): JsonResponse
    {
        return $this->listByStatus($request, ['completed']);
    }

    public function cancelled(Request $request): JsonResponse
    {
        return $this->listByStatus($request, ['cancelled']);
    }

    private function listByStatus(Request $request, array $statuses, bool $futureOnly = false): JsonResponse
    {
        $user = $this->requireUser($request);

        $query = Booking::query()
            ->with(['slot', 'student:id,name,email', 'tutor:id,name,email'])
            ->whereIn('status', $statuses);

        if ($user->role === 'student') {
            $query->where('student_user_id', $user->id);
        } elseif ($user->role === 'tutor') {
            $query->where('tutor_user_id', $user->id);
        } elseif (! in_array($user->role, ['admin', 'super_admin'], true)) {
            abort(403, 'Unsupported role for booking list.');
        }

        if ($futureOnly) {
            $query->where('scheduled_start_at', '>=', now());
        }

        $bookings = $query->orderBy('scheduled_start_at')->get();

        return response()->json([
            'data' => $bookings->map(fn (Booking $booking) => $this->bookingPayload($booking))->values(),
        ]);
    }

    private function requireUser(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');

        return $user;
    }

    private function authorizeBookingAccess(User $user, Booking $booking): void
    {
        if (in_array($user->role, ['admin', 'super_admin'], true)) {
            return;
        }

        abort_unless(
            $booking->student_user_id === $user->id || $booking->tutor_user_id === $user->id,
            403,
            'Forbidden.'
        );
    }

    private function bookingPayload(Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'status' => $booking->status,
            'slot_id' => $booking->slot_id,
            'scheduled_start_at' => $booking->scheduled_start_at,
            'scheduled_end_at' => $booking->scheduled_end_at,
            'confirmed_at' => $booking->confirmed_at,
            'completed_at' => $booking->completed_at,
            'cancelled_at' => $booking->cancelled_at,
            'cancellation_reason' => $booking->cancellation_reason,
            'reschedule_note' => $booking->reschedule_note,
            'slot' => $booking->slot,
            'student' => $booking->student,
            'tutor' => $booking->tutor,
            'created_at' => $booking->created_at,
            'updated_at' => $booking->updated_at,
        ];
    }
}
