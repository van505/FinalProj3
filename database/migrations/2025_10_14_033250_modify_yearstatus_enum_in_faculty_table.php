<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ModifyYearstatusEnumInFacultyTable extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE faculty MODIFY yearstatus ENUM('active', 'inactive', 'retired') DEFAULT 'active'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE faculty MODIFY yearstatus ENUM('active', 'inactive') DEFAULT 'active'");
    }
}
