define([
    "Graphics/Sprite"
], function (Sprite) {

    /**
     * Games Engine v1.0 - Graphics/Sprite/Animated
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} src - Url destination for the sprite you want to appear.
     * @param {Object HTMLCanvasElement} canvas [description]
     * @param {Object} [options] - Options for the current ticker.
     * @return {Object} Animated Sprite parent object
     * @constructor
     */
    var Animated = function (src, canvas, destX, destY, options) {
        var property = null;
        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

        return this;
    };

    Animated.prototype = {

        /**
         * Draw the sprite frame.
         * @param {Number} posX - [description]
         * @param {Number} posY - [description]
         * @param {Number} frameStartY - [description]
         * @param {Number} frameStartY - [description]
         */
        drawFrame: function (posX, posY, frameStartX, frameStartY) {
            this._canvasContext.drawImage(
                this._image,
                posX, // Destination X
                posY, // Destination Y
                this._options.height, // Destination Height
                this._options.width, // Destination Width
                frameStartX, // Crop Starting X
                frameStartY, // Crop Starting Y
                this._options.height, // Crop Height
                this._options.width // Crop Width
            );
        }
    };

    return Animated;
});
