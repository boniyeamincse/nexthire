<?php

namespace Database\Factories;

use App\Models\StoredFile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StoredFile>
 */
class StoredFileFactory extends Factory
{
    protected $model = StoredFile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $storedName = fake()->uuid().'.txt';

        return [
            'owner_user_id' => User::factory(),
            'original_name' => 'sample.txt',
            'stored_name' => $storedName,
            'disk' => 'local',
            'path' => 'uploads/'.$storedName,
            'mime_type' => 'text/plain',
            'size' => 128,
            'visibility' => 'private',
            'metadata' => ['source' => 'test'],
        ];
    }
}
