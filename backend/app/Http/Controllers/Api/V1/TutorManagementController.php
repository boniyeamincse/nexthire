<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TutorApplication;
use App\Models\TutorProfile;
use App\Models\TutorVerificationDocument;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TutorManagementController extends Controller
{
    public function apply(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $validated = $request->validate([
            'headline' => ['nullable', 'string', 'max:160'],
            'bio' => ['required', 'string', 'max:2000'],
            'experience_years' => ['nullable', 'integer', 'min:0', 'max:60'],
            'specialties' => ['nullable', 'array'],
            'specialties.*' => ['string', 'max:120'],
            'hourly_rate' => ['nullable', 'numeric', 'min:0'],
            'resume_url' => ['nullable', 'url', 'max:500'],
        ]);

        if ($user->role !== 'tutor') {
            $user->forceFill(['role' => 'tutor'])->save();
        }

        $application = TutorApplication::updateOrCreate(
            ['user_id' => $user->id, 'status' => 'pending'],
            [
                'headline' => $validated['headline'] ?? null,
                'bio' => $validated['bio'],
                'experience_years' => $validated['experience_years'] ?? null,
                'specialties' => $validated['specialties'] ?? null,
                'hourly_rate' => $validated['hourly_rate'] ?? null,
                'resume_url' => $validated['resume_url'] ?? null,
                'status' => 'pending',
                'rejection_reason' => null,
                'reviewed_by' => null,
                'reviewed_at' => null,
            ]
        );

        TutorProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'headline' => $validated['headline'] ?? null,
                'bio' => $validated['bio'],
                'experience_years' => $validated['experience_years'] ?? null,
                'specialties' => $validated['specialties'] ?? null,
                'hourly_rate' => $validated['hourly_rate'] ?? null,
            ]
        );

        return response()->json([
            'data' => $application,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = max(1, min((int) $request->integer('per_page', 20), 100));

        $query = User::query()
            ->where('role', 'tutor')
            ->where('status', 'active')
            ->with('tutorProfile');

        if ($request->filled('search')) {
            $search = (string) $request->string('search');
            $query->where(function ($subQuery) use ($search): void {
                $subQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('verified')) {
            $verified = filter_var($request->input('verified'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($verified !== null) {
                $query->whereHas('tutorProfile', function ($profileQuery) use ($verified): void {
                    $profileQuery->where('is_verified', $verified);
                });
            }
        }

        $tutors = $query->latest('id')->paginate($perPage);

        return response()->json([
            'data' => collect($tutors->items())->map(fn (User $tutor) => $this->tutorPayload($tutor))->values(),
            'meta' => [
                'current_page' => $tutors->currentPage(),
                'last_page' => $tutors->lastPage(),
                'per_page' => $tutors->perPage(),
                'total' => $tutors->total(),
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $tutor = User::query()
            ->whereKey($id)
            ->where('role', 'tutor')
            ->with('tutorProfile')
            ->firstOrFail();

        return response()->json([
            'data' => $this->tutorPayload($tutor),
        ]);
    }

    public function updateMyProfile(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $validated = $request->validate([
            'headline' => ['sometimes', 'nullable', 'string', 'max:160'],
            'bio' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'experience_years' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:60'],
            'specialties' => ['sometimes', 'nullable', 'array'],
            'specialties.*' => ['string', 'max:120'],
            'languages' => ['sometimes', 'nullable', 'array'],
            'languages.*' => ['string', 'max:80'],
            'timezone' => ['sometimes', 'nullable', 'string', 'max:100'],
            'hourly_rate' => ['sometimes', 'nullable', 'numeric', 'min:0'],
        ]);

        $profile = TutorProfile::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json([
            'data' => [
                'user' => $this->tutorPayload($user->fresh('tutorProfile')),
                'profile' => $profile,
            ],
        ]);
    }

    public function storeVerificationDocument(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        $validated = $request->validate([
            'document_type' => ['required', 'in:id_card,passport,certificate,other'],
            'file_url' => ['required', 'url', 'max:500'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $document = TutorVerificationDocument::create([
            'user_id' => $user->id,
            'document_type' => $validated['document_type'],
            'file_url' => $validated['file_url'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'data' => $document,
        ], 201);
    }

    public function myEarnings(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        return response()->json([
            'data' => [
                'tutor_id' => $user->id,
                'currency' => 'USD',
                'total_earned' => '0.00',
                'available_balance' => '0.00',
                'pending_balance' => '0.00',
                'completed_sessions' => 0,
            ],
        ]);
    }

    public function myReviews(Request $request): JsonResponse
    {
        $user = $this->requireTutor($request);

        return response()->json([
            'data' => [],
            'meta' => [
                'tutor_id' => $user->id,
                'count' => 0,
                'average_rating' => null,
            ],
        ]);
    }

    public function tutorSlots(int $id): JsonResponse
    {
        User::query()->whereKey($id)->where('role', 'tutor')->firstOrFail();

        return response()->json([
            'data' => [],
        ]);
    }

    public function tutorReviews(int $id): JsonResponse
    {
        User::query()->whereKey($id)->where('role', 'tutor')->firstOrFail();

        return response()->json([
            'data' => [],
            'meta' => [
                'tutor_id' => $id,
                'count' => 0,
                'average_rating' => null,
            ],
        ]);
    }

    private function requireUser(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');

        return $user;
    }

    private function requireTutor(Request $request): User
    {
        $user = $this->requireUser($request);
        abort_unless($user->role === 'tutor', 403, 'Tutor role required.');

        return $user;
    }

    private function tutorPayload(User $user): array
    {
        $profile = $user->tutorProfile;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'status' => $user->status,
            'profile' => [
                'headline' => $profile?->headline,
                'bio' => $profile?->bio,
                'experience_years' => $profile?->experience_years,
                'specialties' => $profile?->specialties,
                'languages' => $profile?->languages,
                'timezone' => $profile?->timezone,
                'hourly_rate' => $profile?->hourly_rate,
                'is_verified' => $profile?->is_verified ?? false,
            ],
        ];
    }
}
