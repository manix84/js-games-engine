define(function () {
    /**
     * Games Engine v1.0
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var engine = {

        /**
         * Set Interval's unique id, so that it can be manipulated throughout the code.
         * @type {Number}
         */
        _ticker: null,

        /**
         * User defined functions to be run whenever their is a tick.
         * @type {Array}
         */
        _tickerCallbacks: [],

        /**
         * Push callback into tick callback list, to be called when the ticker ticks.
         * @param {Function} callback - User defined function to be pushed onto the tickerCallbacks array.
         */
        onTick: function (callback) {
            this._tickerCallbacks.push(callback);
        },

        /**
         * Number of frames per second.
         * @type {Number}
         */
        fps: 30,

        /**
         * Start the ticker, and anything attached too it.
         * @param {Function} callback - Function that fires on each tick.
         */
        start: function (callback) {
            var frame = 0,
                that = this;

            this._ticker = window.setInterval(function () {
                frame = frame + 1;
                var i = 0;
                for (; i < that._tickerCallbacks.length; i++) {
                    that._tickerCallbacks[i]({
                        fps: that.fps,
                        frame: frame,
                        secondsSinceStart: (frame / that.fps)
                    });
                }
            }, (1000 / this.fps));
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
             * Prevents audio from playing.
             * @type {Boolean}
             */
            mute: false,

            /**
             * Add an audio tag to the page to be played.
             * @param {String} name - Assigns a name to the audio tag.  This is used as a reference for playing, etc.
             * @param {String} url - Sets the audio url.
             */
            add: function (name, url) {
                engine.console.debug('Adding "' + name + '",', url);
                var audioElement = new Audio(url);

                audioElement.addEventListener('canplay', function () {
                    this.prototype = {
                        canPlay: true
                    };
                }, true);

                audioElement.load();
                audioElement.preload = 'auto';
                audioElement.controls = false;

                this._list[name] = audioElement;
            },

            /**
             * [play description]
             * @param  {String} name - The audio reference name. See: engine.audio.add
             * @param  {Boolean} loop - Should the audio item play in a loop.
             */
            play: function (name, loop) {
                var audioElement,
                    that = this;

                if (!!this._list[name]) {
                    engine.console.debug('Playing "' + name + '"', (loop ? 'continuously' : 'once'));

                    this._list[name].loop = loop || false;

                    if (!this.mute) {
                        if (!this._list[name].canPlay) {
                            this._list[name].addEventListener('canplay', function () {
                                this.play();
                            }, false);
                        } else {
                            this._list[name].play();
                        }
                    } else {
                        engine.console.warn('"Audio is muted.');
                    }
                } else {
                    engine.console.warn('"' + name + '" does not exist.');
                }
            },

            /**
             * Pause audio file.
             * @param  {String} name - The audio reference name. See: engine.audio.add
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
             */
            stop: function (name) {
                if (this._list[name]) {
                    engine.console.debug('Stopped "' + name + '"');
                    this._list[name].pause();
                    if (this._list[name].currentTime > 0) {
                        this._list[name].currentTime = 0;
                    }
                } else {
                    engine.console.warn('"' + name + '" isn\'t playing');
                }
            }
        },

        console: {
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