import "regenerator-runtime";
import "./styles/style.scss";
import { main, submitCrossword } from "./script/view/main.js";

const data = {
  height: 15,
  width: 15,
  acrossClues: [
    { x: 2, y: 2, length: 4 },
    { x: 5, y: 4, length: 4 },
  ],
  downClues: [
    { x: 5, y: 2, length: 3 },
    { x: 10, y: 4, length: 8 },
  ],
};

document.addEventListener("DOMContentLoaded", main(data));
const submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
  submitCrossword(data);
});
