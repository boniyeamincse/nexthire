<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileManagerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_and_view_file(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();

        $uploadResponse = $this->actingAs($user, 'sanctum')->postJson('/api/v1/files', [
            'file' => UploadedFile::fake()->create('resume.pdf', 240, 'application/pdf'),
            'folder' => 'resumes',
            'metadata' => ['category' => 'resume'],
        ]);

        $uploadResponse->assertCreated()
            ->assertJsonPath('data.original_name', 'resume.pdf')
            ->assertJsonPath('data.owner_user_id', $user->id);

        $fileId = (int) $uploadResponse->json('data.id');
        $storedPath = (string) $uploadResponse->json('data.path');

        Storage::disk('local')->assertExists($storedPath);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/files')
            ->assertOk()
            ->assertJsonPath('meta.total', 1);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/files/'.$fileId)
            ->assertOk()
            ->assertJsonPath('data.id', $fileId)
            ->assertJsonPath('data.metadata.category', 'resume');
    }

    public function test_user_can_batch_upload_files(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/files/batch', [
            'files' => [
                UploadedFile::fake()->create('one.txt', 10, 'text/plain'),
                UploadedFile::fake()->create('two.txt', 12, 'text/plain'),
            ],
            'folder' => 'batch',
        ]);

        $response->assertCreated()
            ->assertJsonPath('meta.count', 2);

        $this->assertDatabaseCount('files', 2);
    }

    public function test_owner_can_delete_file_and_other_user_cannot_access_it(): void
    {
        Storage::fake('local');

        $owner = User::factory()->create();
        $otherUser = User::factory()->create();

        $uploadResponse = $this->actingAs($owner, 'sanctum')->postJson('/api/v1/files', [
            'file' => UploadedFile::fake()->create('notes.txt', 8, 'text/plain'),
        ]);

        $fileId = (int) $uploadResponse->json('data.id');
        $storedPath = (string) $uploadResponse->json('data.path');

        $this->actingAs($otherUser, 'sanctum')
            ->getJson('/api/v1/files/'.$fileId)
            ->assertForbidden();

        $this->actingAs($owner, 'sanctum')
            ->deleteJson('/api/v1/files/'.$fileId)
            ->assertOk();

        Storage::disk('local')->assertMissing($storedPath);
        $this->assertDatabaseMissing('files', ['id' => $fileId]);
    }

    public function test_admin_can_view_other_users_file(): void
    {
        Storage::fake('local');

        $owner = User::factory()->create();
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $uploadResponse = $this->actingAs($owner, 'sanctum')->postJson('/api/v1/files', [
            'file' => UploadedFile::fake()->create('admin-visible.txt', 5, 'text/plain'),
        ]);

        $fileId = (int) $uploadResponse->json('data.id');

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/files/'.$fileId)
            ->assertOk()
            ->assertJsonPath('data.id', $fileId);

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/v1/files?owner_user_id='.$owner->id)
            ->assertOk()
            ->assertJsonPath('meta.total', 1);
    }
}
