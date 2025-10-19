<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('courses')->insert([
            ['name' => 'BS Information Technology', 'department_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'BS Computer Science', 'department_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
