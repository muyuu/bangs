"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (definition) {
    "use strict";

    var moduleName = "bangs";

    var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" && global.global === global && global;

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})(function (root, $) {
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------

    var isUndefined = function isUndefined(obj) {
        return obj === void 0;
    };

    // -------------------------------------------------------
    // module
    // -------------------------------------------------------

    /**
     * module factory
     * this module is dependent on jQuery
     * @prop {string} rootElement default root element class or id
     * @prop {array} instance
     * @namespace
     */
    var factory = function factory(param) {

        var rootElement = ".js-bangs";
        var opt = !isUndefined(param) ? param : {};

        var $list;
        if (isUndefined(opt.root)) $list = $(rootElement);
        if (!isUndefined(opt.root)) $list = opt.root instanceof $ ? param.root : $(param.root);

        var length = $list.length;
        var mappedList = [];
        for (var i = 0; i < length; i++) {
            mappedList[i] = new Module(opt, $list[i]);
        }
        return mappedList;
    };

    /**
     * constructor
     * @type {Function}
     */
    function Module(opt, moduleRoot) {

        // options
        this.opt = {
            item: !isUndefined(opt.item) ? opt.item : ".js-bangs__item",
            breakPoint: !isUndefined(opt.breakPoint) ? opt.breakPoint : 640,

            // callback
            onChange: !isUndefined(opt.onChange) ? opt.onChange : null
        };

        // elements
        this.$root = $(moduleRoot);
        this.$item = this.$root.find(this.opt.item);

        // state
        this.calcedHeight = 0;
        this.resizeTimer = null;

        this.init();
    }

    Module.prototype.init = function () {
        this.setLoadEvent();
        this.setResizeEvent();
        return this;
    };

    Module.prototype.resetHeight = function () {
        this.$item.css({ height: "" });
        this.calcedHeight = 0;
        return this;
    };

    Module.prototype.setHeight = function () {
        var height = 0;
        $.each(this.$item, function (item, val) {
            var currentHeight = parseInt($(val).height(), 10);
            height = Math.max(height, currentHeight);
        });

        this.calcedHeight = height;
        return this;
    };

    Module.prototype.render = function () {
        this.$item.height(this.calcedHeight);
        return this;
    };

    Module.prototype.adjust = function () {
        this.resetHeight().setHeight().render();
        return this;
    };

    Module.prototype.setLoadEvent = function () {
        var _this = this;

        $(window).on("load", function () {
            _this.setLoadEventHandler();
        });
    };

    Module.prototype.setLoadEventHandler = function () {
        this.adjust();
        return this;
    };

    Module.prototype.setResizeEvent = function () {
        var _this2 = this;

        $(window).on("resize", function () {
            _this2.resizeEventHandler();
        });
    };

    Module.prototype.resizeEventHandler = function () {
        var _this3 = this;

        if (this.resizeTimer !== false) clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(function () {
            _this3.adjust();
        }, 200);
    };

    return factory;
});