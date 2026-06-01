<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\PersonalAccessToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password as PasswordRule;

class UserManagementController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);

        $perPage = (int) $request->integer('per_page', 20);
        $query = User::query()->select([
            'id',
            'name',
            'email',
            'role',
            'status',
            'mfa_enabled',
            'email_verified_at',
            'created_at',
            'updated_at',
        ]);

        if ($request->filled('role')) {
            $query->where('role', (string) $request->string('role'));
        }

        if ($request->filled('status')) {
            $query->where('status', (string) $request->string('status'));
        }

        if ($request->filled('search')) {
            $search = (string) $request->string('search');
            $query->where(function ($subQuery) use ($search): void {
                $subQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->latest('id')->paginate(max(1, min($perPage, 100)));

        $this->logAction($admin, null, 'admin.users.list', [
            'filters' => $request->only(['role', 'status', 'search']),
        ]);

        return response()->json([
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $user = User::findOrFail($id);

        $this->logAction($admin, $user, 'admin.users.view');

        return response()->json([
            'data' => $this->userPayload($user),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', PasswordRule::min(8)],
            'role' => ['required', 'in:student,tutor,organization_admin,organization_member,admin,super_admin'],
            'status' => ['nullable', 'in:active,suspended,banned,inactive'],
            'mfa_enabled' => ['nullable', 'boolean'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
            'status' => $validated['status'] ?? 'active',
            'mfa_enabled' => $validated['mfa_enabled'] ?? false,
        ]);

        $this->logAction($admin, $user, 'admin.users.create', [
            'role' => $user->role,
            'status' => $user->status,
        ]);

        return response()->json([
            'data' => $this->userPayload($user),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'role' => ['sometimes', 'in:student,tutor,organization_admin,organization_member,admin,super_admin'],
            'status' => ['sometimes', 'in:active,suspended,banned,inactive'],
            'mfa_enabled' => ['sometimes', 'boolean'],
        ]);

        $user->fill($validated)->save();

        $this->logAction($admin, $user, 'admin.users.update', [
            'changes' => array_keys($validated),
        ]);

        return response()->json([
            'data' => $this->userPayload($user->fresh()),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $user = User::findOrFail($id);

        $this->logAction($admin, $user, 'admin.users.delete');

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'data' => [
                'message' => 'User deleted successfully.',
            ],
        ]);
    }

    public function roles(Request $request): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);

        $roles = [
            'student',
            'tutor',
            'organization_admin',
            'organization_member',
            'admin',
            'super_admin',
        ];

        $this->logAction($admin, null, 'admin.roles.list');

        return response()->json([
            'data' => $roles,
        ]);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'in:active,suspended,banned,inactive'],
        ]);

        $user->forceFill([
            'status' => $validated['status'],
        ])->save();

        $this->logAction($admin, $user, 'admin.users.status', [
            'status' => $validated['status'],
        ]);

        return response()->json([
            'data' => $this->userPayload($user->fresh()),
        ]);
    }

    public function suspend(Request $request, int $id): JsonResponse
    {
        $request->merge(['status' => 'suspended']);

        return $this->updateStatus($request, $id);
    }

    public function ban(Request $request, int $id): JsonResponse
    {
        $request->merge(['status' => 'banned']);

        return $this->updateStatus($request, $id);
    }

    public function activityLogs(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        User::findOrFail($id);

        $logs = ActivityLog::query()
            ->where('subject_user_id', $id)
            ->orWhere('actor_user_id', $id)
            ->latest('id')
            ->limit(100)
            ->get();

        $this->logAction($admin, null, 'admin.users.activity-logs.view', [
            'target_user_id' => $id,
        ]);

        return response()->json([
            'data' => $logs,
        ]);
    }

    public function loginHistory(Request $request, int $id): JsonResponse
    {
        $admin = $this->authorizeAdmin($request);
        User::findOrFail($id);

        $history = PersonalAccessToken::query()
            ->where('tokenable_type', User::class)
            ->where('tokenable_id', $id)
            ->orderByDesc('id')
            ->limit(100)
            ->get(['id', 'name', 'created_at', 'last_used_at', 'expires_at']);

        $this->logAction($admin, null, 'admin.users.login-history.view', [
            'target_user_id' => $id,
        ]);

        return response()->json([
            'data' => $history,
        ]);
    }

    private function authorizeAdmin(Request $request): User
    {
        $actor = $request->user();
        abort_unless($actor instanceof User, 401, 'Unauthenticated.');

        abort_unless(in_array($actor->role, ['admin', 'super_admin'], true), 403, 'Forbidden.');

        return $actor;
    }

    private function logAction(User $actor, ?User $subject, string $action, array $metadata = []): void
    {
        ActivityLog::create([
            'actor_user_id' => $actor->id,
            'subject_user_id' => $subject?->id,
            'action' => $action,
            'metadata' => empty($metadata) ? null : $metadata,
        ]);
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'mfa_enabled' => $user->mfa_enabled,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }
}
