import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  aws: {
    access_key_id: process.env.ACCESS_KEY_ID!,
    secret_access_key: process.env.SECRET_ACCESS_KEY!,
    sqs : {
      queue_url: process.env.QUEUE_URL!,
    },
  }
};