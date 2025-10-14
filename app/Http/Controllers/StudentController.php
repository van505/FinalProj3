<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    // List all students (excluding soft deleted)
    public function index()
    {
        return response()->json(Student::with(['course', 'department', 'academicYear'])->get());
    }

    // Store a new student
    public function store(Request $request)
    {
        $validated = $request->validate([
            'studID' => 'required|unique:students,studID',
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:50',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date',
            'sex' => 'nullable|in:Male,Female',
            'department_id' => 'nullable|integer|exists:departments,id',
            'course_id' => 'nullable|integer|exists:courses,id',
            'academic_year_id' => 'nullable|integer|exists:academic_years,id',
            'yearstatus' => 'nullable|string|max:255',
            'enrollment_date' => 'nullable|date',
            'status' => 'in:active,inactive',
        ]);

        $student = Student::create($validated);

        return response()->json($student, 201);
    }

    // Show a single student
    public function show($id)
    {
        $student = Student::with(['course', 'department', 'academicYear'])->findOrFail($id);
        return response()->json($student);
    }

    // Update a student
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'studID' => 'sometimes|required|unique:students,studID,' . $id,
            'firstname' => 'sometimes|required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'sometimes|required|string|max:255',
            'suffix' => 'nullable|string|max:50',
            'email' => 'sometimes|required|email|unique:students,email,' . $id,
            'phone' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date',
            'sex' => 'nullable|in:Male,Female',
            'department_id' => 'nullable|integer|exists:departments,id',
            'course_id' => 'nullable|integer|exists:courses,id',
            'academic_year_id' => 'nullable|integer|exists:academic_years,id',
            'yearstatus' => 'nullable|string|max:255',
            'enrollment_date' => 'nullable|date',
            'status' => 'in:active,inactive',
        ]);

        $student->update($validated);

        return response()->json($student);
    }

    // Soft delete a student
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully!']);
    }
}
