module.exports = function (app, router) {

    // Routes order is important

    /**
     * Sends a Pong in response to a Ping. For plain api testing
     */
    router.get('/ping', function (req, res) {
        res.send('Pong');
    });

}
