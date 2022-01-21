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
alert(3 + 3);  // Addition
alert(2 - 1);  // Subtraction
alert(5 * 4);  // Multiplication
alert(2 ** 3); // Exponentiation
alert(8 / 2);  // Division
alert(10 % 3); // Modulus (remainder)

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

// Arrays
// counts as Objects, but each element is accessed by the index number, not a name
const exampleArray = ["Joe", "Bill"];
exampleArray.push("Bob"); // adds value to end of array
alert(exampleArray[0]);
exampleArray[1] = "Billy";
alert(exampleArray.length);
exampleArray[3] = "Jeff"; // can add element to an undefined array index
alert(exampleArray.pop);
alert(exampleArray.shift());
exampleArray.unshift("Joe");
alert(exampleArray.toString());
const concatArray = exampleArray.concat(["Jeremy, Bryan"]);
alert(concatArray.slice(1, 3).toString()); // inclusive starting, exclusive ending. Can have 1 parameter.

// Loops
// While loop
while (true || false) {
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
// Label - can identify a loop, to break out of/continue from (good for nested loops)
outer: for (let i = 0; i < 3; i++) {
    if (true) {
        break outer;
    }
}

// DOM manipulation
// Note: script is run when encountered in HTML, so either put js at bottom of HTML or add 'defer' tag to have js loaded after HTML is parsed
// Example: <script src="js-file.js" defer></script>
const container = document.querySelector('#container'); // gets the node with id='container'
const manyContainers = document.querySelectorAll('div'); // gets all div, as a nodelist (similar to array, with a few missing functions)
console.dir(container.firstElementChild); // gets first element within container
const div = document.createElement('div'); // creates new element in memory
container.firstElementChild.appendChild(div); // adds div as a child of the first element of container
container.firstElementChild.removeChild(div); // removes div from first element of container
container.firstElementChild.insertBefore(div, container.firstElementChild.firstElementChild) // inserts div before the first child element of the first element of container
// Style
div.style.color = 'blue'; // sets div's attributes (see http://domenlightenment.com/#6.2)
div.style.cssText = 'color: blue; background: white'; // multiple style rules
div.setAttribute('style', 'color: blue; background: white'); // same as above
// ID
div.setAttribute('id', 'newId'); // either updates current id to newId or adds new id
div.getAttribute('id');
div.removeAttribute('id');
// Class
div.classList.add('new'); // adds a new class called "new"
div.classList.remove('new'); // removes "new" class
div.classList.toggle('new'); // if "new" exists, remove. if not, add.
// Text
div.textContent = 'Hello World';
// HTML
div.innerHTML = '<span>Hello World</span>'; // potentially dangerous to injection, use textContent
// Events (list of events: https://www.w3schools.com/jsref/dom_obj_event.asp)
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        alert(button.id);
    });
});
buttons[1].addEventListener('click', function (e) {
    console.log(e.target);
});
