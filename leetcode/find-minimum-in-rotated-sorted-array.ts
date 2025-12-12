import test from "node:test";
import { strict as assert } from "node:assert";

/**
 * Runtime 0ms; Beats 100.00%
 * Memory 56.08MB; Beats 10.57%
 */
function findMin(nums: number[]): number {
  // [0,1,2,4,5,6,7]
  // [4,5,6,7,0,1,2]
  /**
   * cases
   *    a < b < c -> 1,2,3 min on head
   *    a > b < c -> 3,1,2 min midle, dont care because pivot will be included
   *    a < b > c -> 2,3,1 min on tail
   *    a > b > c never because it would be reversed, not shifted
   */
  let head = 0;
  let tail = nums.length - 1;
  while (head < tail) {
    let len = tail - head;
    let pivot = head + (len >> 1);

    let a = nums[head];
    let b = nums[pivot];
    let c = nums[tail];
    if (len < 3 || head === pivot || tail === pivot) {
      // base case
      return Math.min(a, b, c);
    }
    // recur
    let next_head = head;
    let next_tail = pivot;
    if (b > c) {
      next_head = pivot;
      next_tail = tail;
    }
    head = next_head;
    tail = next_tail;
  }
  return nums[0];
}

test("findMin", { timeout: 1_000 }, (t) => {
  const cases = [
    { given: [3, 4, 5, 1, 2], expect: 1 },
    { given: [4, 5, 6, 7, 0, 1, 2], expect: 0 },
    { given: [11, 13, 15, 17], expect: 11 },
  ];
  for (const { given, expect } of cases) {
    const got = findMin(given);
    assert.deepEqual(
      got,
      expect,
      `given ${given}, expected ${expect} but got ${got}`
    );
  }
});
