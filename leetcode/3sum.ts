import test from "node:test";
import { strict as assert } from "node:assert";

import * as sum_cases from "./3sum_cases.ts";

function twoSum(target: number, minIdx: number, nums: number[]): number[][] {
  let result: number[][] = [];
  // solve with n2
  for (let i = minIdx; i < nums.length - 1; i++) {
    // list is sorted, so if sum is above target, it will never be lower
    if (nums[i] > target) break;
    // skip duplicates in the same position in triple
    if (i > minIdx && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        // already sorted
        result.push([nums[i], nums[j]]);
      }
      // list is sorted, so if sum is above target, it will never be lower
      if (nums[i] + nums[j] > target) break;
    }
  }
  return result;
}

/**
 * Runtime 27ms; Beats 97.22%
 * Memory 72.73MB; Beats 74.66%
 */
function threeSum(nums: number[]): number[][] {
  let result: number[][] = [];
  // sorting is O(n*log(n)), but mapping all will take O(n2)
  nums = nums.sort((a, b) => a - b);
  // dont forget the compare fn
  for (let a = 0; a < nums.length - 2; a++) {
    // list is sorted, so if sum is above target, it will never be lower
    if (nums[a] > 0) break;
    // skip duplicates in the same position in triple
    if (a > 0 && nums[a] === nums[a - 1]) continue;

    // solve twoSum with O(n), 2 ptr
    let b = a + 1;
    let c = nums.length - 1;
    while (b < c) {
      const sum = nums[a] + nums[b] + nums[c];
      if (sum > 0) c--;
      else if (sum < 0) b++;
      else {
        result.push([nums[a], nums[b], nums[c]]);
        const lastB = nums[b];
        while (lastB === nums[b] && b < c) {
          b++;
        }
      }
    }
  }
  return result;
}

function distance(a: number[], b: number[]): number {
  return (
    (a[0] - b[0]) * (a[0] - b[0]) +
    (a[1] - b[1]) * (a[1] - b[1]) +
    (a[2] - b[2]) * (a[2] - b[2])
  );
}
test("threeSum", { timeout: 1_000 }, (t) => {
  const cases = [
    { given: [1, -1, -1, 0], expect: [[-1, 0, 1]] },
    {
      given: [-1, 0, 1, 2, -1, -4],
      expect: [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    },
    { given: [0, 1, 1], expect: [] as number[][] },
    { given: [0, 0, 0], expect: [[0, 0, 0]] },
    {
      given: sum_cases.given,
      expect: sum_cases.expect,
    },
  ];
  for (const { given, expect } of cases) {
    expect.map((v) => v.sort()).sort(distance);
    const got = threeSum(given)
      .map((v) => v.sort())
      .sort(distance);

    assert.deepEqual(
      got,
      expect,
      `given ${given}, expected ${expect} but got ${got}`
    );
  }
});
