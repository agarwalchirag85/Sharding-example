import dotenv from 'dotenv';
dotenv.config();

export const shard1 = {
  client: 'pg',
  connection: process.env.SHARD1_URL
};

export const shard2 = {
  client: 'pg',
  connection: process.env.SHARD2_URL
};
