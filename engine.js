define(function () {

    var engine = {
        /**
         * Debugging on or off.
         * @type {Boolean}
         */
        _debugging: true,

        /**
         * Set Interval's unique id, so that it can be manipulated throughout the code.
         * @type {Number}
         */
        _ticker: null,

        /**
         * Number of frames per second.
         * @type {Number}
         */
        _fps: 30,

        /**
         * Start the ticker, and anything attached too it.
         * @param {Function} callback - Function that fires on each tick.
         */
        start: function (callback) {
            this._ticker = window.setInterval(callback, (1000 / this._fps));
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {[type]} [description]
         */
        stop: function () {
            window.clearInterval(this._ticker);
        },

        /**
         * Sound effect handlers.
         * @type {Object}
         */
        audio: {
            /**
             * A containing list of all available sound effects.
             * @type {Object}
             */
            _list: {},

            /**
             * Sound Effect Volume. 0-1
             * @type {Number}
             */
            _volume: 1,

            /**
             * Prevents audio from playing.
             * @type {Boolean}
             */
            _mute: false,

            /**
             * Add an audio tag to the page to be played.
             * @param {String} name - Assigns a name to the audio tag.  This is used as a reference for playing, etc.
             * @param {String} url - Sets the audio url.
             */
            add: function (name, url) {
                var audioElement;

                engine.console.debug('Adding "' + name + '":', url);

                this._list[name] = url;
            },

            /**
             * Remove the audio tag from the page.
             * @param {String} name - Name of the audio tag that needs removing.
             */
            remove: function (name) {
                this._list[name].parentNode.removeChild(this._list[name]);
                delete this._list[name];
            },

            play: function (name) {
                var audioElement;
                if (!!this._list[name]) {
                    engine.console.debug('[engine.audio.play]', 'playing "' + name + '"');
                    audioElement = new Audio(this._list[name]);
                    engine.console.debug('Playing "' + name + '"', (loop ? 'continuously' : 'once'));

                    audioElement.controls = false;
                    audioElement.play();
                } else {
                    engine.console.warn('"' + name + '" does not exist.');
                }
            }
        },

        console: {
            debug: function () {
                var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
                Array.prototype.reverse.call(arguments);
                Array.prototype.push.call(arguments, displayName);
                Array.prototype.reverse.call(arguments);
                if (!!window.console.debug && !!engine._debugging) {
                    window.console.debug.apply(window.console, arguments);
                }
            },
            info: function () {
                var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
                Array.prototype.reverse.call(arguments);
                Array.prototype.push.call(arguments, displayName);
                Array.prototype.reverse.call(arguments);
                if (!!window.console.info && !!engine._debugging) {
                    window.console.info.apply(window.console, arguments);
                }
            },
            warn: function () {
                var displayName = '[' + arguments.callee.caller.prototype.displayName + ']';
                Array.prototype.reverse.call(arguments);
                Array.prototype.push.call(arguments, displayName);
                Array.prototype.reverse.call(arguments);
                if (!!window.console.warn && !!engine._debugging) {
                    window.console.warn.apply(window.console, arguments);
                }
            }
        }
    },
    addDisplayNames = function (classObj, baseName) {
        var objName;

        for (objName in classObj) {
            if (classObj.hasOwnProperty(objName) && !!classObj[objName]) {
                if (typeof classObj[objName] === 'function') {
                    classObj[objName].prototype = {
                        displayName: baseName + '.' + objName
                    };
                }
                if (typeof classObj[objName] === 'object' && objName !== 'prototype') {
                    addDisplayNames(classObj[objName], baseName + '.' + objName);
                }
            }
        }
    };
    addDisplayNames(engine, 'engine');

    return engine;
});