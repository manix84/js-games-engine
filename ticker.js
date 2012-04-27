define(function () {
    /**
     * Games Engine v1.0 - Ticker
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var ticker = {

        /**
         * Set Interval's unique id, so that it can be manipulated throughout the code.
         * @type {Number}
         */
        _ticker: null,

        /**
         * User defined functions to be run whenever their is a tick.
         * @type {Array}
         */
        _callbacks: [],

        /**
         * Push callback into tick callback list, to be called when the ticker ticks.
         * @param {Function} callback - User defined function to be pushed onto the tickerCallbacks array.
         */
        onTick: function (callback) {
            this._callbacks.push(callback);
        },

        /**
         * Number of frames per second.
         * @type {Number}
         */
        fps: 30,

        /**
         * Start the ticker, and anything attached too it.
         */
        start: function () {
            var frame = 0,
                that = this;

            this._ticker = window.setInterval(function () {
                frame = frame + 1;
                var i = 0;
                for (; i < that._callbacks.length; i++) {
                    that._callbacks[i]({
                        fps: that.fps,
                        frame: frame,
                        secondsSinceStart: (frame / that.fps)
                    });
                }
            }, (1000 / this.fps));
        },

        /**
         * Stop the ticker, and anything attached too it.
         */
        stop: function () {
            window.clearInterval(this._ticker);
        }
    };

    return ticker;
});