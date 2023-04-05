"use strict";

// показывает все сообщения из messages на страницу
let ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let messages; // элемент массива - {name:'Иванов',mess:'Привет'};
let updatePassword;
let stringName = "ALEHNO_PROJECT_GAME";

// показывает все сообщения из messages на страницу

function compare(a, b) {
  return b.mess - a.mess;
}

function showMessages() {
  let str = "";

  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];

    str += `
    <li class="records-content__item">
      <span>${i + 1}. ${escapeHTML(message.name)}</span>
      <span>${escapeHTML(message.mess)}</span>
    </li>`;
  }

  document.querySelector(".records-content").innerHTML = str;
}

function escapeHTML(text) {
  if (!text) {
    return text;
  }

  text = text
    .toString()
    .split("&")
    .join("&amp;")
    .split("<")
    .join("&lt;")
    .split(">")
    .join("&gt;")
    .split('"')
    .join("&quot;")
    .split("'")
    .join("&#039;");

  return text;
}

// получает сообщения с сервера и потом показывает
function refreshMessages() {
  $.ajax({
    url: ajaxHandlerScript,
    type: "POST",
    dataType: "json",
    data: { f: "READ", n: stringName },
    cache: false,
    success: readReady,
    error: errorHandler,
  });
}

function readReady(callresult) {
  // сообщения получены - показывает
  if (callresult.error !== undefined) {
    alert(callresult.error);

  } else {
    messages = [];

    if (callresult.result !== "") {
      // либо строка пустая - сообщений нет
      // либо в строке - JSON-представление массива сообщений
      messages = JSON.parse(callresult.result);
      // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
      if (!Array.isArray(messages)) {
        messages = [];
      }
    }

    showMessages();
  }
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + " " + errorStr);
}

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendMessage() {
  updatePassword = Math.random();

  $.ajax({
    url: ajaxHandlerScript,
    type: "POST",
    dataType: "json",
    data: { f: "LOCKGET", n: stringName, p: updatePassword },
    cache: false,
    success: lockGetReady,
    error: errorHandler,
  });
}

// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
  if (callresult.error !== undefined) {
    alert(callresult.error);

  } else {
    messages = [];

    if (callresult.result !== "") {
      // либо строка пустая - сообщений нет
      // либо в строке - JSON-представление массива сообщений
      messages = JSON.parse(callresult.result);

      if (!Array.isArray(messages)) {
        messages = [];
      }
    }

    let gamerEl = document.querySelector(".save-form__input");
    let gamerName = gamerEl.value.trim();

    if (gamerName === "") {
      gamerName = "unknown";
    }

    let gamerScore = score;

    messages.push({ name: gamerName, mess: gamerScore });
    messages.sort(compare);

    if (messages.length > 10) {
      messages = messages.slice(-messages.length, 10);
    }

    showMessages();
    resetPoints();

    gamerEl.value = '';

    $.ajax({
      url: ajaxHandlerScript,
      type: "POST",
      dataType: "json",
      data: {
        f: "UPDATE",
        n: stringName,
        v: JSON.stringify(messages),
        p: updatePassword,
      },
      cache: false,
      success: updateReady,
      error: errorHandler,
    });
  }
}

// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
  if (callresult.error != undefined) {
    alert(callresult.error);
  }
}

refreshMessages();
