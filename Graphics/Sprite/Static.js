define(function () {

    /**
     * Games Engine v1.0 - Graphics/Sprite/Static
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} src - Url destination for the sprite you want to appear.
     * @param {Object HTMLCanvasElement} canvas [description]
     * @param {Object} [options] - Options for the current ticker.
     * @return {Object} Ticker parent object
     * @constructor
     */
    var Static = function (src, canvas, destX, destY, options) {

        // Update this._options with any passed by the user.
        var property = null;
        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

        return this;
    };

    Static.prototype = {

        /**
         * Draw the sprite frame.
         * @param {Number} posX - [description]
         * @param {Number} posY - [description]
         */
        draw: function (posX, posY) {
            this._canvasContext.drawImage(
                this._image,
                posX, // Destination X
                posY, // Destination Y
                this._options.height, // Destination Height
                this._options.width // Destination Width
            );
        }
    };

    return Static;
});
