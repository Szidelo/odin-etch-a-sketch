const sketchDisplay = document.querySelector("#sketch");

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

const btn16 = document.querySelector("#s16");
btn16.addEventListener("click", (e) => {
	drawSquares(16);
});
