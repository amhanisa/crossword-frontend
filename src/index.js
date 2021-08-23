import "regenerator-runtime";
import "./styles/style.scss";
import App from "./script/view/app";
// import { main, submitCrossword } from "./script/view/app.js";

const app = new App({
  container: document.querySelector("#app"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
});

// const data = {
//   height: 15,
//   width: 15,
//   acrossClues: [
//     { x: 2, y: 2, length: 4 },
//     { x: 5, y: 4, length: 4 },
//   ],
//   downClues: [
//     { x: 5, y: 2, length: 3 },
//     { x: 10, y: 4, length: 8 },
//   ],
// };

// document.addEventListener("DOMContentLoaded", main(data));
// const submit = document.querySelector(".submit");

// submit.addEventListener("click", () => {
//   submitCrossword(data);
// });
