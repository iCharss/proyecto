import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. DynamoDB Table
    const productsTable = new dynamodb.Table(this, 'ProductsTable', {
      tableName: `ProductsTable-${this.stackName}`,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 2. SQS Queue
    const productEventsQueue = new sqs.Queue(this, 'ProductEventsQueue', {
      queueName: 'ProductEventsQueue',
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // 3. Lambda Function
    const nodeMicroservice = new lambda.Function(this, 'NodeMicroservice', {
      functionName: 'ProductsService',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'src/handlers/api.handler',
      code: lambda.Code.fromAsset('../backend-node'),
      environment: {
        TABLE_NAME: productsTable.tableName,
        QUEUE_URL: productEventsQueue.queueUrl,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      },
      timeout: cdk.Duration.seconds(30),
    });

    // 4. Permisos para DynamoDB y SQS
    productsTable.grantReadWriteData(nodeMicroservice);
    productEventsQueue.grantSendMessages(nodeMicroservice);

    // 5. API Gateway
    const api = new apigateway.RestApi(this, 'ProductsApi', {
      restApiName: 'ProductsAPI',
      cloudWatchRole: true,
      deployOptions: {
        stageName: 'dev',
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });

    // 6. Permiso para API Gateway (FORMA CORRECTA)
    nodeMicroservice.addPermission('ApiGatewayInvokePermission', {
      principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      sourceArn: `arn:aws:execute-api:${this.region}:${this.account}:${api.restApiId}/*/*/*`
    });

    // 7. Integración Lambda
    const integration = new apigateway.LambdaIntegration(nodeMicroservice, {
      proxy: true,
      allowTestInvoke: true,
    });

    // 8. Configuración de recursos y métodos
    const productsResource = api.root.addResource('products');
    productsResource.addMethod('POST', integration, {
      authorizationType: apigateway.AuthorizationType.NONE,
      methodResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        },
      }]
    });

    // 9. Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'Endpoint base de la API',
    });

    new cdk.CfnOutput(this, 'ProductsEndpoint', {
      value: api.urlForPath('/products'),
      description: 'Endpoint específico para productos',
    });
  }
}