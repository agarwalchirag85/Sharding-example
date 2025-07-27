import knex from 'knex';
import { shard1 } from '../knexfile.js';

export default knex(shard1);
