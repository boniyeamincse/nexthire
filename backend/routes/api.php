<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

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
    });
});
