// initially it generates 16x16 grid
// should be able to generate diffrent grid based on the option selected (16x16, 32x32, 64x64, 128x128). The values should be kept in a list
//

const OPTIONS = {
  SIXTEEN: 16,
  THIRTYTWO: 32,
  SIXTYFOUR: 64,
  ONETWENTYEIGHT: 128,
};

const sketchDisplay = document.querySelector("#sketch");
const btnOptionSixteen = document.querySelector("#s16");
const btnOptionThirthyTwo = document.querySelector("#s32");
const btnOptionSixtyFour = document.querySelector("#s64");
const btnOptionOneTwentyEight = document.querySelector("#s128");

const draw = (sq) => {
  sq.style.backgroundColor = "#137e3e";
};

const drawSquares = (amount) => {
  if (amount === 16) {
    for (let i = 0; i < amount ** 2; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("square-lg");
      square.setAttribute("draggable", "false");
      sketchDisplay.appendChild(square);

      square.addEventListener("mousedown", () => {
        draw(square);
      });
    }
  }
};

btnOptionSixteen.addEventListener("click", () => {
  drawSquares(OPTIONS.SIXTEEN);
});

btnOptionThirthyTwo.addEventListener("click", () => {
  drawSquares(OPTIONS.THIRTYTWO);
});

drawSquares(OPTIONS.SIXTEEN);
