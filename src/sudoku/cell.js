export default class Cell {
	generatedValue = null;
	possibleSolutionValue = null;
	guessValues = [];
	userInputValue = null;
	address = null;
	districtAddress = null;
	cellErr = null;

	constructor(generatedValue, possibleSolutionValue, address, districtAddress) {
		this.generatedValue = generatedValue;
		this.possibleSolutionValue = possibleSolutionValue;
		this.address = address;
		this.districtAddress = districtAddress;
	}
}