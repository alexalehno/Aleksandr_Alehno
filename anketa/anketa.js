"use strict";

function nameChecking(p, a) {
  while (p === "" || !!p === isFinite(p))
    p = prompt("введите корректные данные или нажмите 'отмена'");
  a.push(p);
  return p;
}

function ageChecking(p, a) {
  while (p === "" || isNaN(p) || String(p).includes(" "))
    p = prompt("введите корректные данные или нажмите 'отмена'");
  a.push(+p);
  return p;
}

function userProfile(func, func2) {
  let arr = [];

  let p = prompt("фамилия", "Иванов");
  p = func(p, arr);

  if (p) {
    p = prompt("имя", "Иван");
    p = func(p, arr);
  }

  if (p) {
    p = prompt("отчество", "Иванович");
    p = func(p, arr);
  }

  if (p) {
    p = prompt("возраст", "20");
    p = func2(p, arr);
  }

  if (p) {
    p = confirm("пол мужской?");
    p ? (p = "мужской") : (p = "женский");
  }

  if (p) {
    alert(`    Ваше ФИО: ${arr.filter((i) => typeof i === "string").join(" ")}
    Ваш возраст в годах: ${arr.filter((i) => typeof i === "number")}
    Ваш возраст в днях: ${arr.filter((i) => typeof i === "number") * 365}
    Через 5 лет вам будет ${arr.filter((i) => typeof i === "number") * 1 + 5}
    Ваш пол: ${p}
    Вы на пенсии: ${
      (arr.filter((i) => typeof i === "number") >= 60 && p === "мужской") ||
      (arr.filter((i) => typeof i === "number") >= 55 && p === "женский")
        ? "да"
        : "нет"
    }
    `);
  }
}

userProfile(nameChecking, ageChecking);
