define(function () {

    /**
     * Games Engine v1.0 - Graphics
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} domId - Dom element ID for the canvas
     * @param {Object} [options] - Options for the current ticker. Available options include:
     * @return {Object} Grapics parent object
     * @constructor
     */
    var Graphics = function (domId, options) {
        if (!domId || typeof domId !== 'string') {
            throw new Error('Graphics error: DomId missing.');
        }
        var property = null;

        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

        this._canvas = document.getElementById(domId);
        this._canvasContext = this._canvas.getContext('2d');
    };

    Graphics.prototype = {
        _options: {
        },

        clear: function () {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    };

    return Sprite;
});





