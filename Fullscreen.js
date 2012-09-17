define(function () {

    /**
     * Games Engine v1.0 - Fullscreen
     * @author  Rob Taylor [manix84@gmail.com]
     * @param {Function} element - User defined element to full screen
     * @param {Object} options - Options for the current ticker.
     * @return {Object} Ticker parent object
     * @constructor
     */
    var Fullscreen = function (element, options) {

        return this;
    };

    Fullscreen.prototype = {

        /**
         * Self perpetuating tick method. Can only be stopped with the stop command. Designed to stop callback stacking.
         * @private
         * @todo Need to look into adding a skip-frame ability.
         */
        toggle: function () {

            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            } else {
            }
        },

        enter: function () {
            var func = document.documentElement.requestFullScreen ||
                    document.documentElement.mozRequestFullScreen ||
                    document.documentElement.webkitRequestFullScreen ||
                    function () {};

            func(Element.ALLOW_KEYBOARD_INPUT);
        },

        exit: function () {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    };

    return Fullscreen;
});
