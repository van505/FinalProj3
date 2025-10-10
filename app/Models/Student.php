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

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function deleter()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}
