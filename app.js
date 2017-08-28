var express = require('express');
var bodyParser = require('body-parser')

/**
 * creating the instance of server through constructor
 */
var app = express()

var config = require('./config.js')
/**
 * it defaults the inputs to application/x-www-form-urlencoded
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))
/**
 * setting the secret for token generation
 * @constructor 
 * @param {string} secret - for token generation
 * @param {string} key - of the object
 */
app.set('superSecret', config.secret)
/**
 * importing all the routes
 */
var routes = require('./routes/index.js');

app.use('/',routes);
app.use('/data', express.static('public'))

module.exports = app;