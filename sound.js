define(function () {
    /**
     * Games Engine v1.0 - Sound
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var sound = {
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
                this._list[name].loop = loop || false;

                if (!this.mute) {
                    if (!this._list[name].canPlay) {
                        this._list[name].addEventListener('canplay', function () {
                            this.play();
                        }, false);
                    } else {
                        this._list[name].play();
                    }
                }
            }
        },

        /**
         * Pause audio file.
         * @param  {String} name - The audio reference name. See: engine.audio.add
         */
        pause: function (name) {
            if (!!this._list[name]) {
                this._list[name].pause();
            }
        },

        /**
         * Stop and remove the sound file from play and pause.
         * @param  {String} name - The audio reference name. See: engine.audio.add
         */
        stop: function (name) {
            if (this._list[name]) {
                this._list[name].pause();
                if (this._list[name].currentTime > 0) {
                    this._list[name].currentTime = 0;
                }
            }
        }
    };

    return sound;
});