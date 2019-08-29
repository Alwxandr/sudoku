import numberHelper from '../numberHelper'
import baseSudoku from "../baseSudoku";

//меняет меставми 2 указанных элемента в массиве
function swapArr(arr, a, b) {
    arr[a] = arr.splice(b, 1, arr[a])[0];
}


export default {
    mix(sudoku){
       // console.log("horizontalDistrictSwap activated!")
        let i = 0;
        let d1 = {};
        let d2 = {};
        let d3 = {};

        for (let key in sudoku){

            if( i <= 2 ){
                d1[key] = sudoku[key];
            }else if( i >= 3 && i <= 5 ){
                d2[key] = sudoku[key];
            }else {
                d3[key] = sudoku[key];
            }
             i++;
        }

        let sudokuDistricts = [d1, d2, d3];
        let a , b;
       // console.log("District array created")

        function randInt() {
            a = numberHelper.getRandomInt(0, 2);
            b = numberHelper.getRandomInt(0, 2);

            while(a === b) {
                b = numberHelper.getRandomInt(0, 2);
            }

        }
        randInt();
        //console.log(`Generated random int for swapArr : ${a}, ${b}`);
        swapArr(sudokuDistricts, a, b);
        let counter = 1;
        sudokuDistricts.forEach(function (district) {
            for(let rowIndex in district) {
                let currentRowIndex = "row" + counter;

                sudoku[currentRowIndex] = district[rowIndex]
                counter++;
            }
        });
       // console.log(sudoku);
        //console.log('horizontalDistrictSwap completed');
    }
}