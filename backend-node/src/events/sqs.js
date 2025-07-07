const { SQS } = require('aws-sdk');
const sqs = new SQS();

const sendProductEvent = async (eventType, product) => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify({ eventType, product }),
  };
  return await sqs.sendMessage(params).promise();
};

module.exports = { sendProductEvent };