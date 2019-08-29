import baseSudoku from './baseSudoku';
import mixer from './mixer/mixer';
import transformer from './sudokuTransformer'
import cellMasker from './cellMasker'

export default {
    create() {
        mixer.mix(baseSudoku);
        let sudoku = transformer.transform(baseSudoku);
        cellMasker.mask(sudoku, 36)

        return {
            sudokuPuzzle: sudoku,
        }
    }
}
