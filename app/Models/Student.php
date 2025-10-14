<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'studID',
        'firstname',
        'middlename',
        'lastname',
        'suffix',
        'email',
        'phone',
        'date_of_birth',
        'sex',
        'department_id',
        'course_id',
        'academic_year_id',
        'yearstatus',
        'enrollment_date',
        'userID',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    // 🏫 Relationships
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(\App\Models\AcademicYear::class, 'academic_year_id');
    }
}
