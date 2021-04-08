"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.hello = void 0;
const hello = () => 'world';
exports.hello = hello;
// Python String.format adapted for TS + renamed inject
const inject = (input, ...args) => {
    // adapted from: https://stackoverflow.com/a/13639670/10412744
    let unkeyed_index = 0;
    return input.replace(/\{(\w*)\}/g, function (match, key) {
        if (key === '') {
            key = unkeyed_index;
            unkeyed_index++;
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        }
        else {
            for (let i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    });
};
exports.inject = inject;
// used like...
// let qwe = 'test {0} {1} and then some more';
// qwe = inject(qwe, '123', '456');
//# sourceMappingURL=utils.js.map