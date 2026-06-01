<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\InterviewCategory;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InterviewCategoryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:140', 'unique:interview_categories,slug'],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $category = InterviewCategory::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?? Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'] ?? 'active',
        ]);

        return response()->json([
            'data' => $category,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = InterviewCategory::query()->orderBy('name');

        if ($request->filled('status')) {
            $query->where('status', (string) $request->string('status'));
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json([
            'data' => InterviewCategory::findOrFail($id),
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $category = InterviewCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:120'],
            'slug' => ['sometimes', 'string', 'max:140', 'unique:interview_categories,slug,'.$category->id],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'status' => ['sometimes', 'in:active,inactive'],
        ]);

        if (isset($validated['name']) && ! isset($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->fill($validated)->save();

        return response()->json([
            'data' => $category->fresh(),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $category = InterviewCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'data' => [
                'message' => 'Category deleted successfully.',
            ],
        ]);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'status' => ['required', 'in:active,inactive'],
        ]);

        $category = InterviewCategory::findOrFail($id);
        $category->forceFill(['status' => $validated['status']])->save();

        return response()->json([
            'data' => $category->fresh(),
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
