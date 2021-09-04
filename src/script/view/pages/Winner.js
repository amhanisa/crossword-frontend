import axios from "axios";
import CONFIG from "../../data/config";

const Winner = {
  async render() {
    return `
    <div class="setting">
      <div class="winner-setting">
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
            </div>
            <div class="flex">
              <input id="time1">
              <input id="time2">
              <input id="time3">
              <input id="time4">
              <input id="time5">
              <input id="time6">
              <input id="time7">
              <input id="time8">
            </div>
            <button id="submit-winner">Submit Winner</button>
        </div>
        <div class="time-setting">
        <input type="date" id="date-selector" class="date">
        <input type="time" id="time-selector" class="date">
        <button id="set-time">Apply</button>
        <p id="selected-time"></p>        
      </div>
      </div>
    </div>
     
    <button id="toggle-setting">Toggle Setting</button>
        
    <h1 class="score-title">PEMENANG TTS</h1>

    <table class="scoreboard">
        <thead class="head-score">
        <tr>
            <td>
            No
            </td>
            <td>
            Nama
            </td>
            <td>
            Total Benar
            </td>
            <td>
            Waktu
            </td>
        </tr>
        </thead>  
        <tbody></tbody>
    </table>
    `;
  },

  async afterRender() {
    const settingButton = document.querySelector("#toggle-setting");
    settingButton.addEventListener("click", () => {
      document.querySelector(".setting").classList.toggle("hide");
    });

    const setTimeButton = document.querySelector("#set-time");
    setTimeButton.addEventListener("click", () => {
      const date = document.querySelector("#date-selector").value;
      const time = document.querySelector("#time-selector").value;

      document.querySelector("#selected-time").innerHTML = new Date(
        date + " " + time
      );

      const startDate = new Date(
        document.querySelector("#selected-time").innerHTML
      );

      axios.get(`${CONFIG.API_URL}/winner`).then((res) => {
        const data = res.data.users;
        const scoreList = document.querySelector("#score-list");
        console.log(data);
        scoreList.innerHTML = "";

        data.forEach((score) => {
          const endDate = new Date(score.time);
          const duration = (endDate.getTime() - startDate.getTime()) / 1000;
          const minute = Math.floor(duration / 60);
          const second = duration % 60;

          scoreList.innerHTML += `
              <li>
                ${score.username} | ${score.score} | ${minute} Menit ${second} Detik
              </li>
          `;
        });

        const count = res.data.count[0];

        scoreList.innerHTML += `
          <li>
          ${data.length}  / ${count.count}
          </li>
        `;
      });
    });

    const submitWinner = document.querySelector("#submit-winner");
    submitWinner.addEventListener("click", () => {
      const table = document.querySelector("tbody");
      table.innerHTML = "";

      for (let i = 1; i <= 8; i++) {
        const username = document.querySelector(`#winner${i}`).value;
        const score = document.querySelector(`#score${i}`).value;
        const time = document.querySelector(`#time${i}`).value;
        console.log(username);
        console.log(score);
        const row = `
          <tr class="row-score">
            <td>${i}</td>
            <td class="truncate text-bold">${username}</td>
            <td>${score}</td>
            <td>${time}</td>
          </tr>
        `;

        table.innerHTML += row;
      }
    });
  },
};

export default Winner;
