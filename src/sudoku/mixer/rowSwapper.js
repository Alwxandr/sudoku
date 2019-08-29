import numberHelper from '../numberHelper'

let getDistrictByIndex = (index) => {
    let district1 = [1, 2, 3];
    let district2 = [4, 5, 6];
    let district3 = [7, 8, 9];

    let districts = [
        district1,
        district2,
        district3
    ];

    for (let i in districts) {
        let currentDistrict = districts[i];
        let searchResult = currentDistrict.indexOf(index);
        if (searchResult !== -1) {
            return currentDistrict
        }
    }

    throw new Error('Unsupported index');
}

export default {
    mix(sudoku) {
       // console.log('[RowSwap] Row swap activated');
        // выбрать первую случайную строку
        let firstRowIndex = numberHelper.getRandomInt(1, 9);
       // console.log('[RowSwap] First row index: ' + firstRowIndex);

        // определить район строки
        let district = getDistrictByIndex(firstRowIndex);
        //console.log('[RowSwap] District detected');
       // console.log(district);

        // выбрать вторую случайную строку из района не равную уже выбранной
        let secondRowIndex = firstRowIndex;
        while (secondRowIndex === firstRowIndex) {
            secondRowIndex = numberHelper.getRandomInt(district[0], district[2])
        }
        //console.log('[RowSwap] Second row index: ' + secondRowIndex);

        // меняем строки местами
        let firstPropertyName = 'row' + firstRowIndex;
        let secondPropertyName = 'row' + secondRowIndex;
        let tempRow = sudoku[firstPropertyName];
        sudoku[firstPropertyName] = sudoku[secondPropertyName];
        sudoku[secondPropertyName] = tempRow;
        //console.log(`[RowSwap] Rows ${firstRowIndex} and ${secondRowIndex} successfully swaped`);
    }

}

