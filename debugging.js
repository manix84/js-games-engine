define(function () {
    /**
     * Games Engine v1.0 - Debugging
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var debugging = {
        enable: true,
        debug: function () {
            var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
            Array.prototype.reverse.call(arguments);
            Array.prototype.push.call(arguments, displayName);
            Array.prototype.reverse.call(arguments);
            if (!!window.console.debug && !!this.enable) {
                window.console.debug.apply(window.console, arguments);
            }
        },
        info: function () {
            var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
            Array.prototype.reverse.call(arguments);
            Array.prototype.push.call(arguments, displayName);
            Array.prototype.reverse.call(arguments);
            if (!!window.console.info && !!this.enable) {
                window.console.info.apply(window.console, arguments);
            }
        },
        warn: function () {
            var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
            Array.prototype.reverse.call(arguments);
            Array.prototype.push.call(arguments, displayName);
            Array.prototype.reverse.call(arguments);
            if (!!window.console.warn && !!this.enable) {
                window.console.warn.apply(window.console, arguments);
            }
        },
        addDisplayNames: function (classObj, baseName) {
            var objName;

            for (objName in classObj) {
                if (classObj.hasOwnProperty(objName) && !!classObj[objName]) {
                    if (typeof classObj[objName] === 'function') {
                        classObj[objName].prototype = {
                            displayName: baseName + '.' + objName
                        };
                    }
                    if (typeof classObj[objName] === 'object' && objName !== 'prototype') {
                        this.addDisplayNames(classObj[objName], baseName + '.' + objName);
                    }
                }
            }
        }
    };

    return debugging;
});