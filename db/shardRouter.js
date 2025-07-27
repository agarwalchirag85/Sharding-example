import shard1 from './shard1.js';
import shard2 from './shard2.js';

const cache = {
  0: shard1,
  1: shard2
};

// Hash-based sharding by user ID
export function getShard(userId) {
  const hash = userId % 2;
  return cache[hash];
}

// Range-based example
export function getShardByDate(createdAt) {
  const year = new Date(createdAt).getFullYear();
  return year < 2023 ? shard1 : shard2;
}

// Directory sharding via customer-region lookup
export const directoryShardMap = {
  'IN': shard1,
  'US': shard2
};

export function getShardByRegion(regionCode) {
  return directoryShardMap[regionCode] || shard1;
}
