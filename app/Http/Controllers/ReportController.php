<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // ✅ Fetch reports with optional filters
    public function index(Request $request)
    {
        $query = Report::with(['user', 'course', 'department']);

        // Filters
        if ($request->has('subject') && in_array($request->subject, ['faculty', 'student'])) {
            $query->where('subject', $request->subject);
        }

        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->has('department_id') && $request->department_id) {
            $query->where('department_id', $request->department_id);
        }

        $reports = $query->latest()->get();

        return response()->json($reports);
    }

    // ✅ Store a new report
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|in:faculty,student',
            'content' => 'required|string',
            'course_id' => 'nullable|exists:courses,id',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $validated['user_id'] = auth()->id(); // if not using auth, you can remove this

        $report = Report::create($validated);

        return response()->json($report, 201);
    }

    // ✅ Show one report
    public function show($id)
    {
        $report = Report::with(['user', 'course', 'department'])->findOrFail($id);
        return response()->json($report);
    }

    // ✅ Delete a report
    public function destroy($id)
    {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'Report deleted successfully']);
    }
}
