((definition)=>{
    "use strict";

    var moduleName = "bangs";

    var root = (typeof self === "object" && self.self === self && self) || (typeof global === "object" && global.global === global && global);

    if (typeof exports === "object"){
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})((root, $)=>{
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------
    const isUndefined = (obj)=>{ return obj === void 0; };

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
    const factory = (param)=>{

        var rootElement = ".js-bangs";
        var opt = !isUndefined(param) ? param : {};

        var $list;
        if (isUndefined(opt.root)) $list = $(rootElement);
        if (!isUndefined(opt.root)) $list = opt.root instanceof $ ? param.root : $(param.root);

        var length = $list.length;
        var mappedList = [];
        for (var i = 0; i < length; i++){
            mappedList[i] = new Module(opt, $list[i]);
        }
        return mappedList;
    };


    /**
     * constructor
     * @type {Function}
     */
    function Module(opt, moduleRoot){

        // options
        this.opt = {
            item      : !isUndefined(opt.item) ? opt.item : ".js-bangs__item",
            breakPoint: !isUndefined(opt.breakPoint) ? opt.breakPoint : 640,

            // callback
            onChange  : !isUndefined(opt.onChange) ? opt.onChange : null
        };

        // elements
        this.$root = $(moduleRoot);
        this.$item = this.$root.find(this.opt.item);

        // state
        this.calcedHeight = 0;
        this.resizeTimer = null;

        this.init();

    }


    Module.prototype.init = function(){
        this.setLoadEvent();
        this.setResizeEvent();
        return this;
    };


    Module.prototype.resetHeight = function(){
        this.$item.css({height: ""});
        this.calcedHeight = 0;
        return this;
    };


    Module.prototype.setHeight = function(){
        let height = 0;
        $.each(this.$item, (item, val)=>{
            let currentHeight = parseInt($(val).height(), 10);
            height = Math.max(height, currentHeight);
        });

        this.calcedHeight = height;
        return this;
    };


    Module.prototype.render = function(){
        this.$item.height(this.calcedHeight);
        return this;
    };


    Module.prototype.adjust = function(){
        this.resetHeight()
            .setHeight()
            .render();
        return this;
    };


    Module.prototype.setLoadEvent = function(){
        $(window).on("load", ()=>{
            this.setLoadEventHandler();
        });
    };


    Module.prototype.setLoadEventHandler = function(){
        this.adjust();
        return this;
    };


    Module.prototype.setResizeEvent = function(){
        $(window).on("resize", ()=>{
            this.resizeEventHandler();
        });
    };


    Module.prototype.resizeEventHandler = function(){
        if (this.resizeTimer !== false) clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(()=>{
            this.adjust();
        }, 200);
    };



    return factory;
});
