define(function () {

    /**
     * Games Engine v1.0 - Graphics/Sprite
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} src - Url destination for the sprite you want to appear.
     * @param {Object HTMLCanvasElement} canvas [description]
     * @param {Object} [options] - Options for the current ticker.
     * @return {Object} Ticker parent object
     * @constructor
     */
    var Sprite = function (src, canvas, destX, destY, options) {
        if (!src || typeof src !== 'string') {
            throw new Error('Sprite error: No source (src) file specified.');
        }
        this._image = new Image();
        this._image.src = src;

        if (!canvas || canvas.toString() !== '[object HTMLCanvasElement]') {
            throw new Error('Sprite error: Can\'t find the canvas element.');
        }
        this._canvas = canvas;
        this._canvasContext = this._canvas.getContext('2d');

        if (!destX || destX.isNaN) {
            this._destX = destX;
        }
        if (!destY || destY.isNaN) {
            this._destY = destY;
        }

        var property = null;
        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

    };

    Sprite.prototype = {
        _options: {
            height: 0,
            width: 0,
            animation: false

            // --- Animation Example ---
            // animation: {
            //     resetOnStop: true,
            //     frames: [
            //         {x: 0, y: 0},
            //         {x: 10, y: 10},
            //         {x: 20, y: 20},
            //         {x: 30, y: 30}
            //     ]
            // }
        },

        _image: null,

        draw: function (destX, destY, frameX, frameY) {
            if (!!this._options.animation) {
                this._canvasContext.drawImage(
                    this._image,
                    this._destX, // Destination X
                    this._destY, // Destination Y
                    this._options.height, // Destination Height
                    this._options.width, // Destination Width
                    this._options.animation.frames[0].x, // Crop Starting X
                    this._options.animation.frames[0].y, // Crop Starting Y
                    this._options.height, // Crop Height
                    this._options.width // Crop Width
                );
            } else {
                this._canvasContext.drawImage(
                    this._image,
                    this._destX,
                    this._destY
                );
            }
        },

        move: function (xPos, yPos) {
            if (player.counter === player.endStep) {
                player.sx = 0;
                player.counter = 0;
                player.nextStep = player.step;
            } else if (player.counter === player.nextStep) {
                if (player.sy === player.start.y) {
                    player.sx = 0;
                } else if (player.sy === yPos) {
                    player.sx += player.w;
                }
                player.sy = yPos;
                player.nextStep += player.step;
            }
            player.counter += 1;
        }
    };

    return Sprite;
});
