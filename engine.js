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

        _tickerCallbacks: [],

        onTick: function () {

        },

        /**
         * Start the ticker, and anything attached too it.
         * @param {Function} callback - Function that fires on each tick.
         */
        start: function (callback) {
            var i = 0,
                count = 0,
                that = this;

            this._ticker = window.setInterval(function () {
                for (; i < that._tickerCallbacks.length; i++) {
                    that._tickerCallbacks[i]({
                        fps: that._fps,
                        tickCount: count++,
                        secondsSinceStart: (count % that._fps)
                    });
                }
            }, (1000 / this._fps));
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
                engine.console.debug('Adding "' + name + '":', url);
                var audioElement = new Audio(url);

                audioElement.load();
                audioElement.preload = 'auto';
                audioElement.controls = false;

                this._list[name] = audioElement;
            },

            /**
             * [play description]
             * @param  {String} name - The audio reference name. See: engine.audio.add
             * @param  {Boolean} loop - Should the audio item play in a loop.
             * @return {[type]}  [description]
             */
            play: function (name, loop) {
                var audioElement,
                    that = this;
                if (!!this._list[name]) {
                    engine.console.debug('Playing "' + name + '"', (loop ? 'continuously' : 'once'));

                    this._list[name].loop = loop || false;
                    this._list[name].currentTime = 0;
                    that._list[name].play();
                } else {
                    engine.console.warn('"' + name + '" does not exist.');
                }
            },

            /**
             * [pause description]
             * @param  {[type]} name [description]
             * @return {[type]}  [description]
             */
            pause: function (name) {
                if (!!this._list[name]) {
                    engine.console.debug('Paused "' + name + '"');
                    this._list[name].pause();
                } else {
                    engine.console.warn('"' + name + '" does not exist.');
                }
            },

            /**
             * Stop and remove the sound file from play and pause.
             * @param  {String} name - The audio reference name. See: engine.audio.add
             * @return {[type]}  [description]
             */
            stop: function (name) {
                if (this._list[name]) {
                    engine.console.debug('Stopped "' + name + '"');
                    this._list[name].pause();
                } else {
                    engine.console.warn('"' + name + '" isn\'t playing');
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