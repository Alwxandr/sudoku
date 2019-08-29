import numberHelper from '../numberHelper'

export default {

    mix(sudoku) {
      //  console.log('vertical district swap activated');
        // выбираем первый район для обмена
        let firstDistrictNumber = numberHelper.getRandomInt(1, 3);
       // console.log('First district number: ' + firstDistrictNumber);

        // выбираем второй район, кроме уже выбранного
        let secondDistrictNumber = firstDistrictNumber;
        while (secondDistrictNumber === firstDistrictNumber) {
            secondDistrictNumber = numberHelper.getRandomInt(1, 3);
        }
      //  console.log('Second district number: ' + secondDistrictNumber);

        // получаем индексы района
        let firstDistrictIndecies = getDistrictIndices(firstDistrictNumber);
       // console.log('First district indecies');
        //console.log(firstDistrictIndecies);
        let secondDistrictIndecies = getDistrictIndices(secondDistrictNumber);
        //console.log('Second district indecies');
       // console.log(secondDistrictIndecies);

        // меняем районы местами
        for (let rowIndex in sudoku) {
            let row = sudoku[rowIndex];

            for (let k in firstDistrictIndecies) {
                let firstDistrictIndex = firstDistrictIndecies[k];
                let secondDistrictIndex = secondDistrictIndecies[k];
                let temp = row[firstDistrictIndex];
                row[firstDistrictIndex] = row[secondDistrictIndex];
                row[secondDistrictIndex] = temp;
            }
        }

       // console.log('Vertical district swap completed');
       //   console.log(sudoku);
    }


}

let  getDistrictIndices = districtNumber => {
    let districtIndices = {
        1: [0,1,2],
        2: [3,4,5],
        3: [6,7,8]
    };

    if (!districtIndices.hasOwnProperty(districtNumber)) {
        throw new Error('Unknown district number');
    }

    return districtIndices[districtNumber];
}