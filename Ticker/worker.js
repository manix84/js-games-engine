var ticker = {
        /**
         * Self perpetuating tick method. Can only be stopped with the stop command. Designed to stop callback stacking.
         * @private
         * @todo Need to look into adding a skip-frame ability.
         */
        _tick: function () {
            var that = this;
            this._ticker = self.setTimeout(function () {
                that._tick();
                that._callback();
            }, (1000 / this._fps));
        },

        start: function () {
            this._tick();
        },

        /**
         * Stop the ticker, and anything attached too it.
         * @return {Object} Ticker parent object
         */
        stop: function () {
            if (!!this._ticker) {
                self.clearTimeout(this._ticker);
                delete this._ticker;
            } else {
                throw new Error('Cannot stop ticker: Ticker isn\'t running.');
            }
            return this;
        }
    };

/**
 * Self executing function, which starts listening for a message from Ticker.
 */
(function () {
    // Listening for messages from Ticker
    self.addEventListener('message', function (event) {
        // Listening for event state
        switch (event.data.state) {
        case 'start':
            // Check for callsback and fps.
            if (!!event.data.callback && !!event.data.fps) {
                ticker._callback = event.data.callback;
                ticker._fps = event.data.fps;
                ticker.start();
            } else {
                throw new Error('Incomplete object sent.');
            }
            break;
        case 'stop':
            // Stop
            ticker.stop();
            break;
        }
    });
}());
