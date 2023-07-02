import { SQSClient, ReceiveMessageCommand, SendMessageCommand, SendMessageCommandOutput } from '@aws-sdk/client-sqs';

type MessageBody = string | undefined;

interface MessageAdapter {
  get_message(config: {
    queue_uri: string;
  }): Promise<MessageBody | undefined>;
  send_message(config: {
    queue_uri: string;
    queue_message_body: MessageBody;
  }): Promise<void>;
}

export class SqsMessageAdapter implements MessageAdapter {
  private readonly sqs_client: SQSClient;

  constructor() {
    this.sqs_client = new SQSClient({});
  }

  async get_message(config: {
    queue_uri: string;
  }): Promise<MessageBody | undefined> {
    const { queue_uri } = config;
    const params = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ["All"],
      QueueUrl: queue_uri,
      WaitTimeSeconds: 20,
    };
    const command = new ReceiveMessageCommand(params);
    const res = await this.sqs_client.send(command);
    if (!res.Messages || res.Messages!.length === 0) return undefined;
    return res.Messages[0].Body;
  }

  async send_message(config: {
    queue_uri: string;
    queue_message_body: MessageBody;
  }): Promise<void> {
    const { queue_uri, queue_message_body } = config;
    const params = {
      QueueUrl: queue_uri,
      MessageBody: queue_message_body,
      DelaySeconds: 10,
    };
    const command = new SendMessageCommand(params);
    await this.sqs_client.send(command);
    return;
  }
}
