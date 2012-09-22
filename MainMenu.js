define(function () {

    var MainMenu = function (options) {
        var property;
        for (property in options) {
            if (options.hasOwnProperty(property) && this._options.hasOwnProperty(property)) {
                this._options[property] = options[property];
            }
        }
    };
    MainMenu.prototype = {
        _options: {}
    };
    return MainMenu;
});
