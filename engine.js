define(function () {

    var engine = {
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
        },

        /**
         * Sound effect handlers.
         * @type {Object}
         */
        soundEffect: {
            /**
             * A containing list of all available sound effects.
             * @type {Object}
             */
            _list: {},

            /**
             * [_volume description]
             * @type {Number}
             */
            _volume: 7,

            /**
             * [add description]
             * @param {[type]} name [description]
             * @param {[type]} url [description]
             */
            add: function (name, url) {
                var audioTag = document.createElement('audio');

                this._list[name] = audioTag;
            },

            /**
             * [remove description]
             * @param  {[type]} name [description]
             * @return {[type]}  [description]
             */
            remove: function (name) {
                this._list[name] = null;
                delete this._list[name];
            },

            play: function (name) {
                var audioTag = this._list[name];
                audioTag.currentTime = 0;
                audioTag.preload = true;
                audioTag.volume = this._volume;
            }
        },

        music: {
            /**
             * A containing list of all available music.
             * @type {Object}
             */
            _list: {},

            /**
             * [_volume description]
             * @type {Number}
             */
            _volume: 7,

            /**
             * [add description]
             * @param {[type]} name [description]
             * @param {[type]} url [description]
             */
            add: function (name, url) {
                var audioTag = document.createElement('audio');

                this._list[name] = audioTag;
            },

            /**
             * [remove description]
             * @param  {[type]} name [description]
             * @return {[type]}  [description]
             */
            remove: function (name) {
                this._list[name] = null;
                delete this._list[name];
            },

            /**
             * [play description]
             * @param  {String} name [description]
             * @param  {Object} options [description]
             */
            play: function (name, options) {
                options = options || {
                    fadeIn: false,
                    fadeOut: false,
                    loop: true,
                    rewindToStart: false
                };

                var audioTag = this._list[name];
                audioTag.currentTime = 0;
                audioTag.volume = this._volume;
            }

        }
    };

    return engine;
});