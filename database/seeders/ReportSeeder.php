<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Report;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ✅ Sample reports for testing
        Report::insert([
            [
                'title' => 'Faculty Performance Review',
                'subject' => 'faculty',
                'content' => 'Faculty in the IT department performed excellently during the semester.',
                'course_id' => null, // optional if not linked to a specific course
                'department_id' => 1, // update this to match your department ID
                'user_id' => 1, // admin
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Student Attendance Report',
                'subject' => 'student',
                'content' => 'Attendance for BSIT students remains consistent across all sections.',
                'course_id' => 1, // update this to match an existing course
                'department_id' => null,
                'user_id' => 1, // admin
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Department Progress Summary',
                'subject' => 'faculty',
                'content' => 'The Computer Science department has completed all scheduled activities.',
                'course_id' => null,
                'department_id' => 2, // update this to match your department ID
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
