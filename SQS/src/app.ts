import { config } from './config';
import { SqsMessageAdapter } from './adapters/message_adapter';

async function main() {
  const alert_queue_url = config.aws.sqs.alert_queue_url;
  const message_adapter = new SqsMessageAdapter();
  await message_adapter.send_message({
    queue_uri: alert_queue_url,
    queue_message_body: 'Alert Test',
  });

  // const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // // NOTE: 動作確認のため、適当に待ち時間を置く
  // await wait(5000);
  // const get_result = await message_adapter.get_message({
  //   queue_uri: alert_queue_url,
  // });
  // console.log(get_result);
}

main()