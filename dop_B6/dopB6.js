"use strict";

function formatNumber(n, s) {
  let [strBefore, strAfter] = s.split(".");
  let [numBefore, numAfter = 0] = n.toString().split(".");

  if (strAfter) [, numAfter] = n.toFixed(strAfter.length).split(".");

  numBefore = numBefore.split("").reverse();
  strBefore = strBefore.split(" ").reverse();

  let result = [];

  strBefore.forEach((el) => {
    while (strBefore[strBefore.length - 1].length < numBefore.length)
      strBefore[strBefore.length - 1] += "#";
    result.push(...numBefore.splice(0, el.length));
    result.push(" ");
  });

  return result.reverse().join("").trim() + "." + numAfter;
}

console.log(formatNumber(123456789123456.15666, "# ### ###.###"));
console.log(formatNumber(5555555.39, "# ### ###.#########"));
