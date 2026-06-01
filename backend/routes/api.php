<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'service' => 'backend-api',
        ]);
    });

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::post('/refresh-token', [AuthController::class, 'refreshToken'])->middleware('auth:sanctum');
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
        Route::post('/verify-email', [AuthController::class, 'verifyEmail'])->middleware('auth:sanctum');
        Route::post('/resend-verification', [AuthController::class, 'resendVerification'])->middleware('auth:sanctum');
        Route::post('/change-password', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');
        Route::post('/social-login', [AuthController::class, 'socialLogin']);
        Route::post('/mfa/setup', [AuthController::class, 'setupMfa'])->middleware('auth:sanctum');
        Route::post('/mfa/verify', [AuthController::class, 'verifyMfa']);
        Route::post('/mfa/disable', [AuthController::class, 'disableMfa'])->middleware('auth:sanctum');
        Route::get('/sessions', [AuthController::class, 'sessions'])->middleware('auth:sanctum');
        Route::delete('/sessions/{id}', [AuthController::class, 'destroySession'])->middleware('auth:sanctum');
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/users/me', [AuthController::class, 'me']);
        Route::patch('/users/me', [AuthController::class, 'updateMe']);

        Route::prefix('admin')->group(function (): void {
            Route::get('/users', [UserManagementController::class, 'index']);
            Route::get('/users/{id}', [UserManagementController::class, 'show']);
            Route::post('/users', [UserManagementController::class, 'store']);
            Route::patch('/users/{id}', [UserManagementController::class, 'update']);
            Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);
            Route::get('/roles', [UserManagementController::class, 'roles']);
            Route::patch('/users/{id}/status', [UserManagementController::class, 'updateStatus']);
            Route::post('/users/{id}/suspend', [UserManagementController::class, 'suspend']);
            Route::post('/users/{id}/ban', [UserManagementController::class, 'ban']);
            Route::post('/users/{id}/restore', [UserManagementController::class, 'restore']);
            Route::get('/users/{id}/activity-logs', [UserManagementController::class, 'activityLogs']);
            Route::get('/users/{id}/login-history', [UserManagementController::class, 'loginHistory']);
        });
    });
});
