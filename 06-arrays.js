var empty = [];
var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
];

console.log(empty[1]);
console.log(numbers[1]);

console.log(empty.length);
console.log(numbers.length);

var numbers_object = {
    '0': 'zero', '1': 'one', '2': 'two',
    '3': 'three', '4': 'four', '5': 'five',
    '6': 'six', '7': 'seven', '8': 'eight',
    '9': 'nine'
};

console.log(numbers);

numbers.length = 3;
console.log(numbers);

numbers[numbers.length] = 'shi';
console.log(numbers);

numbers.push('go');
console.log(numbers);

delete numbers[2];
console.log(numbers);

numbers.splice(2, 1);
console.log(numbers);

var i;
for (i = 0; i < numbers.length; i += 1) {
    console.log(numbers[i]);
}

var is_array = function (value) {
    return value &&
        typeof value === 'object' &&
        value.constructor === Array;
};

// For arrays constructed in different frames
// var is_array = function (value) {
//     return value &&
//         typeof value === 'object' &&
//         typeof value.length === 'number' &&
//         typeof value.splice === 'function' &&
//         !(value.propertyIsEnumerable('length'));
// };

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Array.method('reduce', function (f, value) {
    var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
});

var data = [4, 8, 15, 16, 23, 42];

var add = function (a, b) {
    return a + b;
};

var mult = function (a, b) {
    return a * b;
};

var sum = data.reduce(add, 0);
console.log(sum);

var product = data.reduce(mult, 1);
console.log(product);

data.total = function () {
    return this.reduce(add, 0);
};

total = data.total();
console.log(total);

Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
};

var myArray = Array.dim(10, 0);
console.log(myArray);

var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

console.log(matrix[2][1]);

Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

var myMatrix = Array.matrix(4, 4, 0);
console.log(myMatrix);

Array.identity = function (n) {
    var i, mat = Array.matrix(n, n, 0);
    for (i = 0; i < n; i += 1) {
        mat[i][i] = 1;
    }
    return mat;
};

var myIdMatrix = Array.identity(4);
console.log(myIdMatrix);
