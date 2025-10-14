<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ✅ Remove from courses table
        Schema::table('courses', function (Blueprint $table) {
            if (Schema::hasColumn('courses', 'course_id')) {
                $table->dropForeign(['course_id']);
                $table->dropColumn('course_id');
            }
        });

        // ✅ Remove from departments table
        Schema::table('departments', function (Blueprint $table) {
            if (Schema::hasColumn('departments', 'department_id')) {
                $table->dropForeign(['department_id']);
                $table->dropColumn('department_id');
            }
        });

        // ✅ Remove from academic_years table
        Schema::table('academic_years', function (Blueprint $table) {
            if (Schema::hasColumn('academic_years', 'academic_year_id')) {
                $table->dropForeign(['academic_year_id']);
                $table->dropColumn('academic_year_id');
            }
        });

        // ✅ Remove from users table
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'admin_id')) {
                $table->dropForeign(['admin_id']);
                $table->dropColumn('admin_id');
            }
        });
    }
};

    