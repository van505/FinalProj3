<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faculty extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'faculty'; // ✅ confirm this matches your table name
    protected $fillable = [
        'faculty_id',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone',
        'address',
        'department_id',
        'academic_year_id',
        'yearstatus',
        'position',
        'date_hired',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    protected $dates = ['deleted_at'];
}
