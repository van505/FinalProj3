<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;
/*
//--------------------------------------------------------------------------
| API Routes
//--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Protected routes
// Course routes
Route::apiResource('courses', CourseController::class)->only(['index','store','update','destroy']);
Route::get('/courses/archived', [CourseController::class, 'getArchived']);
Route::post('/courses/restore/{id}', [CourseController::class, 'restore']);

// Department routes
Route::apiResource('departments', DepartmentController::class)->only(['index','store','update','destroy']);

// Profile routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile/update', [ProfileController::class, 'updateProfile']);
    Route::put('/profile/password', [ProfileController::class, 'changePassword']);
});

// Student routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('students', StudentController::class)->only(['index','store','show','update','destroy']);
});

// Faculty routes
Route::apiResource('faculty', FacultyController::class)->only(['index','store','show','update','destroy']);

// Academic years
Route::apiResource('academic-years', AcademicYearController::class)->only(['index','store','update','destroy']);
Route::put('/academic-years/{id}/activate', [AcademicYearController::class, 'activate']);


// Get all archived data
Route::get('/archives', [ArchiveController::class, 'index']);
Route::post('/archives/restore/{type}/{id}', [ArchiveController::class, 'restore']);

// Report routes
Route::apiResource('reports', ReportController::class)->only(['index','store','show','destroy']);

// Dashboard route
Route::get('/dashboard', [DashboardController::class, 'index']);
