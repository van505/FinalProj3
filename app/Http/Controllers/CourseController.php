<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        return Course::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $course = Course::create([
            'name' => $request->name,
        ]);

        return response()->json($course, 201);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete(); // Soft delete
        return response()->json(['message' => 'Course deleted']);
    }
}
