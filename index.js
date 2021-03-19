'use strict';
const fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});
process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));
    main();
});
function readLine() {
    return inputString[currentLine++];
}
// Complete the gridSearch function below.
let fullPattern = false

function gridSearch(grid, pattern) {
    let gRow = 0
    let pRow = 0
    fullPattern = false
    while (gRow < grid.length) {
        let startIndex = 0
        while (grid[gRow].indexOf(pattern[pRow], startIndex) !== -1 ) {
            // check for multiple occurrences per line
            let index = grid[gRow].indexOf(pattern[pRow], startIndex)
            // console.log(`index= ${index} startIndex= ${startIndex} gRow= ${gRow} pattern[pRow]= ${pattern[pRow]}`)
            const exists = findPattern(grid, pattern, gRow, pRow, index)
            startIndex += 1
            if (exists) {
                return 'YES'
            }
        }
        gRow ++
    }
    return 'NO'
}

function findPattern(grid, pattern, gRow, pRow, index) {
    fullPattern = false
    // iterate through the lines to see if all of the pattern exists
    // doesn't make a difference in test results if .substring is used instead
    if ( grid[gRow + 1] !== undefined && pattern[pRow + 1] !== undefined && grid[gRow + 1].indexOf(pattern[pRow + 1]) === index ) {
        findPattern(grid, pattern, gRow + 1, pRow + 1, index)
    }
    if ( pRow === pattern.length - 1 && grid[gRow].substring(index, pattern[pRow].length + index) === pattern[pRow] ) {
        fullPattern = true
    }
    return fullPattern
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine(), 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');
        const R = parseInt(RC[0], 10);
        const C = parseInt(RC[1], 10);
        let G = [];
        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }
        const rc = readLine().split(' ');
        const r = parseInt(rc[0], 10);
        const c = parseInt(rc[1], 10);
        let P = [];
        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }
        let result = gridSearch(G, P);
        ws.write(result + "\n");
    }
    ws.end();
}
