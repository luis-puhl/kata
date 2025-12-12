import test from "node:test";
import { strict as assert } from "node:assert";

import {
  MinHeap,
  MaxHeap,
} from "@datastructures-js/heap";

// import {
//   BinarySearchTree,
//   BinarySearchTreeNode,
//   AvlTree,
//   AvlTreeNode,
//   Trie,
//   TrieNode,
//   Graph,
//   DirectedGraph,
// } from "datastructures-js";

function insertInOrder(arr: number[], num: number): number[] {
  let head = 0;
  let tail = arr.length;
  // O(log n) as we split in half every iteration
  while (tail > head) {
    if (num < arr[head]) break;
    let mid = head + ((tail - head) >>> 1);
    if (num > arr[mid]) head = mid + 1;
    else tail = mid;
  }
  arr.splice(head, 0, num);
  return arr;
}

class MedianFinder {
  n: number = 0;
  highs: number[] = [];
  lows: number[] = [];
  constructor() {
    this.n = 0;
    this.highs = [];
    this.lows = [];
  }

  addNum(num: number): void {
    this.n++;
    const isHighFull = this.highs.length > this.highs.length;
    if (num < this.highs[0] && isHighFull) insertInOrder(this.lows, num);
    else insertInOrder(this.highs, num);
    // keep balanced
    if (this.highs.length > this.highs.length + 1) {
      const lowest_high = this.highs.shift();
      this.lows.push(lowest_high);
    }
    if (this.lows.length > this.highs.length) {
      const highest_low = this.lows.pop();
      this.highs.splice(0, 0, highest_low);
    }
  }

  findMedian(): number {
    if (this.n % 2 === 1) {
      return this.highs[0];
    }
    const lowest_high = this.highs[0];
    const highest_low = this.lows[this.lows.length - 1];
    return (lowest_high + highest_low) / 2;
  }
}

/**
 * Runtime 200 ms Beats 26.14%
 * Memory 91.59 MB Beats 58.82%
 */
class MedianFinderHeap {
  highs: MinHeap<Number>;
  lows: MaxHeap<Number>;
  constructor() {
    this.highs = new MinHeap();
    this.lows = new MaxHeap();
  }

  addNum(num: number): void {
    this.lows.insert(num);
    this.highs.insert(this.lows.extractRoot() as number);
    if (this.highs.size() > this.lows.size()) {
      this.lows.insert(this.highs.extractRoot() as number);
    }
  }

  findMedian(): number {
    const lowest_high: number = this.highs.root() as number;
    const highest_low: number = this.lows.root() as number;
    if (this.lows.size() > this.highs.size()) {
      return highest_low;
    }
    return (lowest_high + highest_low) / 2;
  }
}

/**
 * Runtime 936ms; Beats 8.50%
 * Memory 91.46 MB; Beats 64.05%
 */
class Naiive_MedianFinder {
  arr: number[] = [];
  constructor() {
    this.arr = [];
  }

  addNum(num: number): void {
    insertInOrder(this.arr, num);
  }

  findMedian(): number {
    let n = this.arr.length;
    let mid = n >>> 1;
    if (n % 2 === 1) {
      return this.arr.at(mid);
    }
    return (this.arr.at(mid - 1) + this.arr.at(mid)) / 2;
  }
}

test("Naiive_MedianFinder", { timeout: 1_000 }, (t) => {
  const cases = [
    {
      given: [
        [
          "MedianFinder",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
          "addNum",
          "findMedian",
        ] as ("MedianFinder" | "addNum" | "findMedian")[],
        [
          [],
          [1],
          [],
          [2],
          [],
          [3],
          [],
          [4],
          [],
          [5],
          [],
          [6],
          [],
          [7],
          [],
          [8],
          [],
          [9],
          [],
          [10],
          [],
        ] as const,
      ] as const,
      expect: [],
    },
  ];
  for (const { given, expect } of cases) {
    const instance = new Naiive_MedianFinder();
    const got = [];
    for (let i = 0; i < given[0].length; i++ ) {
      switch (given[0][i]) {
        case "addNum":
          instance.addNum(given[1][i][0]);
          break;
        case "findMedian":
          got.push(instance.findMedian());
          break;
        default:
          break;
      }
    }
    assert.deepEqual(
      got,
      expect,
      `given ${given}, expected ${expect} but got ${got}`
    );
  }
});

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
