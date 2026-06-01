<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
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
                    'user' => ['id', 'name', 'email', 'role', 'status', 'mfa_enabled'],
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

    public function test_returns_the_authenticated_profile(): void
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
            'role' => 'tutor',
            'status' => 'active',
            'mfa_enabled' => true,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/v1/users/me');

        $response->assertOk()
            ->assertJsonPath('data.user.email', 'test@example.com')
            ->assertJsonPath('data.user.role', 'tutor');
    }
}