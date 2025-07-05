<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Nombre de la tabla (opcional si sigue la convención)
    protected $table = 'products';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'name',
        'price',
        'description'
        // Agrega aquí otros campos de tu tabla products
    ];
}
