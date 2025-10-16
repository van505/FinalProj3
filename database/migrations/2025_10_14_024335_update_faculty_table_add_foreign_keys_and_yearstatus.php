<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateFacultyTableAddForeignKeysAndYearstatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('faculty', function (Blueprint $table) {
            // Drop the old string-based department column if it exists
            if (Schema::hasColumn('faculty', 'department')) {
                $table->dropColumn('department');
            }

            // Drop old status column
            if (Schema::hasColumn('faculty', 'status')) {
                $table->dropColumn('status');
            }

            // Add new columns
            $table->unsignedBigInteger('department_id')->nullable()->after('id');
            $table->unsignedBigInteger('academic_year_id')->nullable()->after('department_id');
            $table->enum('yearstatus', ['active', 'inactive'])->default('active')->after('date_hired');

            // Add foreign key constraints
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');
            $table->foreign('academic_year_id')->references('id')->on('academic_years')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('faculty', function (Blueprint $table) {
            // Drop foreign keys first
            $table->dropForeign(['department_id']);
            $table->dropForeign(['academic_year_id']);

            // Drop new columns
            $table->dropColumn(['department_id', 'academic_year_id', 'yearstatus']);

            // Re-add old columns
            $table->string('department')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
        });
    }
}
