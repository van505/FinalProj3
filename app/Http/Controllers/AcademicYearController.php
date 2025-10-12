<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use Illuminate\Http\Request;

class AcademicYearController extends Controller
{
    public function index()
    {
        return response()->json(AcademicYear::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string|unique:academic_years,year',
        ]);

        $year = AcademicYear::create([
            'year' => $request->year,
        ]);

        return response()->json($year, 201);
    }

    public function update(Request $request, $id)
    {
        $year = AcademicYear::findOrFail($id);
        $year->update($request->only('year', 'is_active'));
        return response()->json($year);
    }

    public function destroy($id)
    {
        $year = AcademicYear::findOrFail($id);
        $year->delete();
        return response()->json(['message' => 'Academic year archived successfully']);
    }

    public function activate($id)
    {
        // deactivate all
        AcademicYear::where('is_active', true)->update(['is_active' => false]);

        // activate chosen year
        $year = AcademicYear::findOrFail($id);
        $year->update(['is_active' => true]);

        return response()->json(['message' => 'Academic year activated successfully']);
    }
}
