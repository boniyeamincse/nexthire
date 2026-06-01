<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\StoredFile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileManagerController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $validated = $request->validate([
            'file' => ['required', 'file', 'max:10240'],
            'folder' => ['nullable', 'string', 'max:120'],
            'visibility' => ['nullable', 'in:private,public'],
            'metadata' => ['nullable', 'array'],
        ]);

        $storedFile = $this->persistUploadedFile(
            user: $user,
            uploadedFile: $validated['file'],
            folder: $validated['folder'] ?? null,
            visibility: $validated['visibility'] ?? 'private',
            metadata: $validated['metadata'] ?? null
        );

        return response()->json([
            'data' => $this->filePayload($storedFile),
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $query = StoredFile::query()->orderByDesc('id');

        if (! in_array($user->role, ['admin', 'super_admin'], true)) {
            $query->where('owner_user_id', $user->id);
        } elseif ($request->filled('owner_user_id')) {
            $query->where('owner_user_id', (int) $request->integer('owner_user_id'));
        }

        if ($request->filled('q')) {
            $keyword = (string) $request->string('q');
            $query->where(function ($builder) use ($keyword): void {
                $builder->where('original_name', 'like', '%'.$keyword.'%')
                    ->orWhere('path', 'like', '%'.$keyword.'%');
            });
        }

        $files = $query
            ->paginate(max(1, min((int) $request->integer('per_page', 20), 100)));

        return response()->json([
            'data' => collect($files->items())->map(fn (StoredFile $file) => $this->filePayload($file))->values(),
            'meta' => [
                'current_page' => $files->currentPage(),
                'last_page' => $files->lastPage(),
                'per_page' => $files->perPage(),
                'total' => $files->total(),
            ],
        ]);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);

        $storedFile = StoredFile::query()->findOrFail($id);
        $this->authorizeFileAccess($user, $storedFile);

        return response()->json([
            'data' => $this->filePayload($storedFile),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = $this->requireUser($request);

        $storedFile = StoredFile::query()->findOrFail($id);
        $this->authorizeFileAccess($user, $storedFile);

        Storage::disk($storedFile->disk)->delete($storedFile->path);
        $storedFile->delete();

        return response()->json([
            'data' => [
                'message' => 'File deleted successfully.',
            ],
        ]);
    }

    public function batchStore(Request $request): JsonResponse
    {
        $user = $this->requireUser($request);

        $validated = $request->validate([
            'files' => ['required', 'array', 'min:1', 'max:20'],
            'files.*' => ['required', 'file', 'max:10240'],
            'folder' => ['nullable', 'string', 'max:120'],
            'visibility' => ['nullable', 'in:private,public'],
            'metadata' => ['nullable', 'array'],
        ]);

        $created = [];
        foreach ($validated['files'] as $uploadedFile) {
            $created[] = $this->persistUploadedFile(
                user: $user,
                uploadedFile: $uploadedFile,
                folder: $validated['folder'] ?? null,
                visibility: $validated['visibility'] ?? 'private',
                metadata: $validated['metadata'] ?? null
            );
        }

        return response()->json([
            'data' => collect($created)->map(fn (StoredFile $file) => $this->filePayload($file))->values(),
            'meta' => [
                'count' => count($created),
            ],
        ], 201);
    }

    private function persistUploadedFile(
        User $user,
        UploadedFile $uploadedFile,
        ?string $folder,
        string $visibility,
        ?array $metadata = null
    ): StoredFile {
        $folderPath = trim((string) $folder, '/');
        $directory = $folderPath === '' ? 'uploads' : 'uploads/'.$folderPath;
        $extension = $uploadedFile->getClientOriginalExtension();
        $storedName = Str::uuid()->toString().($extension !== '' ? '.'.$extension : '');

        $path = Storage::disk('local')->putFileAs($directory, $uploadedFile, $storedName);

        return StoredFile::create([
            'owner_user_id' => $user->id,
            'original_name' => $uploadedFile->getClientOriginalName(),
            'stored_name' => $storedName,
            'disk' => 'local',
            'path' => $path,
            'mime_type' => $uploadedFile->getClientMimeType(),
            'size' => $uploadedFile->getSize() ?? 0,
            'visibility' => $visibility,
            'metadata' => $metadata,
        ]);
    }

    private function requireUser(Request $request): User
    {
        $user = $request->user();
        abort_unless($user instanceof User, 401, 'Unauthenticated.');

        return $user;
    }

    private function authorizeFileAccess(User $user, StoredFile $storedFile): void
    {
        if (in_array($user->role, ['admin', 'super_admin'], true)) {
            return;
        }

        abort_unless($storedFile->owner_user_id === $user->id, 403, 'Forbidden.');
    }

    private function filePayload(StoredFile $storedFile): array
    {
        return [
            'id' => $storedFile->id,
            'owner_user_id' => $storedFile->owner_user_id,
            'original_name' => $storedFile->original_name,
            'stored_name' => $storedFile->stored_name,
            'disk' => $storedFile->disk,
            'path' => $storedFile->path,
            'mime_type' => $storedFile->mime_type,
            'size' => $storedFile->size,
            'visibility' => $storedFile->visibility,
            'metadata' => $storedFile->metadata,
            'created_at' => $storedFile->created_at,
            'updated_at' => $storedFile->updated_at,
        ];
    }
}
