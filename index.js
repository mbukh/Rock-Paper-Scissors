"use strict";
const wrapper = document.getElementById("wrapper");
const help = document.getElementById("help");
const cls = document.getElementById("close");
const rules = document.getElementById("rulesView");

help.addEventListener("click", () => {
  wrapper.style.visibility = "visible";
  rules.style.visibility = "visible";
});
help.addEventListener("mouseover", () => {
  wrapper.style.visibility = "visible";
  rules.style.visibility = "visible";
});
wrapper.addEventListener("click", () => {
  wrapper.style.visibility = "hidden";
  rules.style.visibility = "hidden";
});
cls.addEventListener("click", () => {
  wrapper.style.visibility = "hidden";
  rules.style.visibility = "hidden";
});
