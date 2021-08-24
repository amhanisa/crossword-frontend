class Crossword {
  constructor({ crossword, container }) {
    this.container = container;

    if (crossword) {
      this.setCrossword(crossword);
    }

    console.log("crossword created");
  }

  setCrossword(crossword) {
    this.crossword = crossword;
    const computedArray = this.create2DArray();
    this.renderCrossword(computedArray);
    this.setupClue();
  }

  create2DArray() {
    //create array grid
    let crosswordArray = Array(this.crossword.height)
      .fill(0)
      .map((x) => Array(this.crossword.width).fill(0));

    let clueNumber = 1;

    this.crossword.acrossClues.forEach((clue) => {
      for (let x = 0; x < clue.length; x++) {
        crosswordArray[clue.x + x][clue.y] = {
          x: clue.x + x,
          y: clue.y,
        };

        if (x === 0) {
          crosswordArray[clue.x + x][clue.y].acrossClueNumber = clueNumber;
          clueNumber++;
        }
      }
    });

    this.crossword.downClues.forEach((clue) => {
      for (let y = 0; y < clue.length; y++) {
        //check cell not already created by across clue
        if (crosswordArray[clue.x][clue.y + y] === 0) {
          crosswordArray[clue.x][clue.y + y] = {
            x: clue.x,
            y: clue.y + y,
          };
        }

        if (y === 0) {
          crosswordArray[clue.x][clue.y + y].downClueNumber = clueNumber;
          clueNumber++;
        }
      }
    });

    return crosswordArray;
  }

  createCell(cellData) {
    const cellElement = document.createElement("div");
    cellElement.className = "cwcell";

    if (cellData === 0) {
      cellElement.className += " dark";
      return cellElement;
    }

    const inputElement = document.createElement("input");
    inputElement.maxLength = 1;
    inputElement.className = "cwinput";
    inputElement.dataset.x = cellData.x;
    inputElement.dataset.y = cellData.y;

    cellElement.appendChild(inputElement);

    if (
      cellData.hasOwnProperty("acrossClueNumber") ||
      cellData.hasOwnProperty("downClueNumber")
    ) {
      const clueNumber = document.createElement("div");
      clueNumber.className = "clueNumber";

      let text = "";

      if (cellData.acrossClueNumber && cellData.downClueNumber) {
        text = cellData.acrossClueNumber + "|" + cellData.downClueNumber;
      } else if (cellData.acrossClueNumber) {
        text = cellData.acrossClueNumber;
      } else {
        text = cellData.downClueNumber;
      }

      clueNumber.innerHTML = text;

      cellElement.appendChild(clueNumber);
    }

    return cellElement;
  }

  renderCrossword(computedArray) {
    for (let y = 0; y < this.crossword.height; y++) {
      const row = document.createElement("div");
      row.className = "cwrow";
      this.container.appendChild(row);

      for (let x = 0; x < this.crossword.width; x++) {
        const cell = this.createCell(computedArray[x][y]);

        row.appendChild(cell);
      }
    }
  }

  collectAnswer() {
    let username = document.querySelector("#username").innerHTML;
    let acrossAnswers = [];
    let downAnswers = [];

    this.crossword.acrossClues.forEach((clue) => {
      let answer = "";
      for (let x = 0; x < clue.length; x++) {
        answer += document.querySelector(
          `input[data-x='${clue.x + x}'][data-y='${clue.y}']`
        ).value;
      }
      acrossAnswers.push(answer);
    });

    this.crossword.downClues.forEach((clue) => {
      let answer = "";
      for (let y = 0; y < clue.length; y++) {
        answer += document.querySelector(
          `input[data-x='${clue.x}'][data-y='${clue.y + y}']`
        ).value;
      }
      downAnswers.push(answer);
    });

    const submitData = {
      username: username,
      answers: {
        acrossAnswers: acrossAnswers,
        downAnswers: downAnswers,
      },
    };

    console.log(submitData);

    return submitData;
  }

  setupClue() {
    let acrossClue = document.querySelector("#across-clue");
    let index = 1;
    this.crossword.acrossClues.forEach((clue) => {
      const item = `
        <p>${index++}.  ${clue.clue}</p>
      `;
      acrossClue.innerHTML += item;
    });
    let downClue = document.querySelector("#down-clue");
    this.crossword.downClues.forEach((clue) => {
      const item = `
        <p>${index++}.  ${clue.clue}</p>
      `;
      downClue.innerHTML += item;
    });
  }
}

export default Crossword;
