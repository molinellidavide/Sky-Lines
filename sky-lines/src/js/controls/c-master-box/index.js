/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;

    self.context = params.context;
    self.active = ko.observable(undefined);

    self.screen = ko.observable(undefined);

    self.mobile_size = function(){

      if($(window).width() < 768){

        $(".li-nav").attr("data-target",".navbar-collapse");
      }

      if($(window).width() >= 768){

        $(".li-nav").removeAttr("data-target");
      }
    };

    self.init = function (options) {
        options = options || {};
        self.active(self.defaultChild);

        if (self.defaultChild && options.mask !== self.defaultChild) {
            self.context.vms[self.defaultChild].init(options);

        }
    };

    self.landmark = function (id) {
        self.active(id);
        self.context.vms[id].init();
    };
    self.trigger = function (id) {
        self.context.events[id](self.context);
    };
}

ViewModel.prototype.id = 'master-box';
ViewModel.prototype.defaultChild = 'master-basic-information-container';
exports.register = function () {
    ko.components.register('c-master-box', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                params.context.runningActionsByContainer[vm.id] = [];
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    params.context.runningActionsByContainer[vm.id].forEach(function (promise) {
                        promise.cancel();
                    })
                    delete params.context.runningActionsByContainer[vm.id];
                    delete params.context.vms[vm.id];
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
