<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Ruta de prueba inicial
Route::get('/', function () {
    return response()->json(['message' => 'API Laravel funcionando!']);
});

// Autenticación JWT (Paso 2)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas con JWT
Route::middleware('auth:api')->group(function () {
    Route::apiResource('products', ProductController::class);
    // User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Productos (CRUD con Repository Pattern)
    Route::apiResource('products', ProductController::class);
});