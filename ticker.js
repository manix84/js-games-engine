define(function () {
    /**
     * Games Engine v1.0 - Ticker
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var ticker = {

        /**
         * Set Interval's unique id, so that it can be manipulated throughout the code.
         * @private
         * @type {Number}
         */
        _ticker: null,

        /**
         * Track certain statistics about the process.
         * @type {Object}
         */
        _tracking: {
            /**
             * Current FPS, stored.
             * @type {Number}
             */
            currentFps: 0,

            /**
             * Current frame number, to be passed in the callbacks.
             * @type {Number}
             */
            currentFrame: 0,

            /**
             * Last execution time, stored.
             * @type {Number}
             */
            executionTime: 0,

            /**
             * Last tick start epoch, stored.
             * @type {Number}
             */
            lastTickStart: 0
        },

        /**
         * Self perpetuating tick method. Can only be stopped with the stop command. Designed to stop callback stacking.
         * @private
         * @todo Need to look into adding a skip-frame ability.
         * @todo Should add a warning if FPS drops below requirements.
         */
        _tick: function () {
            var that = this,
                start, end, lastTickStart;

            this._ticker = window.setTimeout(function () {
                that._tick();
                start = new Date().getTime();
                that._tracking.currentFps = (1000 / (start - that._tracking.lastTickStart));
                that._tracking.lastTickStart = start;
                that._tracking.currentFrame++;

                that._callback({
                    fps: that._tracking.currentFps,
                    frame: that._tracking.currentFrame,
                    prevExecutionTime: that._tracking.executionTime
                });
                end = new Date().getTime();

                that._tracking.executionTime = ((start - that._tracking.lastTickStart) / 1000);

            }, (1000 / this.fps));
        },

        /**
         * User defined function to be run whenever their is a tick.
         * @private
         * @type {Function}
         */
        _callback: null,

        /**
         * Set the callback
         * @param {Function} callback - User defined function to run on tick.
         * @return {Object} Ticker parent object
         */
        setCallback: function (callback) {
            if (typeof callback === 'function') {
                this._callback = callback;
            }
        },

        /**
         * Number of frames per second.
         * @type {Number}
         */
        _fps: 30,

        /**
         * [setFps description]
         * @param {Number} fps - The Frames Per Second rate required.
         * @return {Object} Ticker parent object
         */
        setFps: function (fps) {
            if (!isNaN(fps) && fps > 0) {
                this._fps = fps;
            }
            return this;
        },

        /**
         * Start the ticker, and anything attached too it.
         * @return {Object} Ticker parent object
         */
        start: function () {
            if (!this._callback) {
                throw new Error('No callback set.');
            } else if (!!this._ticker) {
                throw new Error('Ticker already running.');
            }

            this._tracking.lastTickStart = new Date().getTime();
            this._tick();
            return this;
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {Object} Ticker parent object
         */
        stop: function () {
            window.clearTimeout(this._ticker);
            this._ticker = null;
            return this;
        }
    };

    return ticker;
});