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
        fps: 60,

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

                that._tracking.currentFrame++;
                that._tracking.currentFps = (1000 / (start - that._tracking.lastTickStart));

                that._callback({
                    fps: that._tracking.currentFps,
                    frame: that._tracking.currentFrame,
                    executionTime: that._tracking.executionTime
                });
                end = new Date().getTime();

                that._tracking.executionTime = ((start - that._tracking.lastTickStart) / 1000);
                that._tracking.lastTickStart = start;

            }, (1000 / this.fps));
        },

        /**
         * Start the ticker, and anything attached too it.
         * @param {Function} callback - User defined function to run on tick.
         * @return {Object} Ticker parent object
         */
        start: function (callback) {
            if (callback) {
                this._tracking.lastTickStart = new Date().getTime();
                this._tracking.currentFps = this.fps;
                this._callback = callback;
                this._currentFrame = 0;
                this._tick();
            } else {
                // warning: No callback set.
            }
            return this;
        },

        /**
         * Pause and restart ticker
         * @return {Object} Ticker parent object
         */
        pauseToggle: function () {
            if (this._ticker) {
                this.stop();
            } else {
                this._tick();
            }
            return this;
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {Object} Ticker parent object
         */
        stop: function () {
            window.clearTimeout(this._ticker);
            return this;
        }
    };

    return ticker;
});