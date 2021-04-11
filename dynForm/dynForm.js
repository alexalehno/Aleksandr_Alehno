"use strict";

let formDef1 = [
  { label: "Название сайта:", kind: "longtext", name: "sitename" },
  { label: "URL сайта:", kind: "longtext", name: "siteurl" },
  { label: "Посетителей в сутки:", kind: "number", name: "visitors" },
  { label: "E-mail для связи:", kind: "shorttext", name: "email" },

  {
    label: "Рубрика каталога:",
    kind: "combo",
    name: "division",
    variants: [
      { text: "здоровье", value: 1 },
      { text: "домашний уют", value: 2 },
      { text: "бытовая техника", value: 3 },
    ],
  },

  {
    label: "Размещение:",
    kind: "radio",
    name: "payment",
    variants: [
      { text: "бесплатное", value: 1 },
      { text: "платное", value: 2 },
      { text: "VIP", value: 3 },
    ],
  },

  { label: "Разрешить отзывы:", kind: "check", name: "votes" },
  { label: "Описание сайта:", kind: "memo", name: "description" },
  { label: "Опубликовать:", kind: "submit" },
];

let formDef2 = [
  { label: "Фамилия:", kind: "longtext", name: "lastname" },
  { label: "Имя:", kind: "longtext", name: "firstname" },
  { label: "Отчество:", kind: "longtext", name: "secondname" },
  { label: "Возраст:", kind: "number", name: "age" },
  { label: "Зарегистрироваться:", kind: "submit" },
];

function buildForm(arr) {
  let formData = "<form action='https://fe.it-academy.by/TestForm.php'>";

  arr.forEach((el) => {
    formData += `<label>${el.label}</label>`;

    if (el.kind === "combo") {
      formData += "<select>";
      el.variants.forEach((item) => {
        formData += `<option value ="${item.value}">${item.text}</option>`;
      });
      formData += "</select> ";
    } else if (el.kind === "radio") {
      el.variants.forEach((item) => {
        formData += `<label><input type ="${el.kind}" name ="${el.name}" value ="${item.value}">${item.text}</label>`;
      });
    } else if (el.kind === "check") {
      formData += `<input type ="checkbox" name ="${el.name}">`;
    } else if (el.kind === "memo") {
      formData += `<textarea></textarea>`;
    } else formData += `<input type ="${el.kind}" name ="${el.name}">`;
  });

  formData += "</form>";

  let form = document.querySelector(".form");
  form.innerHTML = formData;
  console.log(form);
}

let btn = document.querySelector("button");

btn.addEventListener("click", () => buildForm(formDef1));
