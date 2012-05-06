define(function () {
    /**
     * Games Engine v1.0 - Keyboard Interactions
     * @author  Rob Taylor [manix84@gmail.com]
     * @type {Object}
     */
    var keyboard = {
        /**
         * The list of key name with their corrisponding .
         * @private
         * @type {Object}
         */
        _map: {
            'BACKSPACE': 8,
            'TAB': 9,
            'RETURN': 13,
            'SPACE': 32,

            // Modifiers
            'SHIFT': 16,
            'CTRL': 17,
            'ALT': 18,

            'PAUSE': 19,
            'ESCAPE': 27,

            'PAGE_UP': 33,
            'PAGE_DOWN': 34,
            'END': 35,
            'HOME': 36,
            'INSERT': 45,
            'DELETE': 46,

            // Up, Down, Left, Right
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40,

            // 0-9
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57,

            // A-Z
            'A': 65,
            'B': 66,
            'C': 67,
            'D': 68,
            'E': 69,
            'F': 70,
            'G': 71,
            'H': 72,
            'I': 73,
            'J': 74,
            'K': 75,
            'L': 76,
            'M': 77,
            'N': 78,
            'O': 79,
            'P': 80,
            'Q': 81,
            'R': 82,
            'S': 83,
            'T': 84,
            'U': 85,
            'V': 86,
            'W': 87,
            'X': 88,
            'Y': 89,
            'Z': 90,

            // Windows/Mac/Clover/Super keys
            'SUPER': 91,
            'MENU': 93,

            // Number/Key pad buttons
            'KP_0': 96,
            'KP_INSERT': 96,
            'KP_1': 97,
            'KP_END': 97,
            'KP_2': 98,
            'KP_DOWN': 98,
            'KP_3': 99,
            'KP_PAGE_DOWN': 99,
            'KP_4': 100,
            'KP_LEFT': 100,
            'KP_5': 101,
            'KP_6': 102,
            'KP_RIGHT': 102,
            'KP_7': 103,
            'KP_HOME': 103,
            'KP_8': 104,
            'KP_UP': 104,
            'KP_9': 105,
            'KP_PAGE_UP': 105,
            'KP_STAR': 106,
            'KP_PLUS': 107,
            'KP_MINUS': 109,
            'KP_DOT': 110,
            'KP_DELETE': 110,
            'KP_SLASH': 111,

            // F1-F12
            'F1': 112,
            'F2': 113,
            'F3': 114,
            'F4': 115,
            'F5': 116,
            'F6': 117,
            'F7': 118,
            'F8': 119,
            'F9': 120,
            'F10': 121,
            'F11': 122,
            'F12': 123,

            // Lock Keys
            'CAPS_LOCK': 20,
            'NUM_LOCK': 144,
            'SCROLL_LOCK': 145,

            // Punctuation keys?
            'SEMI_COLON': 186,
            'EQUALS': 187,
            'COMMA': 188,
            'DASH': 189,
            'PERIOD': 190,
            'FORWARD_SLASH': 191,
            'GRAVE_ACCENT': 192,
            'OPEN_BRACKET': 219,
            'BACK_SLASH': 220,
            'CLOSE_BRAKET': 221,
            'SINGLE_QUOTE': 222
        },

        /**
         * Adds an event listener to a DOM Element.
         * @private
         * @param {html object} attachTo - The object to attach the event listener to.
         * @param {string} name - The event name, minus the "on".
         * @param {function} callback - The function to be called when the event fires.
         */
        _addListener: function (attachTo, eventName, callback) {
            eventName = eventName.toLowerCase();
            if (typeof attachTo.addEventListener === 'function') {
                attachTo.addEventListener(eventName, callback, false);
            }
            if (typeof attachTo.attachEvent === 'object') {
                attachTo.attachEvent('on' + eventName, callback);
            }
            attachTo['on' + eventName] = callback;
        },

        /**
         * Attach a key listener to the element.
         * --- PLEASE NOTE, THIS IS MASSIVELY INCOMPLETE ---
         *
         * @param  {String} elementId - Element ID to attach event too.
         * @param  {String} keyName - Key name, mapped from this._map. Case insensitive.
         * @param  {Function} callback - Function to run when key is pressed.
         * @param  {Boolean} requireModifier - [description]
         */
        attachListener: function (elementId, keyName, callback, requireModifier) {
            keyName = keyName.toUpperCase();
            var element = document.getElementById(elementId);

            this._addListener(element, 'keydown', function () {
                var modifier = false;
                if (event.shiftKey) {
                    modifier = 'SHIFT';
                } else if (event.altKey) {
                    modifier = 'ALT';
                } else if (event.ctrlKey) {
                    modifier = 'CTRL';
                }
                if (event.keyCode === this._map[keyName] &&
                        (!!requireModifier && !!modifier || !requireModifier)) {
                    callback(event, {
                        keyName: keyName,
                        modifier: modifier
                    });
                }
            });
        }
    };

    return keyboard;
});