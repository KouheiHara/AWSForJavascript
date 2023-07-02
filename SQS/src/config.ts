import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  aws: {
    sqs : {
      alert_queue_url: process.env.QUEUE_URL!,
    },
  }
};