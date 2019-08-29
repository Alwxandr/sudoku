import numberHelper from '../numberHelper'
export default {
    mix(sudoku) {
        //console.log('Column swapper activated');
        // выбрать случайную колонку
        let firstColumnIndex = numberHelper.getRandomInt(0, 8);
       // console.log('First column index selected: ' + firstColumnIndex);

       // console.log('Trying to determine column indices');
        // получить все индексы района
        let districtColumnIndices = getDistrictColumnIndices(firstColumnIndex);
        //console.log(districtColumnIndices);


        // выбрать вторую случайною колонку не равную уже выбранной
        let secondColumnIndex = firstColumnIndex;
        while (secondColumnIndex === firstColumnIndex) {
            secondColumnIndex = numberHelper.getRandomInt(districtColumnIndices[0], districtColumnIndices[1]);
        }
       // console.log('Second column index selected: ' + secondColumnIndex);

       // console.log(`Applying column swap for index ${firstColumnIndex} and ${secondColumnIndex}`);
        for (let rowIndex in sudoku) {
            let row = sudoku[rowIndex];
            let temp = row[firstColumnIndex];
            row[firstColumnIndex] = row[secondColumnIndex];
            row[secondColumnIndex] = temp;
        }
        //console.log('Column swap succesfully complete');
        //console.log(sudoku);
    }

}



let getDistrictColumnIndices = (index) => {
    let district1 = [0,1,2];
    let district2 = [3,4,5];
    let district3 = [6,7,8];

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