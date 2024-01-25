import test from 'node:test';
import assert from 'node:assert';

import { Bucket } from './rate-limit.mjs';

test('Bucket constructor', (t) => {
  assert.deepEqual(
    new Bucket(),
    { instant: 0, counter: 0, limit: 10, rate: 10, interval: 60_000 },
    'empty'
  );
  assert.deepEqual(
    new Bucket(-1, -1, -1, -1),
    { instant: 0, counter: 0, limit: 10, rate: 10, interval: 60_000 },
    'Invalid params'
  );
  const instant = new Date();
  assert.deepEqual(
    new Bucket(instant, 0, 100, 100, 100),
    { instant, counter: 0, limit: 100, rate: 100, interval: 100 },
    'Some params'
  );
});

test('rate limit stop function', (t) => {
  const bucket = new Bucket(0, 0, 2, 1, 1);
  assert.equal(bucket.counter, 0, 'counter initiated');

  assert.strictEqual(bucket.shouldStop(1), false, 'count 1 should allow');
  assert.equal(bucket.counter, 0, 'counter increased');

  assert.strictEqual(bucket.shouldStop(2), false, 'count 1 should allow');
  assert.equal(bucket.counter, 0, 'counter increased');
  assert.strictEqual(bucket.shouldStop(2), false, 'count 1 should allow');
  assert.equal(bucket.counter, 1, 'counter increased');
  assert.strictEqual(bucket.shouldStop(2), false, 'count 2 should allow');
  assert.equal(bucket.counter, 2, 'counter increased');
  assert.strictEqual(bucket.shouldStop(2), true, 'count 3 should deny');
  assert.equal(bucket.counter, 3, 'counter increased');
  assert.strictEqual(bucket.shouldStop(2), true, 'count 4 should deny');
  assert.equal(bucket.counter, 4, 'counter increased');

  assert.strictEqual(bucket.shouldStop(4), true, 'count 3 should deny');
  assert.equal(bucket.counter, 3, 'counter increased');
  assert.strictEqual(bucket.shouldStop(6), false, 'count 2 should allow');
  assert.equal(bucket.counter, 2, 'counter increased');
});
