import knex from 'knex';
import { shard2 } from '../knexfile.js';

export default knex(shard2);
