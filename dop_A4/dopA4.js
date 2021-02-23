"use strict";


function checkingForPalindromeWithRecursion() {
  let string = prompt("", " h e l l o ьъеё.,/-_':;?!`~*").toLowerCase();
  let ignoredСhar = " ьъеё.,/-_':;?!`~*";
  let cleanedString = "";

  for (let char of string) {
    if (!ignoredСhar.includes(char)) cleanedString += char;
  }

  function reverse(p) {
    if (p === "") return p;
    else return reverse(p.slice(1)) + p[0];
  }

  let reversedString = reverse(cleanedString);

  console.log(cleanedString);
  console.log(reversedString);
  console.log(cleanedString === reversedString);
}

checkingForPalindromeWithRecursion();
