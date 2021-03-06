"use strict";

function buildWrapper(p) {
  return function (s) {
    let el = document.createElement(p);
    let str = s.split("").map((item) => {
      switch (item) {
        case "<": return item = "&lt;";
        case ">": return item = "&gt;";
        case "'": return item = "&apos;";
        case '"': return item = "&quot;";
        case "&": return item = "&amp;";
        default:  return item;
      }
    }).join('');

    el.innerHTML = str;
    document.body.append(el);
    return el.outerHTML;
  };
}


let wrapH1 = buildWrapper("H1");
console.log(wrapH1("Вкусные M&M's"));

let wrapP = buildWrapper("P");
console.log(wrapP("aaa''<<>>&&&&"));