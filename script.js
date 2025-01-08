// initially it generates 16x16 grid
// should be able to generate diffrent grid based on the option selected (16x16, 32x32, 64x64, 128x128). The values should be kept in a list
// when click on a square from grid, that square should change color or css class
// should be able to increase or decrease square lightning to create shadows and lightning
// NOTE: for incresing and decreseang lightning: https://developer.mozilla.org/en-US/docs/Web/CSS/calc#adjusting_color_channels_in_relative_colors
// should be able to toggle grid by changeing border color from initial color to transparent
// when clicking the erase btn the square selected should reset to transparent background
// on clear should reset the app
// should keep the square classes in a list or constant to be able to change easyer
// should be able to change the color of the square while holding mouse down
// when changing the grid size the led light should turn on and off only for the selected size

const COLORS = {
	SQUARE_GREEN: "rgba(19, 126, 62, 1)",
	SQUARE_TRANSPARENT: "transparent",
	SQUARE_BORDER: "#137e3e77",
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
const colorPicker = document.querySelector("#color-picker");

// buttons
const optionButtons = document.querySelectorAll(".options");
const toggleGridBtn = document.querySelector("#toggle-grid");
const btnErase = document.querySelector("#eraser");
const btnClear = document.querySelector("#clear");
const btnShades = document.querySelector("#shades");
const btnLightning = document.querySelector("#lightning");
const btnRainbow = document.querySelector("#rainbow");
const menuButtons = [btnErase, btnShades, btnRainbow, btnLightning];

sketchContainer.id = "sketch";

// flags
let isEraseActive = false;
let gameIsRunning = false;
let gridIsVisible = true;
let isShadeActive = false;
let isLightningActive = false;
let isRainbowActive = false;
let bgColor = COLORS.SQUARE_GREEN;

const handleToggleGrid = (e) => {
	gridIsVisible = !gridIsVisible;
	const { SQUARE_TRANSPARENT, SQUARE_BORDER } = COLORS;
	const squares = document.querySelectorAll(".square") || null;
	const led = e.currentTarget.firstElementChild;

	if (gridIsVisible && !led.className.includes("active")) {
		led.classList.add("active");
	} else {
		led.classList.remove("active");
	}

	if (squares) {
		squares.forEach((square) => {
			square.style.borderColor = gridIsVisible ? SQUARE_BORDER : SQUARE_TRANSPARENT;
		});
	}
};

const handleToggle = (activeButton) => {
	const leds = menuButtons.map((btn) => btn.firstElementChild);

	// check if btn is active
	const isCurrentlyActive = activeButton.firstElementChild.classList.contains("active");

	// deactivate all buttons and their leds
	leds.forEach((led) => led.classList.remove("active"));
	isEraseActive = false;
	isShadeActive = false;
	isRainbowActive = false;
	isLightningActive = false;

	if (isCurrentlyActive) return;

	// Activate the clicked button's LED and functionality
	activeButton.firstElementChild.classList.add("active");

	switch (activeButton) {
		case btnErase:
			isEraseActive = true;
			break;
		case btnShades:
			isShadeActive = true;
			break;
		case btnRainbow:
			isRainbowActive = true;
			break;
		case btnLightning:
			isLightningActive = true;
			break;
	}
};

const eraseSquare = (squareElement) => {
	squareElement.style.backgroundColor = COLORS.SQUARE_TRANSPARENT;
};

const getRandomColor = () => {
	return Math.floor(Math.random() * 16777215).toString(16); // generates a random color link: https://css-tricks.com/snippets/javascript/random-hex-color/
};

const paintSquare = (squareElement) => {
	if (isShadeActive) {
		increaseShade(squareElement);
	} else if (isLightningActive) {
		increaseLightning(squareElement);
	} else if (isRainbowActive) {
		const randomColor = getRandomColor();
		squareElement.style.backgroundColor = `#${randomColor}`;
	} else {
		squareElement.style.backgroundColor = bgColor;
	}
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

	let isMouseDown = false; // flag to check if mouse is down

	// generate squares
	for (let i = 0; i < gridSize ** 2; i++) {
		const squareElement = document.createElement("div");
		squareElement.classList.add("square");
		squareElement.classList.add(squareClass);
		squareElement.setAttribute("draggable", "false");
		squareElement.style.borderColor = gridIsVisible ? COLORS.SQUARE_BORDER : COLORS.SQUARE_TRANSPARENT;

		sketchContainer.appendChild(squareElement);

		const handleAction = () => {
			isEraseActive ? eraseSquare(squareElement) : paintSquare(squareElement);
		};

		// event listeners for painting squares
		squareElement.addEventListener("mousedown", () => {
			handleAction();
			isMouseDown = true;
		});

		squareElement.addEventListener("mouseup", () => {
			isMouseDown = false;
		});

		// able to drag and draw while holding mouse down
		squareElement.addEventListener("mousemove", () => {
			if (isMouseDown && (!isShadeActive || isLightningActive)) {
				handleAction();
			}
		});
	}
};

const handleClearGrid = () => {
	const squares = document.querySelectorAll(".square") || null;
	if (squares) {
		squares.forEach((square) => {
			square.style.backgroundColor = COLORS.SQUARE_TRANSPARENT;
		});
	}
};

const extractRGBValues = (element) => {
	let currentColor = element.style.backgroundColor;
	const extractedValues = currentColor.startsWith("rgba") ? currentColor.slice(5, -1).split(",") : currentColor.slice(4, -1).split(",");
	const r = extractedValues[0];
	const g = extractedValues[1];
	const b = extractedValues[2];
	let opacity = !extractedValues[3] ? 1 : extractedValues[3];

	return { r, g, b, opacity };
};

const increaseShade = (squareElement) => {
	const colorValues = extractRGBValues(squareElement);
	const { r, g, b, opacity } = colorValues;

	const newColor = `rgba(${r},${g}, ${b}, ${+opacity - 0.1})`;

	squareElement.style.backgroundColor = newColor;
};

const increaseLightning = (squareElement) => {
	const colorValues = extractRGBValues(squareElement);
	const { r, g, b, opacity } = colorValues;

	const newColor = `rgba(${r},${g}, ${b}, ${+opacity + 0.1})`;

	squareElement.style.backgroundColor = newColor;
};

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
				currentActiveButton.firstElementChild.classList.remove("active");
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

const selectColor = (event) => {
	bgColor = event.target.value;
};

btnClear.addEventListener("click", handleClearGrid);
toggleGridBtn.addEventListener("click", (e) => handleToggleGrid(e));
colorPicker.addEventListener("change", selectColor, false);
menuButtons.forEach((btn) => {
	btn.addEventListener("click", () => handleToggle(btn));
});
