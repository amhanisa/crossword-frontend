import axios from "axios";

const Score = {
  async render() {
    return `

      <div class="">
        <div>
          <button id="refresh-now">Refresh Now</button>
          <select id="refresh-rate">
            <option value="1">1 Detik</option>
            <option value="5">5 Detik</option>
            <option value="10">10 Detik</option>
            <option value="20">20 Detik</option>
            <option value="0">Disable</option>
          </select>
          <button id="refresh-set">Apply</button>
          <span>Selected Setting: </span>
          <span id="selected"></span>
        </div>
        <div class="time-setting">
        <input type="date" id="date-selector" class="date">
        <input type="time" id="time-selector" class="date">
        <button id="set-time">Apply</button>
        <p id="selected-time"></p>
          
        </div>
      </div>
          
      <h1 class="score-title">SCORE</h1>

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
            <td>
              Time
            </td>
          </tr>
        </thead>  
        <tbody></tbody>
      </table>
    
    `;
  },

  async afterRender() {
    let interval = null;

    const refreshButton = document.querySelector("#refresh-now");
    refreshButton.addEventListener("click", () => this.getScore());

    const setRefreshRate = document.querySelector("#refresh-set");
    setRefreshRate.addEventListener("click", () => {
      const rate = document.querySelector("#refresh-rate").value;
      if (rate == 0) {
        clearInterval(interval);
      } else {
        clearInterval(interval);
        interval = setInterval(this.getScore, rate * 1000);
      }

      document.querySelector("#selected").innerHTML = `${rate} Detik`;

      console.log(rate);
    });

    const setTimeButton = document.querySelector("#set-time");
    setTimeButton.addEventListener("click", () => {
      const date = document.querySelector("#date-selector").value;
      const time = document.querySelector("#time-selector").value;

      document.querySelector("#selected-time").innerHTML = new Date(
        date + " " + time
      );
    });
  },

  async getScore() {
    axios.get("http://localhost:3000/score").then((res) => {
      console.log(res);
      const scoreboard = res.data;
      const table = document.querySelector("tbody");
      table.innerHTML = "";

      let index = 1;

      const startDate = new Date(
        document.querySelector("#selected-time").innerHTML
      );

      console.log(startDate);

      scoreboard.forEach((result) => {
        const endDate = new Date(result.time);
        const duration = (endDate.getTime() - startDate.getTime()) / 1000;
        const row = `
          <tr class="row-score">
            <td>${index++}</td>
            <td class="truncate">${result.username}</td>
            <td>${result.score}</td>
            <td>${duration} Detik</td>
          </tr>
        `;

        table.innerHTML += row;
      });
    });
  },
};

export default Score;
