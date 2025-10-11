<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;

class FacultyController extends Controller
{
    // List all faculty (excluding soft deleted)
    public function index()
    {
        return response()->json(Faculty::all());
    }

    // Store a new faculty
    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|unique:faculty,faculty_id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:faculty,email',
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'date_hired' => 'nullable|date',
            'status' => 'in:active,inactive',
        ]);

        $faculty = Faculty::create($validated);
        return response()->json($faculty, 201);
    }

    // Show a single faculty
    public function show($id)
    {
        $faculty = Faculty::findOrFail($id);
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
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'date_hired' => 'nullable|date',
            'status' => 'in:active,inactive',
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
