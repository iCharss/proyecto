<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface {
    public function all() {
        return Product::all();
    }

    public function create(array $data) {
        return Product::create($data);
    }

    public function update(array $data, int $id) {
        return Product::where('id', $id)->update($data);
    }

    public function delete(int $id) {
        return Product::destroy($id);
    }

    public function find(int $id) {
        return Product::findOrFail($id);
    }
}