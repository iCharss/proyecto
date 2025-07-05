const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/node-api', (req, res) => {
  res.json({ message: "Microservicio Node.js funcionando!" });
});

module.exports.handler = serverless(app);