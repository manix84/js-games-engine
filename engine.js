define(function () {

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
         * Function to run when the ticker stops. (EG: Start Screen, Game Over)
         */
        stopEvent: function () {
            window.console.info('Stop!');
        },

        /**
         * Start the ticker, and anything attached too it.
         * @param {Function} callback - Function that fires on each tick.
         */
        start: function (callback) {
            var that = this;

            this._ticker = window.setInterval(callback, (1000 / this._fps));
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {[type]} [description]
         */
        stop: function () {
            window.clearInterval(this._ticker);
            this._ticker = null;
            this._stopEvent();
        },

        /**
         * Sound effect handlers.
         * @type {Object}
         */
        sound: {
            /**
             * A containing list of all available sound effects.
             * @type {Object}
             */
            _list: {},

            /**
             * [add description]
             * @param {[type]} name [description]
             * @param {[type]} url [description]
             */
            add: function (name, url) {},

            /**
             * [remove description]
             * @param  {[type]} name [description]
             * @return {[type]}  [description]
             */
            remove: function (name) {},

            play: function (name) {}
        }
    };

    return gamesEngine;
});