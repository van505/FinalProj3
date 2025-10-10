<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::with(['course', 'department'])->get();
    }

    public function store(Request $request)
    {
        $student = new Student();
        $student->studID = $request->studID;
        $student->firstname = $request->firstname;
        $student->middlename = $request->middlename;
        $student->lastname = $request->lastname;
        $student->suffix = $request->suffix;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->date_of_birth = $request->date_of_birth;
        $student->sex = $request->sex;
        $student->department_id = $request->department_id;
        $student->course_id = $request->course_id;
        $student->yearstatus = $request->yearstatus;
        $student->enrollment_date = $request->enrollment_date;
        $student->created_by = auth()->id();
        $student->save();

        return response()->json(['message' => 'Student added successfully!']);
    }
}
