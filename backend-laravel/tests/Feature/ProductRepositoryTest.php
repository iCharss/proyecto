<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Repositories\ProductRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductRepositoryTest extends TestCase {
    use RefreshDatabase; // Esto ahora usará MySQL

    public function test_create_product() {
        $repository = new ProductRepository();
        $product = $repository->create([
            'name' => 'Laptop',  // Corregí el typo ("Laptop" vs "Laptop")
            'price' => 999.99,
            'description' => 'Test description' // Asegúrate de incluir todos los campos requeridos
        ]);
        
        $this->assertDatabaseHas('products', [
            'name' => 'Laptop',
            'price' => 999.99
        ]);
    }
}