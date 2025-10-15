<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with('department')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer|exists:departments,id', // <-- add this
        ]);

        $course = Course::create([
            'name' => $request->name,
            'department_id' => $request->department_id, // <-- add this
        ]);

        return response()->json($course, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|integer|exists:departments,id', // <-- add this
        ]);

        $course = Course::findOrFail($id);
        $course->update([
            'name' => $request->name,
            'department_id' => $request->department_id, // <-- add this
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course
        ]);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete(); // Soft delete
        return response()->json(['message' => 'Course archived']);
    }

    // ✅ Get only archived (soft-deleted) courses
    public function getArchived()
    {
        $archived = Course::onlyTrashed()->get();
        return response()->json($archived);
    }

    // ✅ Restore a soft-deleted course
    public function restore($id)
    {
        $course = Course::onlyTrashed()->findOrFail($id);
        $course->restore();
        return response()->json(['message' => 'Course restored successfully']);
    }
}
