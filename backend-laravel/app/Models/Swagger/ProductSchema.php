<?php

namespace App\Models\Swagger;

/**
 * @OA\Schema(
 *     schema="Product",
 *     required={"name", "price", "description"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Laptop HP"),
 *     @OA\Property(property="description", type="string", example="Laptop de última generación", nullable=true),
 *     @OA\Property(property="price", type="number", format="float", example=1299.99),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-05-21T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-05-21T12:00:00Z")
 * )
 */
class ProductSchema {}