const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');


const dynamoDB = DynamoDBDocument.from(new DynamoDB({
  region: 'us-east-1',
}));

const TABLE_NAME = process.env.TABLE_NAME;

class ProductModel {
  async create(product) {
    const params = {
      TableName: TABLE_NAME,
      Item: { ...product, id: uuidv4() },
    };
    return await dynamoDB.put(params);
  }

  async getById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };
    return (await dynamoDB.get(params)).Item;
  }
}

// ¡Exporta la CLASE, no una instancia! (para testing)
module.exports = ProductModel; // Cambia esto