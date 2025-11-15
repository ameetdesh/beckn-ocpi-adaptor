# Testing Individual Packages

Each package can be tested independently. Here's how to test each one:

## Prerequisites

Make sure you have the dependencies installed in each package:
```bash
cd packages/<package-name>
npm install
```

## Testing @beckn/ocpi-adaptor-core

Tests the core SDK with in-memory implementations:

```bash
cd packages/core
npm run test:example
```

This tests:
- Cache store interface
- Log service interface
- Factory functions

## Testing @beckn/cache-redis

Tests the Redis cache implementation (requires Redis running):

```bash
cd packages/cache-redis
npm run test:example
```

Make sure Redis is running:
```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or using local Redis
redis-server
```

## Testing @beckn/log-clickhouse

Tests the ClickHouse log implementation (requires ClickHouse running):

```bash
cd packages/log-clickhouse
npm run test:example
```

Make sure ClickHouse is running:
```bash
# Using Docker
docker run -d -p 8123:8123 -p 9000:9000 clickhouse/clickhouse-server:latest
```

## Testing @beckn/server

Tests the Express server factory:

```bash
cd packages/server
npm run test:example
```

This will start a test server on port 3001. Visit:
- http://localhost:3001/test
- http://localhost:3001/health

## Running All Tests

From the root directory, you can test all packages using npm scripts:

```bash
# Test individual packages
npm run test:core              # Test core package (no external dependencies)
npm run test:cache-redis       # Test Redis cache (requires Redis)
npm run test:log-clickhouse    # Test ClickHouse log (requires ClickHouse)
npm run test:server             # Test Express server

# Test all packages at once
npm run test:packages
```

Or test from within each package directory:

```bash
# Test core package
cd packages/core && npm run test:example && cd ../..

# Test cache-redis (requires Redis)
cd packages/cache-redis && npm run test:example && cd ../..

# Test log-clickhouse (requires ClickHouse)
cd packages/log-clickhouse && npm run test:example && cd ../..

# Test server
cd packages/server && npm run test:example && cd ../..
```

## Environment Variables

Some packages support environment variables for configuration:

### cache-redis
- `REDIS_HOST` (default: localhost)
- `REDIS_PORT` (default: 6379)
- `REDIS_PASSWORD` (optional)

### log-clickhouse
- `CLICKHOUSE_HOST` (default: localhost)
- `CLICKHOUSE_PORT` (default: 8123)
- `CLICKHOUSE_DATABASE` (default: default)
- `CLICKHOUSE_USERNAME` (optional)
- `CLICKHOUSE_PASSWORD` (optional)
- `CLICKHOUSE_LOG_TABLE` (default: app_logs)

