"use strict";

let year = prompt("введите год", "2000");

let getCentury = (p) => `${Math.ceil(p / 100)} век `;

console.log(getCentury(year));
