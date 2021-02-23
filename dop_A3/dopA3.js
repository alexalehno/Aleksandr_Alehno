"use strict";

function checkingForPalindrome() {
  let string = prompt("", "довод").toLowerCase();
  let ignoredСhar = " ьъеё.,/-_':;?!`~*";
  let cleanedString = "";
  let reversedString = "";

  for (let char of string) {
    if (!ignoredСhar.includes(char)) {
      cleanedString += char;
    }
  }

  for (let i = cleanedString.length - 1; i >= 0; i--) {
    reversedString += cleanedString[i];
  }

  console.log(cleanedString);
  console.log(reversedString);
  console.log(cleanedString === reversedString);
}

checkingForPalindrome();

