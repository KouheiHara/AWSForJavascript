import { config } from './config';
import { SqsMessageAdapter } from './message-adapter';

async function main() {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  console.log(config)
  const message_adapter = new SqsMessageAdapter({
    access_key_id: config.aws.access_key_id,
    secret_access_key: config.aws.secret_access_key,
    sqs_queue_url: config.aws.sqs.queue_url,
  });
  const send_result = await message_adapter.send_message({
    title: 'TEST MESSAGE',
    message_body: 'Hello World',
  });
  console.log(send_result.request_id);

  await wait(1000);
  const get_result = await message_adapter.get_message<{ 
    title: string;
    message_body: string;
  }>();
  console.log(get_result);  
}

main()