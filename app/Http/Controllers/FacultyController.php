<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;

class FacultyController extends Controller
{
    // List all faculty with relationships
    public function index()
    {
        $faculties = Faculty::with(['department', 'academicYear'])->get();
        return response()->json($faculties);
    }

    // Store a new faculty
    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|string|max:255|unique:faculty,faculty_id',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:faculty,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'yearstatus' => 'required|string|in:active,inactive,retired',
            'position' => 'nullable|string|max:255',
            'date_hired' => 'nullable|date',
        ]);

        $faculty = Faculty::create($validated);
        return response()->json($faculty, 201);
    }

    // Show a single faculty with relationships
    public function show($id)
    {
        $faculty = Faculty::with(['department', 'academicYear'])->findOrFail($id);
        return response()->json($faculty);
    }

    // Update a faculty
    public function update(Request $request, $id)
    {
        $faculty = Faculty::findOrFail($id);

        $validated = $request->validate([
            'faculty_id' => 'sometimes|required|unique:faculty,faculty_id,' . $id,
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:faculty,email,' . $id,
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'department_id' => 'nullable|exists:departments,id',
            'academic_year_id' => 'nullable|exists:academic_years,id',
            'position' => 'nullable|string|max:255',
            'date_hired' => 'nullable|date',
            'yearstatus' => 'in:active,inactive',
        ]);

        $faculty->update($validated);
        return response()->json($faculty);
    }

    // Soft delete a faculty
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();

        return response()->json(['message' => 'Faculty deleted successfully!']);
    }
}
