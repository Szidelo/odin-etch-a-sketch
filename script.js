const sketchDisplay = document.querySelector("#sketch");

const drawSquares = (amount) => {
	if (amount === 16) {
		for (let i = 0; i < amount ** 2; i++) {
			const square = document.createElement("div");
			square.classList.add("square-lg");
			sketchDisplay.appendChild(square);
		}
	}
};

const btn16 = document.querySelector("#s16");
btn16.addEventListener("click", drawSquares(16));
