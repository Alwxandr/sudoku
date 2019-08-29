export default class Sudoku {
	constructor(values) {
		this.values = values;
	}

	getCell(rowNumber, columnNumber) {
		let rowIndex = rowNumber - 1;
		let columnIndex = columnNumber - 1;

		return this.values[rowIndex][columnIndex];
	}

	getCellsByDistrictAddress(districtAddress) {

		let maxRowIndex = districtAddress.rowNumber * 3;
		let minRowIndex = maxRowIndex - 2;

		let maxColumnIndex = districtAddress.columnNumber * 3;
		let minColumnIndex = maxColumnIndex - 2;

		let districtValues = [];

		for (let i = minRowIndex; i <= maxRowIndex; i++) {

			for (let k = minColumnIndex; k <= maxColumnIndex; k++) {
				districtValues.push(this.values[i - 1][k - 1]);

			}
		}

		return districtValues;
	}

	getCellsByRowNumber(rowNumber) {
		let currentRowCells = [];
		let rowCells = this.values[rowNumber - 1];

		rowCells.forEach((cell, columnIndex) => {
			currentRowCells[columnIndex] = cell;
		});

		return currentRowCells;
	}

	getCellsByColumnNumber(columnNumber) {
		let columnCells = [];
		let columnIndex = columnNumber - 1;

		this.values.forEach((row) => {
			columnCells.push(row[columnIndex]);
		});

		return columnCells;
	}

	validate(cell) {
		let cellsWithError = [];
		let currentValue = cell.userInputValue;
		let districtCells = this.getCellsByDistrictAddress(cell.districtAddress);
		let rowCells = this.getCellsByRowNumber(cell.address.rowNumber);
		let columnCells = this.getCellsByColumnNumber(cell.address.columnNumber);

		let validate = (currentCell) => {
			if (currentCell === cell) {
				return;
			}

			let districtCellValue = currentCell.generatedValue !== null ? currentCell.generatedValue : currentCell.userInputValue;
			if (districtCellValue === currentValue && -1 === cellsWithError.indexOf(currentCell)) {
				cellsWithError.push(currentCell);
			}
		};
		districtCells.forEach(validate);
		rowCells.forEach(validate);
		columnCells.forEach(validate);

		if (cellsWithError.length > 0) {
			cellsWithError.push(cell);
		}

		return cellsWithError;
	}
}