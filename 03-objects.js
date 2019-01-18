var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

console.log(stooge["first-name"]);
console.log(stooge["middle-name"]);
// Default values
console.log(stooge["middle-name"] || "(none)");

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

console.log(flight.departure.IATA);
// Checking existence
// console.log(flight.equipment.model); // Exception
console.log(flight.equipment && flight.equipment.model);

// Updating values
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';

// Objects are passed by reference and never copied
var x = stooge;
x.nickname = 'Curly';
// References the same object
var nick = stooge.nickname; // 'Curly'

// Different objects
var a = {}, b = {}, c = {};

// Same object
a = b = c = {};

// Prototypes
// Object literals are linked to Object.prototype
// Select the object prototype when making new objects
if(typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);
console.log(another_stooge);

// Prototype link has no effect on updating
// Changes to an object do not touch its prototype
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';
console.log(another_stooge);

// Prototype link is used only in retrieval
stooge.profession = 'actor';
console.log(another_stooge.profession);
// Delegation is the process of finding the property
// based on the object and its prototype, etc.

// Reflection
// Determine type of a property
console.log(typeof flight.number);
console.log(typeof flight.status);
console.log(typeof flight.arrival);
console.log(typeof flight.manifest);
// Any property on the prototype chain can produce a value
console.log(typeof flight.toString);
console.log(typeof flight.constructor);
// hasOwnProperty does not look at prototype chain
console.log(flight.hasOwnProperty('number'));
console.log(flight.hasOwnProperty('constructor'));

// Enumeration
// For in uses the prototype chain and does not guarantee order
var name;
for (name in another_stooge) {
    if (another_stooge.hasOwnProperty(name)) {
        console.log(name + ': ' + another_stooge[name]);
    }
}

// For using a defined array will not dredge up functions
// from the prototype chain and will guaratee order
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for (i = 0; i < properties.length; i += 1) {
    console.log(properties[i] + ': ' + another_stooge[properties[i]]);
}

// Delete
// Will not touch objects in the prototype linkage
// Doing so will allow a property from the
// prototype chain to come through
console.log(another_stooge.nickname);
delete another_stooge.nickname;
console.log(another_stooge.nickname);

// Global Abatement
// One way to minimize global variables is to create
// a single global variable for you app
// Can use this trick like namespaces
// Can also use closure for information hiding
var MYAPP = {};
MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

console.log(MYAPP);
