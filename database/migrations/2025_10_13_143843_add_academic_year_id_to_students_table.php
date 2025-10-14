<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('students') && !Schema::hasColumn('students', 'academic_year_id')) {
            Schema::table('students', function (Blueprint $table) {
                // Add academic_year_id column after course_id
                $table->unsignedBigInteger('academic_year_id')->nullable()->after('course_id');

                // Add foreign key constraint
                $table->foreign('academic_year_id')
                    ->references('id')
                    ->on('academic_years')
                    ->onDelete('set null');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('students') && Schema::hasColumn('students', 'academic_year_id')) {
            Schema::table('students', function (Blueprint $table) {
                $table->dropForeign(['academic_year_id']);
                $table->dropColumn('academic_year_id');
            });
        }
    }
};
