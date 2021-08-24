import axios from "axios";
import Crossword from "../../components/crossword";
import Loading from "../../components/Loading";
import CONFIG from "../../data/config";

const Home = {
  async render() {
    return `
        ${Loading.render()}
        <div class="modal" id="modal-username">
            <div class="modal-body">
                <label class="modal-label">Masukkan Nama Anda</label>
                <form class="form-username">
                  <input required type="text" class="input-username" id="username-input" placeholder="Nama (Perusahaan)" autocomplete="off">
                  <span class="error-msg"></span>
                  <input type="submit" class="button-submit"></input>
                </form>
            </div>
        </div>
        <div class="modal confirm hide" id="modal-confirm">
          <div class="modal-body">
            <p>Anda yakin untuk mengirim jawaban?</p>
            <p>Jawaban tidak dapat diubah</p>
            <div class="confirm-container">
              <button id="submit-crossword-real" class="button confirm-button">
                Submit
              </button>
              <button id="cancel-submit" class="button confirm-button cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div class="modal hide" id="modal-submit">
          <div class="modal-body">
            <p>Jawaban Anda Sudah Dikirim</p>
            <p>Screenshot Halaman Ini Sebagai Bukti</p>
            <p>Username 
            <span id="submit-username"></span></p>
          </div>
        </div>

        <div class="content hide">
          <div class="container username">
              <h1>TTS Pupuk Kujang</h1>  
              <span>Halo, </span>
              <span id="username"></span>    
          </div>

          <div class="container">
            <div class="crossword">
          </div>
              
          </div>

          <div class="container">
              <button id="submit-crossword" class="button">
              Submit
              </button>
          </div>

          <div class="container clue-container">
            <h2>Pertanyaan Mendatar</h2>
            <div id="across-clue"></div>
            <h2>Pertanyaan Menurun</h2>
            <div id="down-clue"></div>
          </div>

          <div class="container footer">
            Created By <a href="https://dealpro.id">DealPro Indonesia</a>
          </div>
        </div>
    `;
  },

  async afterRender() {
    const submitUsername = document.querySelector(".form-username");
    submitUsername.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitUsername();
    });

    const crossword = new Crossword({
      container: document.querySelector(".crossword"),
    });

    axios.get(`${CONFIG.API_URL}/getCrossword`).then((res) => {
      console.log(res);
      crossword.setCrossword(res.data);
    });

    const confirmButton = document.querySelector("#submit-crossword");
    confirmButton.addEventListener("click", () => {
      const modal = document.querySelector("#modal-confirm");
      modal.classList.toggle("hide");
      const content = document.querySelector(".content");
      content.classList.toggle("hide");
    });

    const submitButton = document.querySelector("#submit-crossword-real");
    submitButton.addEventListener("click", () => {
      Loading.show();
      const collectedAnswer = crossword.collectAnswer();
      const username = document.querySelector("#submit-username");
      username.innerHTML = collectedAnswer.username;

      axios
        .post(`${CONFIG.API_URL}/submit`, collectedAnswer)
        .then(() => {
          const modal = document.querySelector("#modal-submit");
          modal.classList.toggle("hide");
          Loading.hide();
        })
        .catch((err) => {
          console.log(err);
          Loading.hide();
        });
    });

    const cancelButton = document.querySelector("#cancel-submit");
    cancelButton.addEventListener("click", () => {
      const modal = document.querySelector("#modal-confirm");
      modal.classList.toggle("hide");
      const content = document.querySelector(".content");
      content.classList.toggle("hide");
    });
  },

  async submitUsername() {
    Loading.show();
    let username = document.querySelector("#username-input").value;

    axios
      .post(`${CONFIG.API_URL}/checkUsername`, { username: username })
      .then((res) => {
        const modal = document.querySelector("#modal-username");
        modal.classList.add("hide");
        const content = document.querySelector(".content");
        content.classList.toggle("hide");
        Loading.hide();
      })
      .catch((err) => {
        Loading.hide();
        console.log(err);
        document.querySelector(".error-msg").innerHTML =
          "Username sudah dipakai";
      });

    document.querySelector("#username").innerHTML = username;
  },
};

export default Home;
