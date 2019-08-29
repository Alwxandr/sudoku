import Sudoku from './sudoku';
import Cell from './cell';
import CellAddress from "./cellAddress";
import DistrictAddress from "./districtAddress";

let getDistrictByCellAddress = (cellAddress) => {
	let rowIndex = cellAddress.rowNumber;
	let columnIndex = cellAddress.columnNumber;

	let getDistrictIndex = (index) => {

		let indexPart = (index )/3;

		if (indexPart <= 1 ) {
			return 1;
		} else if (indexPart > 1 && indexPart <= 2) {
			return 2;
		} else if (indexPart > 2) {
			return 3;
		}
	};

	return new DistrictAddress(getDistrictIndex(rowIndex), getDistrictIndex(columnIndex));
};

export default {
	transform(sudoku) {
		let values = [];

		let rowIndex = 0;
		for (let rowPropertyName in sudoku) {
			let row = sudoku[rowPropertyName];
			row.forEach(function (cellValue, columnIndex) {
				if (values[rowIndex] === undefined) {
					values[rowIndex] = [];
				}
				let cellAddress = new CellAddress(rowIndex + 1, columnIndex + 1);
				let districtAddress = getDistrictByCellAddress(cellAddress);
				values[rowIndex][columnIndex] = (new Cell(cellValue, cellValue, cellAddress, districtAddress))
			});

			rowIndex++;
		}

		return new Sudoku(values);
	}
}