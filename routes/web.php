<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {  
    return view('welcome');
});


Route::get('/profile', function () {
    return view('welcome');
});


Route::get('/systemsettings', function () {
    return view('welcome');
});



Route::get('/report', function () {
    return view('welcome');
});



Route::get('/faculty', function () {
    return view('welcome');
});


Route::get('/students', function () {
    return view('welcome');
});