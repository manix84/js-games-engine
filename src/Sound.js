define(function () {
    /**
     * Games Engine v1.0 - Sound
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String|Array} urls - Sets the audio source urls.
     * @param {Object} options - Options for the current sound.
     * @return {Object} Ticker parent object
     * @constructor
     */
    var Sound = function (urls, options) {
        var options_default = {
                loop: false
            },
            i = 0,
            property, source;

        if (typeof urls === 'undefined') {
            throw new Error('You must set an audio url.');
        } else if (typeof urls === 'string') {
            urls = [urls];
        }

        for (property in options) {
            if (options.hasOwnProperty(property)) {
                options_default[property] = options[property];
            }
        }

        this._theSound = new Audio();
        for (; i < urls.length; i++) {
            window.console.log('Adding source:', urls[i]);
            source = document.createElement('source');
            source.src = urls[i];

            this._theSound.appendChild(source);
        }

        this._theSound.load();
        this._theSound.loop = !!options_default.loop;
        this._theSound.preload = 'auto';
        this._theSound.autoplay = false;
        this._theSound.controls = false;

        this._theSound.addEventListener('canplay', this._canPlayListener, true);

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
                if (!this._theSound.canPlay) {
                    this._theSound.addEventListener('canplay', function () {
                        this.play();
                    }, false);
                } else {
                    this._theSound.play();
                }
            }
            return this;
        },

        /**
         * Pause audio file.
         * @return {Object} Sound parent object
         */
        pause: function (name) {
            this._theSound.pause();
            return this;
        },

        /**
         * Stop and remove the sound file from play and pause.
         * @return {Object} Sound parent object
         */
        stop: function () {
            this._theSound.pause();
            if (this._theSound.currentTime > 0) {
                this._theSound.currentTime = 0;
            }
            return this;
        },

        destroy: function () {
            this.stop();
            this._theSound.removeEventListener('canplay', this._canPlayListener, true);
            delete this._theSound;
        }
    };

    return Sound;
});