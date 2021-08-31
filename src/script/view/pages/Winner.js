import axios from "axios";
import CONFIG from "../../data/config";

const Winner = {
  async render() {
    return `
    <div class="setting winner-setting">
        <ol id="score-list">
        </ol>
        <div>
            <div class="flex">
              <input id="winner1">
              <input id="winner2">
              <input id="winner3">
              <input id="winner4">
              <input id="winner5">
              <input id="winner6">
              <input id="winner7">
              <input id="winner8">
              <input id="winner9">
              <input id="winner10">
            </div>
            <div class="flex">
              <input id="score1">
              <input id="score2">
              <input id="score3">
              <input id="score4">
              <input id="score5">
              <input id="score6">
              <input id="score7">
              <input id="score8">
              <input id="score9">
              <input id="score10">
            </div>
            <button id="submit-winner">Submit Winner</button>
        </div>

    </div>
     
    <button id="toggle-setting">Toggle Setting</button>
        
    <h1 class="score-title">WINNER</h1>

    <table class="scoreboard">
        <thead class="head-score">
        <tr>
            <td>
            No
            </td>
            <td>
            Username
            </td>
            <td>
            Score
            </td>
        </tr>
        </thead>  
        <tbody></tbody>
    </table>
    `;
  },

  async afterRender() {
    axios.get(`${CONFIG.API_URL}/winner`).then((res) => {
      const data = res.data;
      const scoreList = document.querySelector("#score-list");
      console.log(data);

      data.forEach((score) => {
        scoreList.innerHTML += `
            <li>
              ${score.username} | ${score.score}
            </li>
        `;
      });
    });

    const settingButton = document.querySelector("#toggle-setting");
    settingButton.addEventListener("click", () => {
      document.querySelector(".setting").classList.toggle("hide");
    });

    const submitWinner = document.querySelector("#submit-winner");
    submitWinner.addEventListener("click", () => {
      const table = document.querySelector("tbody");
      table.innerHTML = "";

      for (let i = 1; i <= 10; i++) {
        const username = document.querySelector(`#winner${i}`).value;
        const score = document.querySelector(`#score${i}`).value;
        console.log(username);
        console.log(score);
        const row = `
          <tr class="row-score">
            <td>${i}</td>
            <td class="truncate text-bold">${username}</td>
            <td>${score}</td>
          </tr>
        `;

        table.innerHTML += row;
      }
    });
  },
};

export default Winner;
