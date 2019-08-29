export default {
    mix(sudoku) {
        console.log("transposer activated")
        let tSudoku = {
            row1: [],
            row2: [],
            row3: [],
            row4: [],
            row5: [],
            row6: [],
            row7: [],
            row8: [],
            row9: [],
        };
        let rowNumber = 0;

        for (let rowIndex in sudoku) {
            sudoku[rowIndex].forEach(function (v, i) {
                let pn = 'row' + (i + 1);
                tSudoku[pn][rowNumber] = v;
            });

            rowNumber++;
        }
        
        for (let key in tSudoku){
            sudoku[key] = tSudoku[key];
        }
       // console.log(sudoku);
       // console.log("successfully trasposed");

    }
}
