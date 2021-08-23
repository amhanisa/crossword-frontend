import axios from "axios";
import Crossword from "../../components/crossword";
import data from "../../data/data.json";

const Home = {
  async render() {
    return `
        <div class="modal hide" id="modal-username">
            <div class="modal-body">
                <label>Masukkan Nama Anda</label>
                <input type="text" id="username-input">
                <span class="error-msg"></span>
                <button class="submit-username">submit</button>
            </div>
        </div>
        <div class="container username">
            <span>Username</span>
            <span id="username"></span>    
        </div>

        <div class="container">
          <div class="crossword">
        </div>
            
        </div>

        <div class="container">
            <button id="submit-crossword">
            Submit
            </button>
        </div>

        <div class="container">
          <h2>Pertanyaan Mendatar</h2>
          <div id="across-clue"></div>
          <h2>Pertanyaan Menurun</h2>
          <div id="down-clue"></div>
        </div>

        <div class="modal hide" id="modal-submit">
          <div class="modal-body">
            <p>Jawaban Anda Sudah Dikirim</p>
            <p>Screenshot Halaman Ini Sebagai Bukti</p>
            <p>Username 
            <span id="submit-username"></span></p>
          </div>
        </div>
    `;
  },

  async afterRender() {
    const submitUsernameButton = document.querySelector(".submit-username");
    submitUsernameButton.addEventListener("click", () => {
      this.submitUsername();
    });

    const crossword = new Crossword({
      crossword: data,
      container: document.querySelector(".crossword"),
    });

    const submitButton = document.querySelector("#submit-crossword");
    submitButton.addEventListener("click", () => {
      const collectedAnswer = crossword.collectAnswer();
      const modal = document.querySelector("#modal-submit");
      modal.classList.toggle("hide");
      const username = document.querySelector("#submit-username");
      username.innerHTML = collectedAnswer.username;

      axios.post("http://localhost:3000/submit", collectedAnswer);
    });
  },

  async submitUsername() {
    let username = document.querySelector("#username-input").value;

    axios
      .post("http://localhost:3000/checkUsername", { username: username })
      .then((res) => {
        const modal = document.querySelector("#modal-username");
        modal.classList.add("hide");
      })
      .catch((err) => {
        console.log(err);
        document.querySelector(".error-msg").innerHTML =
          "Username sudah dipakai";
      });

    console.log(username);

    document.querySelector("#username").innerHTML = username;
  },
};

export default Home;
