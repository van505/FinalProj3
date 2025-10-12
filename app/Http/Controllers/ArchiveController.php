<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Department;
use App\Models\AcademicYear;
use App\Models\Faculty;
use App\Models\Student;

class ArchiveController extends Controller
{
    // Get all archived data
    public function index()
    {
        return response()->json([
            'courses' => Course::onlyTrashed()->get(),
            'departments' => Department::onlyTrashed()->get(),
            'academic_years' => AcademicYear::onlyTrashed()->get(),
            'faculties' => Faculty::onlyTrashed()->get(),
            'students' => Student::onlyTrashed()->get(),
        ]);
    }

    // Restore function (shared for all models)
    public function restore(Request $request, $type, $id)
    {
        $models = [
            'course' => Course::class,
            'department' => Department::class,
            'academic_year' => AcademicYear::class,
            'faculty' => Faculty::class,
            'student' => Student::class,
        ];

        if (!array_key_exists($type, $models)) {
            return response()->json(['message' => 'Invalid type'], 400);
        }

        $model = $models[$type];
        $model::onlyTrashed()->findOrFail($id)->restore();

        return response()->json(['message' => ucfirst($type) . ' restored successfully!']);
    }
}
