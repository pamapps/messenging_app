'use strict';

var path = require('path');
var moment = require('moment');
var util = require('util');

/**
 * Module that provides a simple wrapper over console logging.
 *
 * @param file The name of the module this logger is configured for.
 * @constructor Creates a new logger for a particular module.
 */
function Log(file) {
    if (file) {
        this.file = path.basename(file, path.extname(file));
    }
}

Log.prototype.info = function (message) {
    console.log(this._message(message));
};

Log.prototype.debug = function (message) {
    console.log(this._message(message));
};

Log.prototype.error = function (message) {
    console.error(this._message(message));
};

Log.prototype._message = function (message) {
    var time = moment().format('YYYY-DD-MM HH:mm:ss.SSS');
    return util.format("[%s] %s - %s", time, this.file, message);
};

module.exports = Log;