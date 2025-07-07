const express = require('express');
const serverless = require('serverless-http');
const ProductModel = require('../models/ProductModel');

const app = express();

// Ruta GET principal
app.get('/', (req, res) => {
  res.json({ 
    status: 'API Node.js funcionando!',
    endpoints: {
      products: '/products',
      getProduct: '/products/:id'
    }
  });
});

app.use(express.json());

// Ruta específica para GET /products (antes de la ruta dinámica)
app.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Laptop' }]); // Ejemplo mock
});

// Ruta dinámica (DEBE ir después de rutas estáticas)
app.get('/products/:id', (req, res) => {
  res.json({ id: req.params.id });
});
/**
app.post('/products', async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await ProductModel.getById(req.params.id);
  res.json(product);
});
*/
module.exports.handler = serverless(app);