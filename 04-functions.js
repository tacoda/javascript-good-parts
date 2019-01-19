// Functions are used for code reuse, information
// hiding and composition
// Functions are used to specify the behavior of objects

var add = function (a, b) {
    return a + b;
};

console.log(add(2, 3));

// An inner function has access to the parameters and
// variables in an outer function
// The function closes over it's environment (closure)

// Value of this depends on invocation pattern:
// - Method
// - Function
// - Constructor
// - Apply

// No runtime error for argument number mismatch
// Extra arguments are ignored
// Unspecified arguments are undefined
// No type checking on argument values

// Method Invocation Pattern

// A function that is stored as a property on an object
// this is bound to the object
// Binding happens at invocation time
// Methods that get their object context from
// this are called public methods
// Late binding makes public methods highly reusable

var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
console.log(myObject);
myObject.increment(2);
console.log(myObject);

// Function Invocation Pattern

// A function that is not the property of an object

var sum = add(3, 4);
console.log(sum);

// this is bound to the global object
// Workaround to assign this to this variable of the
// outer function

myObject.double = function () {
    // Workaround:
    var that = this; // that is convention

    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper();
}

myObject.double();
console.log(myObject.value);

// Constructor Invocation Pattern

// A function invoked with new
// Javascript is a prototypal inheritance language

// this is bound to the new object

// Constructor for Quo
var Quo = function (string) {
    this.status = string;
};

// Add a public method to all instance of Quo
Quo.prototype.get_status = function () {
    return this.status;
}

// Make an instance of Quo
var myQuo = new Quo('confused');
console.log(myQuo.get_status());

// By convention, constructors are kept in
// variables with a capitalized name
// If a constructor is called without new
// very bad things happen without
// compile-time or runtime warnings
// Better constructor alternative in next file

// Apply Invocation Pattern

// A method on a function
// Since Javascript is functional,
// functions can have methods

var array = [3, 4];
var sum = add.apply(null, array);
console.log(sum);

var statusObject = {
    status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on it
var status = Quo.prototype.get_status.apply(statusObject);
console.log(status);

// Arguments

// arguments array is an additional parameter
// available to functions when they are invoked
// arguments is not really an array:
// it's an array-like object
// it has length, but lacks all of the array methods

var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};
console.log(sum(4, 8, 15, 16, 23, 42));

// Return
// If a return value is not specified,
// undefined is returned
// If the function was invoked with new and the
// return value is not an object,
// this (the new object) is returned

// Exceptions

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
};

var try_it = function() {
    try {
        add("seven");
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
};

// If handling depends on the type of exception,
// the handler will have to inspec the name

// try_it();

// Augmenting Types

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((-10 / 3).integer());

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

console.log("   neat    ".trim());

// Add a method conditionally
// To avoid problems when mixing libraries

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
}

// Recursion

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(3, 'Src', 'Aux', 'Dst');

// var walk_the_DOM = function walk(node, func) {
//     func(node);
//     node = node.firstChild;
//     while (node) {
//         walk(node, func);
//         node = node.nextSibling;
//     }
// };
//
// var getElementsByAttribute = function (att, value) {
//     var results = [];
//
//     walk_the_DOM(document.body, function (node) {
//         var actual = node.nodeType === 1 && node.getAttribute(att);
//         if (typeof actual === 'string' &&
//                 (actual === value || typeof value !== 'string')) {
//                     results.push(node);
//                 }
//     });
//
//     return results;
// };
//
// console.log(getElementsByAttribute('class', 'main'));

// Javascript doesn't have TCO
// Functions that recurse deeply can exhaust the stack

var factorial = function factorial (n) {
    // a = a || 1;
    // if (i < 2) {
    //     return a;
    // }
    // return factorial(i - 1, a * i);

    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
};

console.log(factorial(4));

// Scope

// Javascript does not have block scope
// Javascript has function scope
// It is best to declare all variables used
// in a function at the tope of the body
// Done automatically with hoisting

// Closure

var quo = function (status) {
    return {
        get_status: function() {
            return status;
        }
    };
};

var myQuo = quo('amazed');
console.log(myQuo.get_status());

// var fade = function (node) {
//     var level = 1;
//     var step = function () {
//         var hex = level.toString(16);
//         node.style.backgroundColor = '#FFFF' + hex + hex;
//         if (level < 15) {
//             level += 1;
//             setTimeout(step, 100);
//         }
//     };
//     setTimeout(step, 100);
// };
//
// fade(document.body);

var add_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (i) {
            return function (e) {
                alert(e);
            };
        }(i);
    }
};

// Callbacks

// send_request_asynchronously(request, function (response) {
//     display(response);
// });

// Module

String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    return function () {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());

// Module Pattern is a great tool for information hiding
// and other good design principles

// Secure objects

// Notice: Does not use this

var serial_maker = function () {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
console.log(seqer.gensym());

// Cascade

// Method Chaining

// getElement('myBoxDiv').
//     move(350, 150).
//     width(100).
//     height(100).
//     color('red').
//     border('10px outset').
//     padding('4px').
//     appendText('Please Stand By').
//     on('mousedown', function (m) {
//         this.startDrag(m, this.getNinth(m));
//     }).
//     on('mousemove', 'drag').
//     on('mouseup', 'stopDrag').
//     later(2000, function () {
//         this.
//             color('yellow').
//             setHTML('What hath God wraught?').
//             slide(400, 40, 200, 200);
//     }).
//     tip('This box is resizable');

// Curry

// Currying produces a new function by combining a
// function and an argument

Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add1 = add.curry(1);
console.log(add1(6));

var add42 = add.curry(42);
console.log(add42(42));

// Memoization

// var fibonacci = function (n) {
//     return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
// };

var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();

for (var i = 0; i <= 10; i += 1) {
    console.log(i + ': ' + fibonacci(i));
}

var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};

var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});

var factorial = memoizer([1, 1], function (shell, n) {
    return n * shell(n - 1);
});

console.log(factorial(5));
