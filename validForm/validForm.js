"use strict";

let formV = document.forms.formV;
formV.addEventListener("submit", validForm);

function validForm(e) {
  e = e || window.event;

  try {
    for (const el of document.forms.formV.elements) {
      if (el.type === "radio") checkRadio(el, e);
      if (el.type === "checkbox") checkBox(el, e);
      if (el.type === "number") checkNumber(el, e);
      if (el.type === "email") checkEmail(el, e);
      if (el.tagName === "TEXTAREA") checkTextArea(el, e);
      if (el.tagName === "SELECT") checkSelect(el, e);
      if (el.type === "text" || el.type === "date") checkText(el, e);
    }
  } catch (er) {
    console.log(er);
    e.preventDefault();
  }
}

function checkText(p, e) {
  if (p.value.trim() === "") {
    p.classList.add("error");
    p.nextElementSibling.innerHTML = "поле не заполнено";
    p.nextElementSibling.style.color = "red";
    p.focus();
    e.preventDefault();
  } else {
    p.classList.remove("error");
    p.nextElementSibling.innerHTML = "";
  }
}

function checkRadio(p, e) {
  if (p.value === "11" && p.checked === true) {
    p.parentElement.style.color = "red";
    p.nextSibling.data = "выберите другой вариант";
    e.preventDefault();
  } else if (p.value === "11" && p.checked === false) {
    p.nextSibling.data = "бесплатное";
    p.parentElement.style.color = "";
  }
}

function checkBox(p, e) {
  if (p.checked === false) {
    p.parentElement.style.color = "red";
    p.previousSibling.data = "Нажмите";
    e.preventDefault();
  } else {
    p.previousSibling.data = "Разрешить отзывы:";
    p.parentElement.style.color = "";
  }
}

function checkTextArea(p, e) {
  if (p.value === "") {
    p.style.borderColor = "red";
    p.placeholder = "напишите что-нибудь";
    e.preventDefault();
  } else {
    p.style.borderColor = "";
  }
}

function checkSelect(p, e) {
  for (let option of p.children) {
    if (option.value === "3" && option.selected === true) {
      p.style.color = "red";
      p.previousElementSibling.innerHTML = "Неправильный выбор";
      e.preventDefault();
    } else {
      p.style.color = "";
      p.previousElementSibling.innerHTML = "Рубрика каталога:";
    }
  }
}

function checkNumber(p, e) {
  if (p.value < 0) {
    p.classList.add("error");
    p.nextElementSibling.innerHTML = "отрицательное значение!!!";
    p.nextElementSibling.style.color = "red";
    p.focus();
    e.preventDefault();
  } else if (p.value === "") {
    checkText(p, e);
  } else {
    p.classList.remove("error");
    p.nextElementSibling.innerHTML = "";
  }
}

function checkEmail(p,e) {
  if (p.value !== "" && !p.value.includes('@')) {
    p.classList.add("error");
    p.nextElementSibling.innerHTML = "нет @";
    p.nextElementSibling.style.color = "red";
    p.focus();
    e.preventDefault();
  } else if (p.value === "") {
    checkText(p, e);
  } else {
    p.classList.remove("error");
    p.nextElementSibling.innerHTML = "";
  }
}
