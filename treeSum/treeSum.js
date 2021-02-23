"use strict";

let arr = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];

function treeSum(p) {
  let sum = 0;
  for (let item of p) typeof item === "number" ? (sum += item) : (sum += treeSum(item));
  return sum;
}

console.log(treeSum(arr));

