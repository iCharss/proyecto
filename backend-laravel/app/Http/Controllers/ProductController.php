<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repositories\ProductRepositoryInterface;
/**
 * @OA\Info(
 *     title="API de Productos (Laravel)",
 *     version="1.0.0",
 *     description="Documentación de la API de productos usando Swagger/OpenAPI",
 *     @OA\Contact(email="tu@email.com")
 * )
 */
class ProductController extends Controller {
    private $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository) {
        $this->productRepository = $productRepository;
    }
    /**
    * @OA\Get(
    *     path="/api/products",
    *     summary="Get all products",
    *     @OA\Response(response="200", description="List of products"),
    *     security={{"bearerAuth":{}}}
    * )
    */
    public function index() {
        return $this->productRepository->all();
    }

    /**
    * @OA\Post(
    *     path="/api/products",
    *     summary="Create a new product",
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/Product")
    *     ),
    *     @OA\Response(response="201", description="Product created"),
    *     security={{"bearerAuth":{}}}
    * )
    */
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            // Agrega más validaciones según tu modelo Product
        ]);
        $product = $this->productRepository->create($validated);
        return response()->json($product, 201);
    }

    /**
    * @OA\Put(
    *     path="/api/products/{id}",
    *     summary="Update a product",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(ref="#/components/schemas/Product")
    *     ),
    *     @OA\Response(response="200", description="Product updated"),
    *     security={{"bearerAuth":{}}}
    * )
    */
    public function update(Request $request, $id) {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            // Agrega más validaciones según tu modelo Product
        ]);
        $product = $this->productRepository->update($id, $validated);
        return response()->json($product);
    }

    /**
    * @OA\Delete(
    *     path="/api/products/{id}",
    *     summary="Delete a product",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(response="204", description="Product deleted"),
    *     security={{"bearerAuth":{}}}
    * )
    */
    public function destroy($id) {
        $this->productRepository->delete($id);
        return response()->json(null, 204);
    }
}