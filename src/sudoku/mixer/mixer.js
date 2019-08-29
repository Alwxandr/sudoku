import rowSwapper from './rowSwapper'
import transposer from './transposer'
import horizontalDistrictSwap from './horizontalDistrictSwapper'
import columnSwapper from "./columnSwapper"
import verticalDistrictSwapper from "./verticalDistrictSwapper"
import numberHelper from '../numberHelper'

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;


    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let mixers = [
    {
        mixer: rowSwapper,
        minExecutionCount: 10,
        maxExecutionCount: 25
    },
    {
        mixer: transposer,
        minExecutionCount: 0,
        maxExecutionCount: 1
    },
    {
        mixer: horizontalDistrictSwap,
        minExecutionCount: 1,
        maxExecutionCount: 5
    },
    {
        mixer: columnSwapper,
        minExecutionCount: 10,
        maxExecutionCount: 25
    },
    {
        mixer: verticalDistrictSwapper,
        minExecutionCount: 1,
        maxExecutionCount: 5
    },
];

export default {
    mix(sudoku) {

        let mixersConfig = shuffle(mixers);

        mixersConfig.forEach(function (mixerConfig) {
            let mixer = mixerConfig.mixer;
            let executionCount = numberHelper.getRandomInt(
                mixerConfig.minExecutionCount,
                mixerConfig.maxExecutionCount
            );
            for (let i = 0; executionCount > i; i++  ) {
                mixer.mix(sudoku);
            }

        })


    }
}
