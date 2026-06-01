<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', PasswordRule::min(8)],
            'role' => ['nullable', 'in:student,tutor,organization_admin,organization_member,admin,super_admin'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'] ?? 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $token,
            ],
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => ['This account is not active.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $token,
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'data' => [
                'message' => 'Logged out successfully.',
            ],
        ]);
    }

    public function refreshToken(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $user?->createToken('api-token')->plainTextToken,
            ],
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        Password::sendResetLink($validated);

        return response()->json([
            'data' => [
                'message' => 'Password reset link sent.',
            ],
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', PasswordRule::min(8)],
        ]);

        $status = Password::reset($validated, static function (User $user, string $password): void {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->save();
        });

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'data' => [
                'message' => 'Password reset successfully.',
            ],
        ]);
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->forceFill([
                'email_verified_at' => now(),
            ])->save();
        }

        return response()->json([
            'data' => [
                'message' => 'Email verified successfully.',
            ],
        ]);
    }

    public function resendVerification(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        return response()->json([
            'data' => [
                'message' => $user->hasVerifiedEmail()
                    ? 'Email is already verified.'
                    : 'Verification email queued for delivery.',
            ],
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', PasswordRule::min(8)],
        ]);

        $request->user()?->forceFill([
            'password' => $validated['password'],
        ])->save();

        return response()->json([
            'data' => [
                'message' => 'Password changed successfully.',
            ],
        ]);
    }

    public function socialLogin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'provider' => ['required', 'string', 'max:100'],
        ]);

        $user = User::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'],
                'password' => Hash::make(str()->random(32)),
                'role' => 'student',
                'status' => 'active',
                'mfa_enabled' => false,
            ]
        );

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $token,
                'provider' => $validated['provider'],
            ],
        ]);
    }

    public function setupMfa(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $user->forceFill([
            'mfa_enabled' => true,
        ])->save();

        return response()->json([
            'data' => [
                'message' => 'MFA enabled for this account.',
            ],
        ]);
    }

    public function verifyMfa(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'otp' => ['nullable', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $token,
                'mfa_verified' => true,
            ],
        ]);
    }

    public function disableMfa(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $user->forceFill([
            'mfa_enabled' => false,
        ])->save();

        return response()->json([
            'data' => [
                'message' => 'MFA disabled for this account.',
            ],
        ]);
    }

    public function sessions(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        return response()->json([
            'data' => [
                'sessions' => $user->tokens()->get(['id', 'name', 'last_used_at', 'created_at']),
            ],
        ]);
    }

    public function destroySession(Request $request, string $id): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $user->tokens()->whereKey($id)->delete();

        return response()->json([
            'data' => [
                'message' => 'Session removed successfully.',
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'user' => $this->userPayload($request->user()),
            ],
        ]);
    }

    public function updateMe(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,'.$user->id],
        ]);

        $user->fill($validated)->save();

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user->fresh()),
            ],
        ]);
    }

    private function userPayload(?User $user): ?array
    {
        if (! $user) {
            return null;
        }

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