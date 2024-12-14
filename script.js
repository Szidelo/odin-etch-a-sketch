// initially it generates 16x16 grid
// should be able to generate diffrent grid based on the option selected (16x16, 32x32, 64x64, 128x128). The values should be kept in a list
// when click on a square from grid, that square should change color or css class
// should be able to increase or decrease square lightning to create shadows and lightning
// NOTE: for incresing and decreseang lightning: https://developer.mozilla.org/en-US/docs/Web/CSS/calc#adjusting_color_channels_in_relative_colors
// should be able to toggle grid by changeing border color from initial color to transparent
// when clicking the erase btn the square selected should reset to transparent background
// on clear should reset the app
// should keep the square classes in a list or constant to be able to change easyer

const OPTIONS = {
  SIXTEEN: 16,
  THIRTYTWO: 32,
  SIXTYFOUR: 64,
  ONETWENTYEIGHT: 128,
};

const SQUARE_CLASSES = {
  SMALL: "square-sm",
  MEDIUM: "square-md",
  LARGE: "square-lg",
  EXTRA_LARGE: "square-xl",
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
  const { SIXTEEN, THIRTYTWO, SIXTYFOUR, ONETWENTYEIGHT } = OPTIONS;
  const { SMALL, MEDIUM, LARGE, EXTRA_LARGE } = SQUARE_CLASSES;
  let cssClass;
  switch (amount) {
    case SIXTEEN:
      cssClass = EXTRA_LARGE;
      break;
    case THIRTYTWO:
      cssClass = LARGE;
      break;
    case SIXTYFOUR:
      cssClass = MEDIUM;
      break;
    case ONETWENTYEIGHT:
      cssClass = SMALL;
      break;
  }

  for (let i = 0; i < amount ** 2; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(cssClass);
    square.setAttribute("draggable", "false");
    sketchDisplay.appendChild(square);

    square.addEventListener("mousedown", () => {
      draw(square);
    });
  }
};

btnOptionSixteen.addEventListener("click", (e) => {
  console.log(e.target);
  drawSquares(OPTIONS.SIXTEEN);
});

btnOptionThirthyTwo.addEventListener("click", (e) => {
  console.log(e.target);
  drawSquares(OPTIONS.THIRTYTWO);
});

drawSquares(OPTIONS.SIXTEEN);
