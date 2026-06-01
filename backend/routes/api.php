<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\FileManagerController;
use App\Http\Controllers\Api\V1\InterviewCategoryController;
use App\Http\Controllers\Api\V1\InterviewSlotController;
use App\Http\Controllers\Api\V1\TutorAvailabilityController;
use App\Http\Controllers\Api\V1\TutorManagementController;
use App\Http\Controllers\Api\V1\Admin\TutorModerationController;
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

    Route::get('/tutors', [TutorManagementController::class, 'index']);
    Route::get('/tutors/{id}', [TutorManagementController::class, 'show']);
    Route::get('/tutors/{id}/slots', [TutorManagementController::class, 'tutorSlots']);
    Route::get('/tutors/{id}/reviews', [TutorManagementController::class, 'tutorReviews']);
    Route::get('/categories', [InterviewCategoryController::class, 'index']);
    Route::get('/categories/{id}', [InterviewCategoryController::class, 'show']);
    Route::get('/slots', [InterviewSlotController::class, 'index']);
    Route::get('/slots/available', [InterviewSlotController::class, 'available']);
    Route::get('/slots/search', [InterviewSlotController::class, 'search']);
    Route::get('/slots/{id}', [InterviewSlotController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/users/me', [AuthController::class, 'me']);
        Route::patch('/users/me', [AuthController::class, 'updateMe']);

        Route::post('/tutor-applications', [TutorManagementController::class, 'apply']);
        Route::patch('/tutors/me/profile', [TutorManagementController::class, 'updateMyProfile']);
        Route::post('/tutors/me/verification-documents', [TutorManagementController::class, 'storeVerificationDocument']);
        Route::get('/tutors/me/earnings', [TutorManagementController::class, 'myEarnings']);
        Route::get('/tutors/me/reviews', [TutorManagementController::class, 'myReviews']);

        Route::post('/tutors/me/availability-rules', [TutorAvailabilityController::class, 'storeAvailabilityRule']);
        Route::get('/tutors/me/availability-rules', [TutorAvailabilityController::class, 'listAvailabilityRules']);
        Route::get('/tutors/me/availability-rules/{id}', [TutorAvailabilityController::class, 'showAvailabilityRule']);
        Route::put('/tutors/me/availability-rules/{id}', [TutorAvailabilityController::class, 'updateAvailabilityRule']);
        Route::delete('/tutors/me/availability-rules/{id}', [TutorAvailabilityController::class, 'deleteAvailabilityRule']);
        Route::post('/tutors/me/unavailable-dates', [TutorAvailabilityController::class, 'storeUnavailableDate']);
        Route::get('/tutors/me/unavailable-dates', [TutorAvailabilityController::class, 'listUnavailableDates']);
        Route::delete('/tutors/me/unavailable-dates/{id}', [TutorAvailabilityController::class, 'deleteUnavailableDate']);

        Route::post('/categories', [InterviewCategoryController::class, 'store']);
        Route::put('/categories/{id}', [InterviewCategoryController::class, 'update']);
        Route::delete('/categories/{id}', [InterviewCategoryController::class, 'destroy']);
        Route::patch('/categories/{id}/status', [InterviewCategoryController::class, 'updateStatus']);

        Route::post('/slots', [InterviewSlotController::class, 'store']);
        Route::put('/slots/{id}', [InterviewSlotController::class, 'update']);
        Route::delete('/slots/{id}', [InterviewSlotController::class, 'destroy']);
        Route::patch('/slots/{id}/publish', [InterviewSlotController::class, 'publish']);
        Route::patch('/slots/{id}/cancel', [InterviewSlotController::class, 'cancel']);

        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/bookings/upcoming', [BookingController::class, 'upcoming']);
        Route::get('/bookings/completed', [BookingController::class, 'completed']);
        Route::get('/bookings/cancelled', [BookingController::class, 'cancelled']);
        Route::get('/bookings/{id}', [BookingController::class, 'show']);
        Route::patch('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
        Route::patch('/bookings/{id}/reschedule', [BookingController::class, 'reschedule']);
        Route::patch('/bookings/{id}/confirm', [BookingController::class, 'confirm']);
        Route::patch('/bookings/{id}/complete', [BookingController::class, 'complete']);

        Route::get('/calendar/events', [CalendarController::class, 'indexEvents']);
        Route::post('/calendar/events', [CalendarController::class, 'storeEvent']);
        Route::get('/calendar/events/{id}', [CalendarController::class, 'showEvent']);
        Route::put('/calendar/events/{id}', [CalendarController::class, 'updateEvent']);
        Route::delete('/calendar/events/{id}', [CalendarController::class, 'deleteEvent']);
        Route::get('/calendar/views/monthly', [CalendarController::class, 'monthlyView']);
        Route::get('/calendar/views/weekly', [CalendarController::class, 'weeklyView']);
        Route::get('/calendar/views/daily', [CalendarController::class, 'dailyView']);

        Route::post('/files', [FileManagerController::class, 'store']);
        Route::get('/files', [FileManagerController::class, 'index']);
        Route::post('/files/batch', [FileManagerController::class, 'batchStore']);
        Route::get('/files/{id}', [FileManagerController::class, 'show']);
        Route::delete('/files/{id}', [FileManagerController::class, 'destroy']);

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

            Route::post('/tutors/{id}/approve', [TutorModerationController::class, 'approve']);
            Route::post('/tutors/{id}/reject', [TutorModerationController::class, 'reject']);
            Route::post('/tutors/{id}/suspend', [TutorModerationController::class, 'suspend']);
            Route::post('/tutors/{id}/verify', [TutorModerationController::class, 'verify']);
        });
    });
});
