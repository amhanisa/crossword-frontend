import axios from "axios";

const main = (crossword) => {
  const container = document.querySelector(".crossword");

  let computedCrossword = create2DArray(crossword);

  for (let y = 0; y < crossword.height; y++) {
    const row = document.createElement("div");
    row.className = "cwrow";
    container.appendChild(row);

    for (let x = 0; x < crossword.width; x++) {
      //   console.log(computedCrossword[x][y]);

      const cell = createCell(computedCrossword[x][y]);

      //   cell.innerHTML = computedCrossword[x][y];
      row.appendChild(cell);
    }
  }
};

const createCell = (cellData) => {
  const cellElement = document.createElement("div");
  cellElement.className = "cwcell";

  if (cellData === 0) {
    cellElement.className += " dark";
    return cellElement;
  }

  const inputElement = document.createElement("input");
  inputElement.maxLength = 1;
  inputElement.dataset.x = cellData.x;
  inputElement.dataset.y = cellData.y;

  cellElement.appendChild(inputElement);

  if (cellData.hasOwnProperty("number")) {
    const clueNumber = document.createElement("div");
    clueNumber.className = "clueNumber";
    clueNumber.innerHTML = cellData.number;
    cellElement.appendChild(clueNumber);
  }

  return cellElement;
};

const create2DArray = (crossword) => {
  //create array grid
  let array = Array(crossword.height)
    .fill(0)
    .map((x) => Array(crossword.width).fill(0));

  let clueNumber = 1;

  crossword.acrossClues.forEach((clue) => {
    for (let x = 0; x < clue.length; x++) {
      if (x === 0) {
        array[clue.x + x][clue.y] = {
          number: clueNumber,
          x: clue.x + x,
          y: clue.y,
        };
        clueNumber++;
      } else {
        array[clue.x + x][clue.y] = { x: clue.x + x, y: clue.y };
      }
    }
    // console.log(clue);
  });

  crossword.downClues.forEach((clue) => {
    for (let y = 0; y < clue.length; y++) {
      if (y === 0) {
        array[clue.x][clue.y + y] = {
          number: clueNumber,
          x: clue.x,
          y: clue.y + y,
        };
        clueNumber++;
      } else {
        //klo kosong blum ada input dari acrossClue
        if (array[clue.x][clue.y + y] === 0) {
          array[clue.x][clue.y + y] = { x: clue.x, y: clue.y + y };
        }
      }
    }
    // console.log(clue);
  });

  return array;
};

const submitCrossword = (crossword) => {
  let acrossAnswers = [];
  let downAnswers = [];

  crossword.acrossClues.forEach((clue) => {
    let answer = "";
    for (let x = 0; x < clue.length; x++) {
      answer += document.querySelector(
        `input[data-x='${clue.x + x}'][data-y='${clue.y}']`
      ).value;
    }
    acrossAnswers.push(answer);
  });

  crossword.downClues.forEach((clue) => {
    let answer = "";
    for (let y = 0; y < clue.length; y++) {
      answer += document.querySelector(
        `input[data-x='${clue.x}'][data-y='${clue.y + y}']`
      ).value;
    }
    downAnswers.push(answer);
  });

  const answers = {
    acrossAnswers: acrossAnswers,
    downAnswers: downAnswers,
  };

  console.log(answers);

  axios.post("http://localhost:3000/submit", answers);
};

export { main, submitCrossword };
