<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\TutorApplication;
use App\Models\TutorProfile;
use App\Models\TutorVerificationDocument;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TutorModerationController extends Controller
{
    public function approve(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $tutor = User::findOrFail($id);

        $tutor->forceFill([
            'role' => 'tutor',
            'status' => 'active',
        ])->save();

        TutorProfile::updateOrCreate(
            ['user_id' => $tutor->id],
            ['approved_at' => now()]
        );

        TutorApplication::query()
            ->where('user_id', $tutor->id)
            ->where('status', 'pending')
            ->latest('id')
            ->limit(1)
            ->update([
                'status' => 'approved',
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
                'rejection_reason' => null,
            ]);

        return response()->json([
            'data' => [
                'id' => $tutor->id,
                'status' => $tutor->status,
                'role' => $tutor->role,
                'approved' => true,
            ],
        ]);
    }

    public function reject(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        User::findOrFail($id);

        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:500'],
        ]);

        TutorApplication::query()
            ->where('user_id', $id)
            ->where('status', 'pending')
            ->latest('id')
            ->limit(1)
            ->update([
                'status' => 'rejected',
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
                'rejection_reason' => $validated['reason'],
            ]);

        return response()->json([
            'data' => [
                'message' => 'Tutor application rejected.',
                'reason' => $validated['reason'],
            ],
        ]);
    }

    public function suspend(Request $request, int $id): JsonResponse
    {
        $this->authorizeAdmin($request);
        $tutor = User::findOrFail($id);

        $tutor->forceFill([
            'status' => 'suspended',
        ])->save();

        return response()->json([
            'data' => [
                'id' => $tutor->id,
                'status' => $tutor->status,
            ],
        ]);
    }

    public function verify(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $tutor = User::findOrFail($id);

        $profile = TutorProfile::updateOrCreate(
            ['user_id' => $tutor->id],
            [
                'is_verified' => true,
                'verified_at' => now(),
            ]
        );

        TutorVerificationDocument::query()
            ->where('user_id', $tutor->id)
            ->where('status', 'pending')
            ->update([
                'status' => 'approved',
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
            ]);

        return response()->json([
            'data' => [
                'id' => $tutor->id,
                'is_verified' => $profile->is_verified,
                'verified_at' => $profile->verified_at,
            ],
        ]);
    }

    private function authorizeAdmin(Request $request): User
    {
        $actor = $request->user();
        abort_unless($actor instanceof User, 401, 'Unauthenticated.');
        abort_unless(in_array($actor->role, ['admin', 'super_admin'], true), 403, 'Forbidden.');

        return $actor;
    }
}
