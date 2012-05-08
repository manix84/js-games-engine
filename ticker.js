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
         * User defined functions to be run whenever their is a tick.
         * @private
         * @type {Array}
         */
        _callbacks: [],

        /**
         * Push callback into tick callback list, to be called when the ticker ticks.
         * @param {Function} callback - User defined function to be pushed onto the tickerCallbacks array.
         * @return {Object} Ticker parent object
         */
        onTick: function (callback) {
            this._callbacks.push(callback);
            return this;
        },

        /**
         * Number of frames per second.
         * @type {Number}
         */
        fps: 30,

        /**
         * Current frame number, to be passed in the callbacks.
         * @type {Number}
         */
        _currentFrame: 0,

        /**
         * Self perpetuating tick method. Can only be stopped with the stop command. Designed to stop callback stacking.
         * @todo Need to look into adding a skip-frame ability.
         * @todo Add FPS tracking, to show true FPS in results.
         * @todo Should add a warning if FPS drops below requirements.
         */
        _tick: function () {
            var that = this;

            this._ticker = window.setTimeout(function () {
                that._currentFrame++;
                var i = 0;
                for (; i < that._callbacks.length; i++) {
                    that._callbacks[i]({
                        fps: that.fps,
                        actualFps: that.fps,
                        frame: that._currentFrame,
                        secondsSinceStart: (that._currentFrame / that.fps)
                    });
                }
                that._tick();
            }, (1000 / this.fps));
        },

        /**
         * Start the ticker, and anything attached too it.
         * @return {Object} Ticker parent object
         */
        start: function () {
            this._currentFrame = 0;
            this._tick();
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