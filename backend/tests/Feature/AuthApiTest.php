<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_registers_a_user_and_returns_a_token(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'student',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.user.email', 'test@example.com')
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'name', 'email', 'role', 'status', 'mfa_enabled', 'email_verified_at'],
                    'token',
                ],
            ]);
    }

    public function test_logs_in_a_user_and_returns_a_token(): void
    {
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk()
            ->assertJsonPath('data.user.email', 'test@example.com')
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'name', 'email', 'role', 'status', 'mfa_enabled'],
                    'token',
                ],
            ]);
    }

    public function test_login_fails_for_inactive_user(): void
    {
        User::create([
            'name' => 'Inactive User',
            'email' => 'inactive@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'suspended',
            'mfa_enabled' => false,
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'inactive@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_social_login_creates_or_reuses_account_and_returns_token(): void
    {
        $response = $this->postJson('/api/v1/auth/social-login', [
            'name' => 'Social User',
            'email' => 'social@example.com',
            'provider' => 'google',
        ]);

        $response->assertOk()
            ->assertJsonPath('data.user.email', 'social@example.com')
            ->assertJsonPath('data.provider', 'google')
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'email'],
                    'token',
                    'provider',
                ],
            ]);
    }

    public function test_returns_and_updates_the_authenticated_profile(): void
    {
        $user = User::create([
            'name' => 'Profile User',
            'email' => 'profile@example.com',
            'password' => Hash::make('password123'),
            'role' => 'tutor',
            'status' => 'active',
            'mfa_enabled' => true,
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/users/me')
            ->assertOk()
            ->assertJsonPath('data.user.email', 'profile@example.com')
            ->assertJsonPath('data.user.role', 'tutor');

        $this->actingAs($user, 'sanctum')
            ->patchJson('/api/v1/users/me', [
                'name' => 'Updated Profile User',
                'email' => 'profile-updated@example.com',
            ])
            ->assertOk()
            ->assertJsonPath('data.user.name', 'Updated Profile User')
            ->assertJsonPath('data.user.email', 'profile-updated@example.com');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Profile User',
            'email' => 'profile-updated@example.com',
        ]);
    }

    public function test_can_setup_verify_and_disable_mfa(): void
    {
        $user = User::create([
            'name' => 'Mfa User',
            'email' => 'mfa@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/mfa/setup')
            ->assertOk()
            ->assertJsonPath('data.message', 'MFA enabled for this account.');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'mfa_enabled' => 1,
        ]);

        $this->postJson('/api/v1/auth/mfa/verify', [
            'email' => 'mfa@example.com',
            'password' => 'password123',
            'otp' => '123456',
        ])->assertOk()
            ->assertJsonPath('data.user.email', 'mfa@example.com')
            ->assertJsonPath('data.mfa_verified', true);

        $this->actingAs($user->fresh(), 'sanctum')
            ->postJson('/api/v1/auth/mfa/disable')
            ->assertOk()
            ->assertJsonPath('data.message', 'MFA disabled for this account.');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'mfa_enabled' => 0,
        ]);
    }

    public function test_can_verify_email_and_resend_verification_message(): void
    {
        $user = User::create([
            'name' => 'Email User',
            'email' => 'email-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
            'email_verified_at' => null,
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/verify-email')
            ->assertOk()
            ->assertJsonPath('data.message', 'Email verified successfully.');

        $this->assertNotNull($user->fresh()->email_verified_at);

        $this->actingAs($user->fresh(), 'sanctum')
            ->postJson('/api/v1/auth/resend-verification')
            ->assertOk()
            ->assertJsonPath('data.message', 'Email is already verified.');
    }

    public function test_can_change_password_and_login_with_new_password(): void
    {
        $user = User::create([
            'name' => 'Password User',
            'email' => 'password-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/change-password', [
                'current_password' => 'password123',
                'password' => 'newpassword123',
                'password_confirmation' => 'newpassword123',
            ])
            ->assertOk()
            ->assertJsonPath('data.message', 'Password changed successfully.');

        $this->postJson('/api/v1/auth/login', [
            'email' => 'password-user@example.com',
            'password' => 'newpassword123',
        ])->assertOk()
            ->assertJsonPath('data.user.email', 'password-user@example.com');
    }

    public function test_forgot_and_reset_password_flow(): void
    {
        $user = User::create([
            'name' => 'Reset User',
            'email' => 'reset-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'reset-user@example.com',
        ])->assertOk()
            ->assertJsonPath('data.message', 'If the account exists, a password reset link has been sent.');

        $token = Password::broker()->createToken($user);

        $this->postJson('/api/v1/auth/reset-password', [
            'token' => $token,
            'email' => 'reset-user@example.com',
            'password' => 'resetpassword123',
            'password_confirmation' => 'resetpassword123',
        ])->assertOk()
            ->assertJsonPath('data.message', 'Password reset successfully.');

        $this->postJson('/api/v1/auth/login', [
            'email' => 'reset-user@example.com',
            'password' => 'resetpassword123',
        ])->assertOk();
    }

    public function test_can_list_and_destroy_specific_sessions(): void
    {
        $user = User::create([
            'name' => 'Session User',
            'email' => 'session-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $primaryToken = $user->createToken('device-1')->plainTextToken;
        $secondToken = $user->createToken('device-2');

        $this->withToken($primaryToken)
            ->getJson('/api/v1/auth/sessions')
            ->assertOk()
            ->assertJsonCount(2, 'data.sessions');

        $this->withToken($primaryToken)
            ->deleteJson('/api/v1/auth/sessions/'.$secondToken->accessToken->id)
            ->assertOk()
            ->assertJsonPath('data.message', 'Session removed successfully.');

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $secondToken->accessToken->id,
        ]);
    }

    public function test_refresh_token_rotates_current_token(): void
    {
        $user = User::create([
            'name' => 'Refresh User',
            'email' => 'refresh-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $plainToken = $user->createToken('device-1')->plainTextToken;

        $response = $this->withToken($plainToken)
            ->postJson('/api/v1/auth/refresh-token');

        $response->assertOk()
            ->assertJsonPath('data.user.email', 'refresh-user@example.com')
            ->assertJsonStructure(['data' => ['user', 'token']]);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_logout_revokes_current_token(): void
    {
        $user = User::create([
            'name' => 'Logout User',
            'email' => 'logout-user@example.com',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $plainToken = $user->createToken('device-1')->plainTextToken;

        $this->withToken($plainToken)
            ->postJson('/api/v1/auth/logout')
            ->assertOk()
            ->assertJsonPath('data.message', 'Logged out successfully.');

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_protected_endpoints_require_authentication(): void
    {
        $this->getJson('/api/v1/users/me')->assertUnauthorized();
        $this->postJson('/api/v1/auth/logout')->assertUnauthorized();
        $this->postJson('/api/v1/auth/refresh-token')->assertUnauthorized();
        $this->getJson('/api/v1/auth/sessions')->assertUnauthorized();
    }

    public function test_destroy_session_is_scoped_to_authenticated_user(): void
    {
        $userA = User::factory()->create([
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $userB = User::factory()->create([
            'password' => Hash::make('password123'),
            'role' => 'student',
            'status' => 'active',
            'mfa_enabled' => false,
        ]);

        $tokenA = $userA->createToken('a-device')->plainTextToken;
        $tokenB = $userB->createToken('b-device');

        $this->withToken($tokenA)
            ->deleteJson('/api/v1/auth/sessions/'.$tokenB->accessToken->id)
            ->assertOk();

        $this->assertDatabaseHas('personal_access_tokens', [
            'id' => $tokenB->accessToken->id,
            'tokenable_id' => $userB->id,
        ]);
    }
}