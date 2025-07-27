import express from 'express';
import { getShard, getShardByDate, getShardByRegion } from '../db/shardRouter.js';
import shard1 from '../db/shard1.js';
import shard2 from '../db/shard2.js';

const router = express.Router();

// Hash-based Sharding
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const tempShard = getShard(0);
    const [user] = await tempShard('users').insert({ name, email }).returning('*');
    const userId = user.id;

    const shard = getShard(userId);
    if (shard !== tempShard) {
      await tempShard('users').where('id', userId).del();
      await shard('users').insert({ id: userId, name, email });
    }

    res.status(201).json({ ...user, shard: shard === shard1 ? 'shard1' : 'shard2' });
  } catch (e) {
    res.status(500).json({ error: 'Insert failed' });
  }
});

// Fetch by user ID using hash sharding
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const shard = getShard(id);
  try {
    const user = await shard('users').where({ id }).first();
    if (user) res.json(user);
    else res.status(404).json({ error: 'Not found' });
  } catch (e) {
    res.status(500).json({ error: 'Query failed' });
  }
});

// Admin route: get all users from a shard
router.get('/shard/:shardId/users', async (req, res) => {
  const shardId = req.params.shardId;
  const db = shardId === '1' ? shard1 : shard2;
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

// Range-based sharding example
router.post('/range', async (req, res) => {
  const { name, email, created_at } = req.body;
  const shard = getShardByDate(created_at);
  try {
    const [user] = await shard('users').insert({ name, email }).returning('*');
    res.status(201).json({ ...user, rangeSharded: true });
  } catch (e) {
    res.status(500).json({ error: 'Range insert failed' });
  }
});

// Directory-based sharding example
router.post('/region', async (req, res) => {
  const { name, email, region } = req.body;
  const shard = getShardByRegion(region);
  try {
    const [user] = await shard('users').insert({ name, email }).returning('*');
    res.status(201).json({ ...user, region });
  } catch (e) {
    res.status(500).json({ error: 'Directory insert failed' });
  }
});

export default router;
