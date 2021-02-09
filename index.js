"use strict";

function reverse(p) {
  console.log(p);
  if (p === "") {
    return "";
  } else {
    return reverse(p.slice(1)) + p[0];
  }
}

function checkingForPalindrome() {
  let string = prompt("", " h e l l o ьъеё.,/-_':;?!`~*").toLowerCase();
  let ignoredСhar = " ьъеё.,/-_':;?!`~*";
  let cleanedString = "";

  for (let char of string) {
    if (!ignoredСhar.includes(char)) {
      cleanedString += char;
    }
  }

  let reversedString = reverse(cleanedString);

  console.log(cleanedString);
  console.log(reversedString);
  console.log(cleanedString === reversedString);
}

checkingForPalindrome();
