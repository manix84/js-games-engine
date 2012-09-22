define(function () {

    /**
     * Games Engine v1.0 - Graphics
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {String} element - Dom element object you wish to put the canvas inside of.
     * @param {Object} [options] - Options for the current ticker. Available options include:
     * @return {Object} Grapics parent object
     * @constructor
     */
    var Graphics = function (element, options) {
        if (!element || typeof element !== 'object') {
            throw new Error('Graphics error: Container element not supplied.');
        }
        var property = null;

        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }

        this._canvas = document.createElement('canvas');
        element.appendChild(this._canvas);

        this._canvas.innerHTML = this._options.supportError;
        this._canvasContext = this._canvas.getContext('2d');
    };

    Graphics.prototype = {
        _options: {
            supportError: (
                "<div style='padding:3px;background:#CCC'>" +
                    "<img src='images/supportError.png' style='position:relative;margin:7px' />" +
                    "<p>Looks like your browser doesn't support the HTML5 canvas.</p>" +
                    "<p>Please consider updating to a more modern browser such as <a href=''>Google Chrome</a> or <a href=''>Mozilla FireFox</a>.</p>" +
                "</div>"
            )
        },

        clear: function () {
            this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },

        getContext: function () {
            return this._canvasContext;
        }
    };

    return Graphics;
});





