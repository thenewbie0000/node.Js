// Node runs on a server but not on browser
// console is on the terminal window but not on console of chrome

//console.log("Hello World")

// there is global object in node js , vanilla had window object

//console.log(global);

// node has common core modules related operating system, file system
// common js instead of es6 module

const os = require('os');
const path = require('path');

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

//console.log(path.parse(__filename))


const {add, subtract, divide, multiply} = require('./math');
console.log(add(2,3));
console.log(subtract(2,3));
console.log(divide(2,3));
console.log(multiply(2,3));
