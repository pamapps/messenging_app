'use strict';

var Promise = require('promise');

function PageModel (name) {
    this.promises = [];
    this.pending = 0;
    this.errors = [];
    this.pageModelName = name;
}

PageModel.create = function (name) {
    return new PageModel(name);
};

PageModel.prototype.add = function (field, promise) {
    this.promises.push({
        q: typeof promise === 'function' ? promise() : promise,
        field: field
    });

    this.pending++;
    return this;
};

// PageModel.prototype.build = function (model) {
//     var self = this;
//
//     return new Promise(function (resolve, reject) {
//         for (var i = 0; i < self.promises.length; i++) {
//             (function (idx) {
//                 var promise = self.promises[idx];
//
//                 promise.q.then(function (data) {
//                     if (model.strict) {
//                         if (model[promise.field] === undefined){
//                             self.errors.push('Page model member "' + promise.field + '" is not defined in strict mode.');
//                             self.pending--;
//                         }
//                         else {
//                             model[promise.field] = data;
//                             self.pending--;
//                         }
//                     }
//                     else {
//                         model[promise.field] = data;
//                         self.pending--;
//                     }
//
//                     if (self.pending === 0) {
//                         if (self.errors.length === 0) {
//                             resolve(model);
//                         }
//                         else {
//                             var prefix = "**************** PageModel.build() - ";
//                             console.log(prefix + 'Rejecting page model "' + (self.pageModelName || '?')  + '" with errors!');
//                             self.errors.forEach(function (msg) { console.log(prefix + msg); });
//                             resolve(undefined);
//                         }
//                     }
//                 });
//             })(i);
//         }
//     });
// };

module.exports = PageModel;