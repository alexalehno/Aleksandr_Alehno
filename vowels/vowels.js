"use strict";

function getNumWorld(num, w1, w2, w5) {
  if (num % 100 >= 11 && num % 100 <= 19) return w5;
  if (num % 10 === 1) return w1;
  if (num % 10 >= 2 && num % 10 <= 4) return w2;
  return w5;
}

let str = prompt("", "привет МИР");

function countVowels(p) {
  const vowelLetters = "ауоыиэяюёе";
  let vowel = 0;

  for (let letter of p.toLowerCase())
    if (vowelLetters.includes(letter)) vowel++;

  return `в строке "${p}" - ${vowel} ${getNumWorld(
    vowel,
    "гласная",
    "гласных",
    "гласных"
  )} ${getNumWorld(vowel, "буква", "буквы", "букв")}`;
}

console.log(countVowels(str));
