const { mockClient } = require('aws-sdk-client-mock');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const ProductModel = require('../models/ProductModel');

// Configura el mock CORRECTAMENTE
const ddbMock = mockClient(DynamoDBDocumentClient);

describe('ProductModel', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  test('Crea un producto en DynamoDB', async () => {
    // Configura el mock para simular éxito
    ddbMock.on(PutCommand).resolves({});

    const productModel = new ProductModel();
    const product = { name: 'Laptop', price: 999.99 };
    await productModel.create(product);

    // Aserción CORREGIDA (usa .calls en lugar de toHaveReceivedCommandWith)
    expect(ddbMock.calls()).toHaveLength(1);
    
    const receivedCommand = ddbMock.calls()[0].args[0];
    expect(receivedCommand).toBeInstanceOf(PutCommand);
    expect(receivedCommand.input).toEqual({
      TableName: 'ProductsTable',
      Item: {
        id: expect.any(String),
        name: 'Laptop',
        price: 999.99
      }
    });
  });
});