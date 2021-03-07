
let str = prompt("", "привет МИР");

function countVowelsWithForEach(p) {
  let vowel = 0;
  p.toLowerCase().split("").forEach(item => "ауоыиэяюёе".includes(item) ? vowel++ : vowel);
  return vowel;
}

console.log(`forEach: ${countVowelsWithForEach(str)}`);

// .............................................................

function countVowelsWithFilter(p) {
  return p.toLowerCase().split("").filter(item => "ауоыиэяюёе".includes(item)).length; 
}

// ...............................................................

console.log(`filter: ${countVowelsWithFilter(str)}`);


function countVowelsWithReduce(p) {
  const vowelLetters = "ауоыиэяюёе";
  return p.toLowerCase().split("").reduce((previousValue, item) => previousValue + vowelLetters.includes(item), 0);
}

console.log(`reduce: ${countVowelsWithReduce(str)}`);

