<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

# API
Route::get('/api/users', function () {
	return App\User::all();
});

Route::post('/api/users', function () {
	return App\User::create(Request::all());
});

Route::get('/api/user/{id}', function ($id) {
	return App\User::findOrFail($id);
});

Route::patch('/api/user/{id}', function ($id) {
	App\User::findOrFail($id)->update(Request::all());

	return response()->json(Request::all());
});

Route::delete('/api/user/{id}' , function ($id) {
	return App\User::destroy($id);
});

Route::get('/', 'UserController@index');
