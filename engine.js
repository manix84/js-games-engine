define([
    'jquery'
], function ($) {

    var gamesEngine = {
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
         * The containing element on the page.
         * @type {Object HTMLElement}
         */
        _gameContainer: document,

        /**
         * Function run with each tick.
         */
        _tickerEvent: function () {
            window.console.count('tick');
        },

        /**
         * Function to run when the ticker stops. (EG: Start Screen, Game Over)
         */
        _stopEvent: function () {
            window.console.info('Stop!');
        },

        /**
         * Start the ticker, and anything attached too it.
         */
        _start: function () {
            var that = this;

            this._ticker = window.setInterval(function () {
                that._tickerEvent();
            }, 1000 / this._fps);
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {[type]} [description]
         */
        _stop: function () {
            window.clearInterval(this._ticker);
            this._ticker = null;
            this._stopEvent();
        }
    };

    return gamesEngine;
});