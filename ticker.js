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
         * User defined function to be run whenever their is a tick.
         * @private
         * @type {Function}
         */
        _callback: null,

        /**
         * Number of frames per second.
         * @type {Number}
         */
        fps: 30,

        /**
         * Track certain statistics about the process.
         * @type {Object}
         */
        _tracking: {
            /**
             * Current frame number, to be passed in the callbacks.
             * @private
             * @type {Number}
             */
            currentFps: 0,
            currentFrame: 0,
            executionTime: 0,
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
         * Start the ticker, and anything attached too it.
         * @param {Function} [callback] - User defined function to run on tick. This is only optional if a callback has
         *                                already been set.
         * @return {Object} Ticker parent object
         */
        start: function (callback) {
            if (callback) {
                this._callback = callback;
                this._currentFrame = 0;
            } else if (!this._callback) {
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