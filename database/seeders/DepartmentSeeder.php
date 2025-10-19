<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        Department::insert([
            [
                'name' => 'Information Technology',
                'head' => 'John Doe', // ✅ Added
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Computer Science',
                'head' => 'Jane Smith', // ✅ Added
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
