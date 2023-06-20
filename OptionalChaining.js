/**
 * Implements Optional Chaining (?.) server side. Pass an object and the chain of children to call.
 * The value at the end of the chain will be returned. If anything in the chain doesn't exist, undefined is returned.
 * @param {Object} obj 
 * @returns value at the end of the chain or undefined
 */

module.exports = function (obj) {
    const argv = arguments; // arguments is actually an object gallavanting around like an array
    const chain = [];

    // Build chain of properties to call
    Object.keys(arguments).forEach(function (key) {
        if (Number(key) === 0) return;

        chain.push(argv[key]);
    });

    return dig(obj, chain);

    function dig (obj, chain) {
        if (!chain.length) { // Check if there is more digging to do
            return obj;
        } else if (obj === null || obj === undefined) { // If we still need to dig, but the object is null or undefined
            return undefined;
        }

        const attr = chain.shift(); // Grab the next property from the chain of properties to check

        // If the attribute exists in the object, use that attribute to continue going down the chian. If it doesn't, return undefined.
        if (typeof obj === 'object') { // the 'in' operator only works on objects. Primitives will throw a typerror
            return attr in obj ? dig(obj[attr], chain) : undefined;
        } else { // hasOwnProperty only works for attributes of objects assigned in the constructor. For primitives this is a fine as nobody is messing with primitives' attributes
            return obj.hasOwnProperty(attr) ? dig(obj[attr], chain) : undefined;
        }
    }
};
