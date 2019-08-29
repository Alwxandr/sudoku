<template>
    <div class= "container">
        <div class="sudocu-header"><h1>Simple Sudoku </h1></div>
        <div class="table">
            <div v-for="(row, indexRow) in sudokuPuzzle.values" :key="indexRow"
                 :class="{'row':true }"
            >
                <div    v-model="inputCell.userInputValue"
                        v-for="(cell, indexCell) in row"
                        :key="indexCell"
                        :data-cell-velue="JSON.stringify(cell)"
                        @click="cell.generatedValue === null && cellWithError.length < 1 ? activ(cell) : {}"

                        :class="{'cell': true,
                                  test: checkErrorCells( cell),
                                 'error-cell': cell.cellErr === 1,
                                 'active-cell':  cell === inputCell,
                                 'change-cell' : cell.userInputValue !== null,
                                 'right-border': (indexCell + 1) % 3 === 0 && (indexCell+1) !== 9,
                                 'bottom-border': (indexRow + 1) % 3 === 0 && (indexRow + 1) !== 9,
                                 'full-cell' : cell.generatedValue !== null}"

                >{{cell.generatedValue === null ? cell.userInputValue : cell.generatedValue}}
                </div>
            </div>
        </div>
        <div class="button-block">
            <div class="btn" v-for="number in 9" :key="number" >
                <button @click="inputNumber(number)">{{number}}</button>
            </div>
            <div class="btn del" @click="deleteNumber()">
                <button> Х </button>
            </div>
        </div>
    </div>
</template>

<script>
    import sudokuCreator from '../sudoku/sudokuCreator';

    export default {
        name: 'Sudoku',
        data() {
            return {
                sudokuPuzzle: {},
                inputCell: '',
                cellWithError: [],
                isGameOver: false,
            }
        },
        methods: {
            activ(cell)  {
                this.inputCell = cell;
            },
            inputNumber(number){
                if (this.inputCell !== '') {
                    this.inputCell.userInputValue = number;
                    let errorCells = this.sudokuPuzzle.validate(this.inputCell );
                    this.cellWithError = errorCells;
                    this.clearError();
                }

                if (this.isCompleted()) {

                    setTimeout( () => {
                        this.isGameOver = true;
                        alert("Вы прошли игру, начать заново?");
                        location.reload();
                    }, 200)

                }
            },
            deleteNumber(){
                if(this.inputCell !== ''){
                    this.inputCell.userInputValue = null;
                    this.cellWithError = [];
                    this.clearError();
                }
            },
            checkErrorCells(cell){
                if (this.cellWithError.length > 0){
                    this.cellWithError.forEach( (errCell)=> {
                        if(errCell.address.columnNumber === cell.address.columnNumber && errCell.address.rowNumber === cell.address.rowNumber){
                            cell.cellErr = 1;
                        }
                    });
                }
            },
            clearError(){
                this.sudokuPuzzle.values.forEach((row) => {
                    row.forEach(function (cell) {
                         cell.cellErr = null;
                    });
                })
            },
            isCompleted(){
                if(this.cellWithError.length > 0){
                    return false;
                }

                let result = true;

                this.sudokuPuzzle.values.forEach((row) => {
                    row.forEach(function (cell) {

                        let hasUserInput = cell.userInputValue !== null;
                        let hasGeneratedValue = cell.generatedValue !== null;

                        if(!hasUserInput && !hasGeneratedValue){
                            result = false;
                        }
                    });
                });

                return result;
            }
        },

        created() {
            let sudoku = sudokuCreator.create();
            this.sudokuPuzzle = sudoku.sudokuPuzzle;

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        width: 360px;
        margin: 0 auto;
    }
    .sudocu-header{
        display: flex;
        justify-content: center;
    }

    .table {
        display: table;
        border: 3px solid #333;
        width: 354px;
        text-align: center;
    }

    .row {
        display: table-row;
    }
    .cell {
        display: table-cell;
        padding: 10px;
        border-right: 1px solid #bdc3c7;
        border-bottom: 1px solid #bdc3c7;
        cursor:pointer;
        width: 14px;
        height: 14px;
    }
    .bottom-border {
        border-bottom: 3px solid #333;
    }

    .right-border {
        border-right: 3px solid #333;
    }
    .button-block{
        /*display: flex;*/
        margin-top: 20px;
        justify-content: space-between;
    }
    .btn{
        margin-left: 10px;
        display: inline-block;
        margin-top: 10px;
    }
    .btn button {
        cursor:pointer;
        width: 64px;
        height: 64px;
        background-color: #a7d2bc;
        border: 1px solid black;
        text-align: center;
        font-size: 23px;
    }
    .btn:first-child {
        margin-left: 0;
    }
    .btn:nth-child(6) {
        margin-left: 0;
    }
    .del {
        margin-left: 6px;
    }
    .del button{
        background-color: red;
    }
    .full-cell{
        background-color: lightgrey;
        cursor:default;
    }
    .active-cell {
        background-color: aquamarine !important;
    }
    .change-cell{
        background-color: blanchedalmond;
    }
    .error-cell{
        color: red;
    }
</style>
