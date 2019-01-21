// Sloppy regular expressions are a popular source of security exploits.
// Nested regular expressions can also suffer horri- ble performance problems in some implementations. Simplicity is the best strategy.

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.ora.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);
var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = '       ';

var i;
for (i = 0; i < names.length; i += 1) {
    console.log(names[i] + ': ' + blanks.substring(names[i].length) + result[i]);
}

var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test_number = function (num) {
    console.log(parse_number.test(num));
};

test_number('1');
test_number('number');
test_number('98.6');
test_number('132.21.86.100');
test_number('123.45E-67');
test_number('123.45D-67');

// Construction

// Literal
var myRegexp = /"(?:\\.|[^\\\"])*"/g;

// Object
// Useful when generating at runtime
var myNewRegexp = new RegExp("\"(?:\\.|[^\\\\\\\"])*\"", 'g');

// RegExp objects made with literals share a single instance
function make_a_matcher() {
    return /a/gi;
}

var x = make_a_matcher();
var y = make_a_matcher();

// x and y are the same object
x.lastIndex = 10;
console.log(y.lastIndex);

// RegExp Factors

// Use \f, \t, \r, \n, \d, \D, \s, \S, \u####

// Do not use \w, \W, \b

// Line beginning
// ^

// Line ending
// $

// Any character
// .

// Simple letter class
// [A-Za-z\u00C0-\u1FFF\u2800-\uFFFD]

// Class negation
// [^]

// Referencing groups
// \1, \2, \3, ...

// Capturing groups
// Numbered sequentially
// ()

// Noncapturing groups
// Does not interfere with capture group numbering
// (?:)

// Set of 32 ASCII special characters
// [!-\/:-@\[-`{-~]

// Characters that must be escaped in a character class
// - / [ \ ] ^

// RegExp Quantifiers

// Match 3 times
// /w{3}/

// Match 3 to 6 times
// /w{3,6}/

// Match 3 or more times
// /w{3,}/

// Match 0 or 1 time
// {0,1}
// ?

// Match 0 or more times
// {0,}
// *

// Match 1 or more times
// {1,}
// +

// Matching tends to be greedy
// If the quantifier has an extra ? suffix,
// matching tends to be lazy
// It's usually best to stick with greedy matching
