// In classical languages, objects are instances of classes,
// and a class can inherit from another class. JavaScript is a
// prototypal language, which means that objects inherit directly
// from other objects.

// Pseudoclassical Pattern

// var Mammal = function (name) {
//     this.name = name;
// }
//
// Mammal.prototype.get_name = function () {
//     return this.name;
// }
//
// Mammal.prototype.says = function () {
//     return this.saying || '';
// }
//
// var myMammal = new Mammal('Herb the Mammal');
// console.log(myMammal.get_name());
//
// // var Cat = function (name) {
// //     this.name = name;
// //     this.saying = 'meow';
// // };
// //
// // // Replace Cat.prototype with a new instance of Mammal
// // Cat.prototype = new Mammal();
// //
// // // Augment the new prototype with some methods
// // Cat.prototype.purr = function (n) {
// //     var i, s = '';
// //     for (i = 0; i < n; i += 1) {
// //         if (s) {
// //             s += '-';
// //         }
// //         s += 'r';
// //     }
// //     return s;
// // };
// //
// // Cat.prototype.get_name = function () {
// //     return this.says() + ' ' + this.name + ' ' + this.says();
// // };
// //
// // var myCat = new Cat('Henrietta');
// // console.log(myCat.says());
// // console.log(myCat.purr(5));
// // console.log(myCat.get_name());
//
// // Trying to make it look a little more classical
// Function.prototype.method = function (name, func) {
//     this.prototype[name] = func;
//     return this;
// };
//
// Function.method('inherits', function (Parent) {
//     this.prototype = new Parent();
//     return this;
// });
//
// var Cat = function (name) {
//     this.name = name;
//     this.saying = 'meow';
// }.
//     inherits(Mammal).
//     method('purr', function (n) {
//         var i, s = '';
//         for (i = 0; i < n; i += 1) {
//             if (s) {
//                 s += '-';
//             }
//             s += 'r';
//         }
//         return s;
//     }).
//     method('get_name', function () {
//         return this.says() + ' ' + this.name + ' ' + this.says();
//     });
//
// var myCat = new Cat('Henrietta');
// console.log(myCat.says());
// console.log(myCat.purr(5));
// console.log(myCat.get_name());

// Object Specifiers Pattern

// This helps to remember many parameters
// var myObject = maker({
//     first: f,
//     last: l,
//     state: s,
//     city: c
// });

// Prototypal Pattern

// var myMammal = {
//     name: 'Herb the Mammal',
//     get_name: function () {
//         return this.name;
//     },
//     says: function () {
//         return this.saying || '';
//     }
// };
//
// var myCat = Object.create(myMammal);
// myCat.name = 'Henrietta';
// myCat.saying = 'meow';
// myCat.purr = function (n) {
//     var i, s = '';
//     for (i = 0; i < n; i += 1) {
//         if (s) {
//             s += '-';
//         }
//         s += 'r';
//     }
//     return s;
// };
// myCat.get_name = function () {
//     return this.says() + ' ' + this.name + ' ' + this.says();
// };
//
// // This is differential inheritance
//
// console.log(myCat.says());
// console.log(myCat.purr(5));
// console.log(myCat.get_name());

// Functional Pattern

// var constructor = function (spec, my) {
//     var that, other, private, instance, variables;
//     my = my || {};
//
//     // Add shared variables and functions to my
//     // that = a new object;
//     // my.member = value;
//
//     // Add privileged methods to that
//     // var methodical = function () {
//     //     ...
//     // };
//     // that.methodical = methodical;
//
//     return that;
// };

var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };

    that.says = function () {
        return spec.saying || '';
    };

    return that;
};

var myMammal = mammal({name: 'Herb'});

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);

    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };

    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };

    return that;
}

var myCat = cat({name: 'Henrietta'});

console.log(myCat.says());
console.log(myCat.purr(5));
console.log(myCat.get_name());

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});

var coolcat = function (spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');

    that.get_name = function () {
        return 'like ' + super_get_name() + ' baby';
    };

    return that;
};

var myCoolCat = coolcat({name: 'Bix'});
console.log(myCoolCat.get_name());

// Parts Pattern

// A function that can add simple event processing
// features to any object

// var eventuality = function (that) {
//     var registry = {};
//
//     that.fire = function (event) {
//         var array,
//             func,
//             handler,
//             i,
//             type = typeof event === 'string' ?
//                     event : event.type;
//
//         if (registry.hasOwnProperty(type)) {
//             array = registry[type];
//             for (i = 0; i < array.length; i += 1) {
//                 handler = array[i];
//
//                 func = handler.method;
//                 if (typeof func === 'string') {
//                     func = this[func];
//                 }
//
//                 func.apply(this,
//                     handler.parameters || [event]);
//             }
//         }
//         return this;
//     };
//
//     that.on = function (type, method, parameters) {
//         var handler = {
//             method: method,
//             parameters: parameters
//         };
//
//         if (registry.hasOwnProperty(type)) {
//             registry[type].push(handler);
//         } else {
//             registry[type] = [handler];
//         }
//
//         return this;
//     };
//
//     return that;
// };
