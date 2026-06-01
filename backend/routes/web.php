<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'API backend only. Use the frontend application for the UI.',
    ]);
});
