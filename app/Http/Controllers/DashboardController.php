<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Faculty;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // ✅ Get total counts and chart data
    public function index()
    {
        $totalStudents = Student::count();
        $totalFaculty = Faculty::count();

        // ✅ Students per course
        $studentsPerCourse = Course::select('course_name', DB::raw('COUNT(students.id) as total'))
            ->leftJoin('students', 'courses.id', '=', 'students.course_id')
            ->groupBy('courses.id', 'course_name')
            ->get();

        // ✅ Faculty per department
        $facultyPerDepartment = Department::select('department_name', DB::raw('COUNT(faculties.id) as total'))
            ->leftJoin('faculties', 'departments.id', '=', 'faculties.department_id')
            ->groupBy('departments.id', 'department_name')
            ->get();

        return response()->json([
            'total_students' => $totalStudents,
            'total_faculty' => $totalFaculty,
            'students_per_course' => $studentsPerCourse,
            'faculty_per_department' => $facultyPerDepartment,
        ]);
    }
}
