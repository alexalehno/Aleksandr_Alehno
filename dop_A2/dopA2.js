"use strict";

function removingSpaces() {
  let str = prompt("", "         hello          ");

  while (str.startsWith(" ")) str = str.slice(1);
  while (str.endsWith(" ")) str = str.slice(0, -1);

  str = `-${str}-`;

  console.log(str);
}

removingSpaces();
