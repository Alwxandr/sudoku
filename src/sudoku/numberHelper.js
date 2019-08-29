export default {
    // Возвращает случайное целое число между min (включительно) и max (включительно)
    // Использование метода Math.round() даст вам неравномерное распределение!
    getRandomInt(min, max) {
        let increasedMax = max + 1;

        return Math.floor(Math.random() * (increasedMax - min)) + min;
    },
    //возвращает массив из двух случайных чисел между min (включительно) и max (не включая max)

}
