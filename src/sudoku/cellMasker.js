import numberHelper from './numberHelper'

export default {
	mask(sudoku, cellsCountToMask) {
		let maskedCells = [];

		while (maskedCells.length !== cellsCountToMask) {
			let randomRowNumber = numberHelper.getRandomInt(1, 9);
			let randomColumnNumber = numberHelper.getRandomInt(1, 9);

			let cell = sudoku.getCell(randomRowNumber, randomColumnNumber);
			if (maskedCells.indexOf(cell) >= 0) {
				continue;
			}

			cell.generatedValue = null;
			maskedCells.push(cell);
		}
	}
}