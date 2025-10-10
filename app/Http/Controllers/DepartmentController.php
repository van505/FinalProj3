<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // Get all departments
    public function index()
    {
        // ✅ Wrap response
        return response()->json(Department::all());
    }

    // Store a new department
    public function store(Request $request)
    {
        // ✅ Add validation
        $request->validate([
            'name' => 'required|string|max:255',
            'head' => 'nullable|string|max:255', // optional field
        ]);

        // Existing logic (keep this)
        $department = new Department();
        $department->name = $request->name;
        $department->head = $request->head;
        $department->save();

        // ✅ Return full JSON response
        return response()->json([
            'success' => true,
            'message' => 'Department added successfully',
            'data' => $department
        ]);
    }

    // Destroy a department
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete(); // Soft delete
        return response()->json(['message' => 'Department deleted']);
    }
}
