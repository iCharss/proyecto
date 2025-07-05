<?php

namespace App\Repositories;

interface ProductRepositoryInterface {
    public function all();
    public function create(array $data);
    public function update(array $data, int $id);
    public function delete(int $id);
    public function find(int $id);
}