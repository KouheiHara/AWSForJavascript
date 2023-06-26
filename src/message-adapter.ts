import { SQSClient, ReceiveMessageCommand, SendMessageCommand } from '@aws-sdk/client-sqs';

interface MessageAdapter {
  get_message<T>(): Promise<T | undefined>;
  send_message(config: { 
    title: string;
    message_body: string;
  }): Promise<{ request_id: undefined | string; }>;
}

export class SqsMessageAdapter implements MessageAdapter {
  readonly sqs_client: SQSClient;
  readonly sqs_queue_url: string;

  constructor(config: {
    access_key_id: string;
    secret_access_key: string;
    sqs_queue_url: string;
  }) {
    this.sqs_client = new SQSClient({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: config.access_key_id,
        secretAccessKey: config.secret_access_key,
      },
    });
    this.sqs_queue_url = config.sqs_queue_url;
  }

  async get_message<T>(): Promise<T | undefined> {
    const params = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ["All"],
      QueueUrl: this.sqs_queue_url,
      WaitTimeSeconds: 20,
    };
    const command = new ReceiveMessageCommand(params);
    const res = await this.sqs_client.send(command);
    if (!res.Messages || res.Messages!.length === 0) return undefined;
    return res as T;
  }
  
  async send_message(config: { 
    title: string;
    message_body: string;
  }): Promise<{ request_id: undefined | string; }> {
    const { title, message_body } = config;
    const params = {
      DelaySeconds: 10,
      テスト
      MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: title,
        },
      },
      MessageBody: message_body,
      QueueUrl: this.sqs_queue_url,
    }
    const command = new SendMessageCommand(params);
    const res = await this.sqs_client.send(command);
    return {
      request_id: res.$metadata.requestId,
    };
  }
}
