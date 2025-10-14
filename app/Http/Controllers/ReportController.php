<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Faculty;

class ReportController extends Controller
{
    // Generate student reports
    public function studentReport(Request $request)
    {
        $query = Student::query();

        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->has('academic_year_id')) {
            $query->where('academic_year_id', $request->academic_year_id);
        }

        $students = $query->get();

        return response()->json($students);
    }

    // Generate faculty reports
    public function facultyReport(Request $request)
    {
        $query = Faculty::query();

        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->has('academic_year_id')) {
            $query->where('academic_year_id', $request->academic_year_id);
        }

        $faculty = $query->get();

        return response()->json($faculty);
    }
}
