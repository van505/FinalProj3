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
        'last_name',
        'email',
        'middle_name',
        'phone',
        'address',
        'department',
        'position',
        'date_hired',
        'status',
    ];

    protected $dates = ['deleted_at'];
}
