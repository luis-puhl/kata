const ord_0 = "0".charCodeAt(0);
const ord_9 = "9".charCodeAt(0);
const ord_a = "a".charCodeAt(0);
const ord_z = "z".charCodeAt(0);
const ord_A = "A".charCodeAt(0);
const ord_Z = "Z".charCodeAt(0);
const toLower = ord_a - ord_A;

function lower(i: number): number | false {
  if (i >= ord_0 && i <= ord_9) return i;
  if (i >= ord_a && i <= ord_z) return i;
  if (i >= ord_A && i <= ord_Z) return i + toLower;
  return false;
}

/**
 * Runtime 3ms, Beats 84.94%
 * Memory; 56.23 MB; Beats; 99.18 %
 */
function isPalindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;
  if (j < 1) return true;
  for (; i < j; ) {
    const head = lower(s.charCodeAt(i));
    const tail = lower(s.charCodeAt(j));
    if (head === false) {
      i++;
      continue;
    }
    if (tail === false) {
      j--;
      continue;
    }
    if (head === tail) {
      j--;
      i++;
      continue;
    }
    return false;
  }
  return true;
}
