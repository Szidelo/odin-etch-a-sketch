// initially it generates 16x16 grid
// should be able to generate diffrent grid based on the option selected (16x16, 32x32, 64x64, 128x128). The values should be kept in a list
// when click on a square from grid, that square should change color or css class
// should be able to increase or decrease square lightning to create shadows and lightning
// NOTE: for incresing and decreseang lightning: https://developer.mozilla.org/en-US/docs/Web/CSS/calc#adjusting_color_channels_in_relative_colors
// should be able to toggle grid by changeing border color from initial color to transparent
// when clicking the erase btn the square selected should reset to transparent background
// on clear should reset the app
// should keep the square classes in a list or constant to be able to change easyer

const COLORS = {
    SQUARE_GREEN: "#137e3e",
    SQUARE_TRANSPARENT: "transparent",
};

const GRID_SIZES = {
    SMALL: 16,
    MEDIUM: 32,
    LARGE: 64,
    EXTRA_LARGE: 128,
};

const SQUARE_STYLES = {
    XL_CLASS: "square-xl",
    LARGE_CLASS: "square-lg",
    MEDIUM_CLASS: "square-md",
    SMALL_CLASS: "square-sm",
};

const prompts = document.querySelectorAll(".line");
const display = document.querySelector("#display");
const sketchContainer = document.createElement("div");
sketchContainer.id = "sketch";
console.log(sketchContainer);
const optionButtons = document.querySelectorAll(".options");

const btnErase = document.querySelector("#eraser");

let isEraseActive = false;
let gameIsRunning = false;

const eraseSquare = (squareElement) => {
    console.log("erase");
    squareElement.style.backgroundColor = COLORS.SQUARE_TRANSPARENT;
};

const paintSquare = (squareElement) => {
    squareElement.style.backgroundColor = COLORS.SQUARE_GREEN;
};

const generateGrid = (gridSize) => {
    const { SMALL, MEDIUM, LARGE, EXTRA_LARGE } = GRID_SIZES;
    const { SMALL_CLASS, MEDIUM_CLASS, LARGE_CLASS, XL_CLASS } = SQUARE_STYLES;

    let squareClass;
    switch (gridSize) {
        case SMALL:
            squareClass = XL_CLASS;
            break;
        case MEDIUM:
            squareClass = LARGE_CLASS;
            break;
        case LARGE:
            squareClass = MEDIUM_CLASS;
            break;
        case EXTRA_LARGE:
            squareClass = SMALL_CLASS;
            break;
    }

    // clear existing squares before generating a new grid
    sketchContainer.innerHTML = "";

    // generate squares
    for (let i = 0; i < gridSize ** 2; i++) {
        const squareElement = document.createElement("div");
        squareElement.classList.add("square");
        squareElement.classList.add(squareClass);
        squareElement.setAttribute("draggable", "false");
        sketchContainer.appendChild(squareElement);

        // event listener for painting squares
        squareElement.addEventListener("mousedown", () => {
            isEraseActive
                ? eraseSquare(squareElement)
                : paintSquare(squareElement);
        });
    }
};

btnErase.addEventListener("click", () => {
    isEraseActive = !isEraseActive;
});

// Event listeners for grid size buttons

let currentActiveButton = null; // variable to keep track of the active btn to be able to remove class active for the rest of the btns

optionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!gameIsRunning) {
            prompts.forEach((line) => {
                display.removeChild(line);
            });
            display.appendChild(sketchContainer);
            gameIsRunning = true;
        }

        const { SMALL, MEDIUM, LARGE, EXTRA_LARGE } = GRID_SIZES;
        const btnId = e.currentTarget.id;
        const led = e.currentTarget.firstElementChild;

        if (currentActiveButton !== btn) {
            if (currentActiveButton) {
                currentActiveButton.firstElementChild.classList.remove(
                    "active"
                );
            }

            led.classList.add("active");
            //set the clicked btn as active button
            currentActiveButton = btn;

            switch (btnId) {
                case "s16":
                    generateGrid(SMALL);
                    break;
                case "s32":
                    generateGrid(MEDIUM);
                    break;
                case "s64":
                    generateGrid(LARGE);
                    break;
                case "s128":
                    generateGrid(EXTRA_LARGE);
                    break;
            }
        }
    });
});

// init default grid
// generateGrid(GRID_SIZES.SMALL);
