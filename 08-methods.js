// array.concat
// does not modify array and appends items individually
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
console.log(c);

// array.join
var a = ['a', 'b', 'c'];
console.log(a.join(' '));

// array.pop
var a = ['a', 'b', 'c'];
var c = a.pop();
console.log(a);
console.log(c);

// array.push
// modifies array and appends items whole
// returns length of new array

var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.push(b, true);
console.log(a);
console.log(c);

// array.reverse
var a = ['a', 'b', 'c'];
console.log(a.reverse());

// array.shift
// usually slower than pop
var a = ['a', 'b', 'c'];
var c = a.shift();
console.log(a);
console.log(c);

// array.slice
var a = ['a', 'b', 'c'];
console.log(a.slice(0, 1));
console.log(a.slice(0, 2));
console.log(a.slice(1));
console.log(a.slice(1, 2));

// array.sort
var n = [4, 8, 15, 16, 23, 42];
// defaults by comparing as strings
n.sort();
console.log(n);
// implement the sort function like <=>
n.sort(function (a, b) {
    return a - b;
});
console.log(n);

var by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw {
                name: 'Error',
                message: 'Expected an object when sorting by ' + name
            };
        }
    };
};

var s = [
    {first: 'Joe', last: 'Besser'},
    {first: 'Moe', last: 'Howard'},
    {first: 'Joe', last: 'DeRita'},
    {first: 'Shemp', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curly', last: 'Howard'}
];

s.sort(by('first'));
console.log(s);

// array.splice
// removes elements from an array, replacing them with new items
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 'bug');
console.log(a);
console.log(r);

// array.unshift
var a = ['a', 'b', 'c'];
var r = a.unshift('?', '@');
console.log(a);
console.log(r);

// function.apply
// invokes a function, passing this and arguments
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('bind', function (that) {
    var method = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);
    return function () {
        return method.apply(that,
            args.concat(slice.apply(arguments, [0])));
    };
});

var x = function () {
    return this.value;
}.bind({value: 123});
console.log(x());

// number.toExponential
console.log(Math.PI.toExponential(0));
console.log(Math.PI.toExponential(2));
console.log(Math.PI.toExponential(7));
console.log(Math.PI.toExponential(16));
console.log(Math.PI.toExponential());

// number.toFixed
console.log(Math.PI.toFixed(0));
console.log(Math.PI.toFixed(2));
console.log(Math.PI.toFixed(7));
console.log(Math.PI.toFixed(16));
console.log(Math.PI.toFixed());

// number.toPrecision
console.log(Math.PI.toPrecision(2));
console.log(Math.PI.toPrecision(7));
console.log(Math.PI.toPrecision(16));
console.log(Math.PI.toPrecision());

// number.toString
console.log(Math.PI.toString(2));
console.log(Math.PI.toString(8));
console.log(Math.PI.toString(16));
console.log(Math.PI.toString());

// object.hasOwnProperty
var a = {member: true};
var b = Object.create(a);
console.log(a.hasOwnProperty('member'));
console.log(b.hasOwnProperty('member'));

// regexp.exec
// Slowest regexp method
// TODO

// regexp.test
// Fastest regexp method
var b = /&.+;/.test('frank &amp; beans');
console.log(b);

// string.charAt
var name = 'Curly';
console.log(name.charAt(0));

// string.charCodeAt
var name = 'Curly';
console.log(name.charCodeAt(0));

// string.concat
var s = 'C'.concat('a', 't');
console.log(s);

// string.indexOf
var text = 'Mississippi';
console.log(text.indexOf('ss'));
console.log(text.indexOf('ss', 3));
console.log(text.indexOf('ss', 6));

// string.lastIndexOf
console.log(text.lastIndexOf('ss'));
console.log(text.lastIndexOf('ss', 3));
console.log(text.lastIndexOf('ss', 6));

// string.localeCompare
var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
m.sort(function (a, b) {
    return a.localeCompare(b);
});
console.log(m);

// string.match
// TODO

// string.replace
console.log("mother_in_law".replace('_', '-'));
console.log("mother_in_law".replace(/_/g, '-'));

var oldareacode = /\((\d{3})\)/g;
console.log('(555)555-1212'.replace(oldareacode, '$1-'));

// Dollar sequence Replacement
// $$ $
// $& The matched text
// $number Capture group text
// $` The text preceding the match $' The text following the match

// string.search
var text = 'and in it he says "Any damn fool could';
var pos = text.search(/["']/);
console.log(pos);

// string.slice
var text = 'and in it he says "Any damn fool could';
console.log(text.slice(18));
console.log(text.slice(0, 3));
console.log(text.slice(-5));
console.log(text.slice(19, 32));

// string.split
var digits = '0123456789';
console.log(digits.split(''));
console.log(digits.split('', 5));

var ip = '192.168.1.0';
console.log(ip.split('.'));

console.log('|a|b|c|'.split('|'));

// string.substring
// Use string.slice instead

// string.toLocaleLowerCase

// string.toLocaleUpperCase

// string.toLowerCase

// string.toUpperCase

// String.fromCharCode
var a = String.fromCharCode(67, 97, 116);
console.log(a);
