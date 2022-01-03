/*
This is a personal cheatsheet for javascript, made by following The Odin Project (see https://www.theodinproject.com/).
Still a WIP, plan on covering basic javascript at least.
*/

// Variable creation. Can do multiple in one line, or separated by commas.
// Basic syntax: use camelCase. No hyphens, start with letter or '$' or '_'. No reserved words.
let varName = 'hello';

// Constants - variables that do not change.
// Often denoted by all uppercase names and underscores when hardcoded in. Otherwise, camelCase.
const PERSONAL_NAME = "Alan";

// Output
alert("Hello World!");
console.log("Hello World!!");

// Arithmetic - consists of basic math operations, similar to other languages. Follows PEMDAS.
// Shorthand works similarly to Java as well (+=, -=, *=, /=, ++, --)
alert(3+3);  // Addition
alert(2-1);  // Subtraction
alert(5*4);  // Multiplication
alert(2**3); // Exponentiation
alert(8/2);  // Division
alert(10%3); // Modulus (remainder)

// Data Types - Strings, Numbers, Booleans, BigInt (larger than 2^53 in magnitude), Object, null, undefined, Symbol
let exampleNumber = 10;
alert(typeof exampleNumber);
alert(typeof varName);
alert(typeof null);

// Casting - works between multiple data types.
Number('74'); // = 74

// Conditionals
// Can compare strings, numbers, etc. 0 == '' == false
// '==' allows comparison of different data types, '===' does not (types must match)
// null == undefined, but === is false. Be careful with null and undefined cases, try not to compare.
// Can use no curly brackets, but conventionally better to use.
if (true) {
    // Code here
} else if (true) {
    // Code here
} else {
    // Code here
}

// Functions
// default parameter value is undefined, unless otherwise specified
// default return value is undefined
function addNumbers(num1, num2) {
    return num1 + num2;
}
function showMessage(from, text = "no text given") {
    return from + ": " + text;
    alert(text ?? "no text given"); // If there was no default value specified, this works similarly
}
function lThings(thing) {
    return thing.startsWith('L');
}

// Loops
// While loop
while (true) {
    // Code here
}
// Do while loop
do {
    // Code here
} while (true);
// For loop
for (let i = 0; i < 3; i++) {
    // Code here
}
// For each loop
let things = []
for (const thing of things) {
    // Code here
}
// map() - returns new array with a function done to each element in an existing array. Often used in one line.
let things2 = things.map(showMessage);
things2 = things.map((thing) => thing.toUpperCase()); // makes everything uppercase
// filter() - returns new array filtered by a boolean function from existing array
let things3 = things.filter(lThings);
things3 = things.filter((thing) => thing.startsWith('L')); // same thing, in one line
// Label - can identify a loop, to break out of/continue from
outer: for (let i = 0; i < 3; i++) {
    if (true) {
        break outer;
    }
}
