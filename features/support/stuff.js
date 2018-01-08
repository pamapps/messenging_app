'use strict';

var Log = require('../support/log');
var log = new Log(__filename);


function trim(string) {
    return string.replace(/^\s*(.*)$/, "$1").replace(/^(.*?)\s*$/, "$1");
}

function assert(truth, message, callback) {
    if (!!truth) {
        return;
    }

    if (typeof message !== 'string') {
        message = "assert failed";
    }

    log.info("assert error! " + message);

    if (typeof callback === 'function') {
        callback(message);
    }
    else if (typeof assert.callback === 'function') {
        assert.callback(message);
    }

    assert.callback = undefined;
    throw message;
}

assert.ok = function(truth, message, callback) {
    assert(truth, message, callback);
};

assert.equals = function(object1, object2, message, callback) {
    assert(object1 === object2, message || "arguments are not equal", callback);
};

assert.equal = function(object1, object2, message, callback) {
    assert.equals(object1, object2, message || "arguments are not equal", callback);
};

assert.notEquals = function(object1, object2, message, callback) {
    assert(object1 !== object2, message || "arguments are equal", callback);
};

assert.notEqual = function(object1, object2, message, callback) {
    assert.notEquals(object1, object2, message, callback);
};

assert.callback = undefined;



function assert(truth, message, callback) {
    if (!!truth) {
        return;
    }

    if (typeof message !== 'string') {
        message = "assert failed";
    }

    log.info("assert error! " + message);

    if (typeof callback === 'function') {
        callback(message);
    }
    else if (typeof assert.callback === 'function') {
        assert.callback(message);
    }

    assert.callback = undefined;
    throw message;
}

assert.ok = function(truth, message, callback) {
    assert(truth, message, callback);
};

assert.equals = function(object1, object2, message, callback) {
    assert(object1 === object2, message || "arguments are not equal", callback);
};

assert.equal = function(object1, object2, message, callback) {
    assert.equals(object1, object2, message || "arguments are not equal", callback);
};

assert.notEquals = function(object1, object2, message, callback) {
    assert(object1 !== object2, message || "arguments are equal", callback);
};

assert.notEqual = function(object1, object2, message, callback) {
    assert.notEquals(object1, object2, message, callback);
};

assert.callback = undefined;



module.exports = {

    // remove leading and trailing spaces from a string
    trim: trim,

    assert: assert
};