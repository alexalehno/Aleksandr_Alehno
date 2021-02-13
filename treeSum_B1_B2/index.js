"use strict";

// ......... доп В2 .................

let string = prompt("", "hello");

let reverseString = (p) => p.split("").reverse().join("");

console.log(reverseString(string));

// ......... доп В1 .................

let year = prompt("введите год", "2000");

let getCentury = (p) => `${Math.ceil(p / 100)} век `;

console.log(getCentury(year));

//............ дз TREESUM ..................

let arr = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];

function treeSum(p) {
  let sum = 0;
  for (let item of p) typeof item === "number" ? (sum += item) : (sum += treeSum(item));
  return sum;
}

console.log(treeSum(arr));

