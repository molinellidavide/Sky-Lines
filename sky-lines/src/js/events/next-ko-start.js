/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['worker-container']) {
            context.top.active('worker-container');
            context.vms['worker-container'].init({mask: 'worker-box'});
        }
        if (!context.vms['worker-edit-tasks']) {
            context.vms['worker-box'].active('worker-edit-tasks');
            context.vms['worker-edit-tasks'].init({mask: 'task-control-container'});
        }
        context.vms['task-control-container'].init();
    };
};
