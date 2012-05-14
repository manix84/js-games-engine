define(function () {
    /**
     * Games Engine v1.0 - Sound
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} url - Sets the audio url.
     * @param {Object} options - Options for the current sound.
     * @return {Object} Ticker parent object
     * @constructor
     */
    var Sound = function (url, options) {
        var options_default = {
                loop: false
            },
            property;

        if (typeof url === 'undefined') {
            throw new Error('You must set an audio url.');
        }

        for (property in options) {
            if (options.hasOwnProperty(property)) {
                options_default[property] = options[property];
            }
        }

        this._file = new Audio(url);
        this._file.load();
        this._file.preload = 'auto';
        this._file.autoplay = false;
        this._file.controls = false;

        this._file.addEventListener('canplay', this._canPlayListener, true);

        return this;
    };

    Sound.prototype = {

        /**
         * Prevents audio from playing.
         * @type {Boolean}
         */
        _isMuted: false,

        _canPlayListener: function () {
            this.canPlay = true;
        },

        /**
         * Mute this sound.
         * @param  {Boolean} [mute] - Mute current sound? If not set, will toggle.
         * @return {Object} Sound parent object
         */
        mute: function (mute) {
            if (typeof mute === 'undefined') {
                this._isMuted = !this._isMuted;
            } else {
                this._isMuted = !!mute;
            }
            return this;
        },

        /**
         * Play sound
         * @return {Object} Sound parent object
         */
        play: function () {
            if (!this._isMuted) {
                if (!this._file.canPlay) {
                    this._file.addEventListener('canplay', function () {
                        this.play();
                    }, false);
                } else {
                    this._file.play();
                }
            }
            return this;
        },

        /**
         * Pause audio file.
         * @return {Object} Sound parent object
         */
        pause: function (name) {
            this._file.pause();
            return this;
        },

        /**
         * Stop and remove the sound file from play and pause.
         * @return {Object} Sound parent object
         */
        stop: function () {
            this._file.pause();
            if (this._file.currentTime > 0) {
                this._file.currentTime = 0;
            }
            return this;
        },

        destroy: function () {
            this.stop();
            this._file.removeEventListener('canplay', this._canPlayListener, true);
            delete this._file;
        }
    };

    return Sound;
});