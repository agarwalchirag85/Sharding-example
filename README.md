# Sharded User App (Node.js + PostgreSQL + Knex.js)

This is a fully working Node.js project that demonstrates **database sharding** using Express.js, PostgreSQL, and Knex.js.

## 🚀 Features

- ✅ **Hash-based Sharding** (by `user_id`)
- ✅ **Range-based Sharding** (by `created_at`)
- ✅ **Directory-based Sharding** (by `region`)
- ✅ Express.js + Knex.js
- ✅ PostgreSQL shards using Docker
- ✅ Shard routing with caching

---

## 📁 Folder Structure

```
sharded-user-app/
├── db/                    # Contains shard1, shard2, shardRouter configs
├── routes/                # Express routes (users.js)
├── index.js               # App entry point
├── knexfile.js            # Knex config
├── .env                   # Environment variables
├── package.json
├── docker-compose.yml     # PostgreSQL shards (port 5433 and 5434)
```

---

## 🐳 Setup with Docker

1. Start the PostgreSQL shards:

```bash
docker-compose up -d
```

2. Create table on **both** databases:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT
);
```

Use `psql` or any DB tool to run this on both `shard1` (5433) and `shard2` (5434).

3. Install dependencies and start the app:

```bash
npm install
npm start
```

---

## 📡 API Routes

### 🔹 Create user (hash-sharded)
```
POST /users
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

### 🔹 Get user by ID (hash-sharded)
```
GET /users/:id
```

### 🔹 Get users from shard
```
GET /users/shard/:shardId/users
```

### 🔹 Create user (range-sharded)
```
POST /users/range
{
  "name": "Bob",
  "email": "bob@example.com",
  "created_at": "2022-01-01"
}
```

### 🔹 Create user (directory-sharded)
```
POST /users/region
{
  "name": "Charlie",
  "email": "charlie@example.com",
  "region": "US"
}
```

---

## 📚 Learnings

This project demonstrates:
- Shard routing logic in `shardRouter.js`
- How to abstract sharding from application code
- When and why to use different sharding strategies

---

## 🧪 Improvements You Can Add

- Add connection pooling per shard
- Use migrations for table creation
- Add Jest + Supertest for testing
- Add monitoring per shard

---

## 🔗 Author

Made by [Chirag Agarwal] — Happy Sharding!
