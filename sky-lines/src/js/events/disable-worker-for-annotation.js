/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
          'worker_url' : data['id'],
          'disable_url' : data['annotation']
        };
        var promise = context.actions['disable-worker']({filters: packet});
        context.runningActionsByContainer['manage-workers-modal'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['manage-workers-modal'].splice(
                context.runningActionsByContainer['manage-workers-modal'].indexOf(promise), 1
            );
            if (result.event) {
                context.events[result.event](context, result.data);
            }
        });
    };
};