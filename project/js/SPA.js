"use strict";

window.addEventListener("beforeunload", befUnload);

function befUnload(e) {
  e = e || window.event;
  if (gamerScore.innerText !== "" && score !== 0)
    e.returnValue = "А у вас есть несохранённые изменения!";
}

//..............................................................

window.addEventListener("hashchange", switchToStateFromURLHash);

let SPAState = {};

function switchToStateFromURLHash() {
  let URLHash = window.location.hash;

  let stateStr = URLHash.slice(1);

  if (stateStr !== "") {
    let parts = stateStr.split("_");

    SPAState = { pagename: parts[0] };
  } else SPAState = { pagename: "Main" };

  // console.log("Новое состояние приложения:");
  // console.log(SPAState);

  switch (SPAState.pagename) {
    case "Main":
      mainPage.classList.remove("hidden");
      gamePage.classList.add("hidden");
      break;

    case "Game":
      mainPage.classList.add("hidden");
      gamePage.classList.remove("hidden");
      break;
  }
}

function switchToState(newState) {
  let stateStr = newState.pagename;
  location.hash = stateStr;
}

function switchToMainPage() {
  switchToState({ pagename: "Main" });
}

function switchToGamePage() {
  switchToState({ pagename: "Game" });
}

switchToStateFromURLHash();
