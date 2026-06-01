<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\InterviewSlot;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InterviewSlotController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $validated = $request->validate([
            'category_id' => ['nullable', 'integer', 'exists:interview_categories,id'],
            'title' => ['required', 'string', 'max:160'],
            'description' => ['nullable', 'string', 'max:4000'],
            'interview_type' => ['nullable', 'string', 'max:60'],
            'start_at' => ['required', 'date', 'after:now'],
            'end_at' => ['required', 'date', 'after:start_at'],
            'timezone' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'numeric', 'min:0'],
        ]);

        $slot = InterviewSlot::create([
            'tutor_user_id' => $user->id,
            'category_id' => $validated['category_id'] ?? null,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'interview_type' => $validated['interview_type'] ?? 'mock_interview',
            'start_at' => $validated['start_at'],
            'end_at' => $validated['end_at'],
            'timezone' => $validated['timezone'] ?? 'UTC',
            'price' => $validated['price'] ?? 0,
            'status' => 'active',
            'is_published' => false,
        ]);

        return response()->json([
            'data' => $slot->load(['tutor:id,name,email', 'category:id,name,slug']),
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = InterviewSlot::query()
            ->with(['tutor:id,name,email', 'category:id,name,slug'])
            ->orderBy('start_at');

        if ($request->filled('tutor_id')) {
            $query->where('tutor_user_id', (int) $request->integer('tutor_id'));
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', (int) $request->integer('category_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', (string) $request->string('status'));
        }

        if ($request->filled('published')) {
            $published = filter_var($request->input('published'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($published !== null) {
                $query->where('is_published', $published);
            }
        }

        return response()->json([
            'data' => $query->paginate(max(1, min((int) $request->integer('per_page', 20), 100))),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $slot = InterviewSlot::with(['tutor:id,name,email', 'category:id,name,slug'])->findOrFail($id);

        return response()->json([
            'data' => $slot,
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);
        $slot = $this->ownedSlot($user, $id);

        $validated = $request->validate([
            'category_id' => ['sometimes', 'nullable', 'integer', 'exists:interview_categories,id'],
            'title' => ['sometimes', 'string', 'max:160'],
            'description' => ['sometimes', 'nullable', 'string', 'max:4000'],
            'interview_type' => ['sometimes', 'string', 'max:60'],
            'start_at' => ['sometimes', 'date'],
            'end_at' => ['sometimes', 'date'],
            'timezone' => ['sometimes', 'string', 'max:100'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'status' => ['sometimes', 'in:active,cancelled,inactive'],
        ]);

        $start = $validated['start_at'] ?? $slot->start_at;
        $end = $validated['end_at'] ?? $slot->end_at;
        abort_if(strtotime((string) $end) <= strtotime((string) $start), 422, 'end_at must be after start_at.');

        $slot->fill($validated)->save();

        return response()->json([
            'data' => $slot->fresh(['tutor:id,name,email', 'category:id,name,slug']),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);
        $slot = $this->ownedSlot($user, $id);

        $slot->delete();

        return response()->json([
            'data' => [
                'message' => 'Slot deleted successfully.',
            ],
        ]);
    }

    public function available(Request $request): JsonResponse
    {
        $query = InterviewSlot::query()
            ->with(['tutor:id,name,email', 'category:id,name,slug'])
            ->where('is_published', true)
            ->where('status', 'active')
            ->whereNull('cancelled_at')
            ->where('start_at', '>=', now())
            ->orderBy('start_at');

        if ($request->filled('category_id')) {
            $query->where('category_id', (int) $request->integer('category_id'));
        }

        return response()->json([
            'data' => $query->paginate(max(1, min((int) $request->integer('per_page', 20), 100))),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $query = InterviewSlot::query()
            ->with(['tutor:id,name,email', 'category:id,name,slug'])
            ->where('is_published', true)
            ->where('status', 'active')
            ->whereNull('cancelled_at');

        if ($request->filled('q')) {
            $q = (string) $request->string('q');
            $query->where(function ($subQuery) use ($q): void {
                $subQuery->where('title', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
            });
        }

        if ($request->filled('tutor_id')) {
            $query->where('tutor_user_id', (int) $request->integer('tutor_id'));
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', (int) $request->integer('category_id'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('start_at', '>=', (string) $request->string('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('start_at', '<=', (string) $request->string('date_to'));
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', (float) $request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float) $request->input('max_price'));
        }

        return response()->json([
            'data' => $query->orderBy('start_at')->paginate(max(1, min((int) $request->integer('per_page', 20), 100))),
        ]);
    }

    public function publish(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);
        $slot = $this->ownedSlot($user, $id);

        abort_if($slot->status !== 'active', 422, 'Only active slots can be published.');

        $slot->forceFill([
            'is_published' => true,
        ])->save();

        return response()->json([
            'data' => $slot->fresh(['tutor:id,name,email', 'category:id,name,slug']),
        ]);
    }

    public function cancel(Request $request, int $id): JsonResponse
    {
        $user = $this->requireTutor($request);
        $slot = $this->ownedSlot($user, $id);

        $slot->forceFill([
            'status' => 'cancelled',
            'is_published' => false,
            'cancelled_at' => now(),
        ])->save();

        return response()->json([
            'data' => $slot->fresh(['tutor:id,name,email', 'category:id,name,slug']),
        ]);
    }

    private function requireTutor(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');
        abort_unless($user->role === 'tutor', 403, 'Tutor role required.');

        return $user;
    }

    private function ownedSlot(User $user, int $id): InterviewSlot
    {
        return InterviewSlot::query()
            ->where('tutor_user_id', $user->id)
            ->findOrFail($id);
    }
}
