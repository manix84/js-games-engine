define(function () {

    /**
     * Games Engine v1.0 - Graphics/Sprite
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} src - Url destination for the sprite you want to appear.
     * @param {Object HTMLCanvasElement} canvas [description]
     * @param {Number} height - Sprite height
     * @param {Number} width - Sprite width
     * @param {Object} [options] - Options (see: this._options for full list).
     * @return {Object} Animated Sprite parent object
     * @constructor
     */
    var Sprite = function (src, canvas, height, width, options) {
        // Check for sprite source file
        if (!src || typeof src !== 'string') {
            throw new Error('Sprite Error: No source (src) file specified.');
        }
        this._image = new Image();
        this._image.src = src;

        // Check for canvas to place sprite onto.
        if (!canvas || canvas.toString() !== '[object HTMLCanvasElement]') {
            throw new Error('Sprite Error: Can\'t find the canvas element.');
        }
        this._canvas = canvas;
        this._canvasContext = this._canvas.getContext('2d');

        if (!height || isNaN(height)) {
            throw new Error('Sprite Error: No height set.');
        }
        this._height = height;

        if (!width || isNaN(width)) {
            throw new Error('Sprite Error: No width set.');
        }
        this._width = width;

        // Update this._options with any passed by the user.
        var property = null;
        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

        return this;
    };

    Sprite.prototype = {

        /**
         * Default options set
         * @type {Object}
         */
        _options: {
        },

        /**
         * Sprite image container
         * @type {object HTMLImageElement}
         */
        _image: null
    };

    return Sprite;
});
