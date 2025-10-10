<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faculty extends Model
{
    use SoftDeletes;

    protected $table = 'faculty';

    protected $fillable = [
        'faculty_id',
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'phone',
        'address',
        'department',
        'position',
        'date_hired',
        'status',
    ];
}