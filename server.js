var http = require('http');

var app = require('./app');

var server = http.createServer(app);

var port = process.env.PORT || 3000;
/**
 * starts the server at port 3000
 * @constructor
 * @param {number} port - port number at which the server is to be started
 * @param {function()}
 */
server.listen(port, function(){
	console.log('Server listening on port '+port);
});

module.exports = server;