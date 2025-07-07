const { processProductEvent } = require('../services/productService');

exports.handler = async (event) => {
  for (const record of event.Records) {
    const { eventType, product } = JSON.parse(record.body);
    await processProductEvent(eventType, product); // Lógica de negocio
  }
};