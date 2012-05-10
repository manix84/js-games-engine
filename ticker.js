define(function () {
    /**
     * Games Engine v1.0 - Ticker
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var ticker = function (callback) {
        // Collecting and saving unique callback.
        this._callback = callback;

        // Setting up unique FPS.
        this._fps = 30;

        // Setting up unique tracking ID.
        this._ticker = null;

        // Setting up unique tracking data.
        this._tracking = {
            currentFps: 0,
            currentFrame: 0,
            executionTime: 0,
            lastTickStart: 0
        };
    };

    ticker.prototype = {

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

            }, (1000 / this._fps));
        },

        /**
         * [setFps description]
         * @param {Number} fps - The Frames Per Second rate required.
         * @return {Object} Ticker parent object
         */
        setFps: function (fps) {
            if (!isNaN(fps) && fps > 0 && fps <= 1000) {
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