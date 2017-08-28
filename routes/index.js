var express = require('express');
var router = express.Router();

var config = require('../config.js')
var jwt = require('jsonwebtoken')
/**
 * default route
 * @constructor
 * @param {string} route 
 * @param {function()} callback for request and response
 */
router.get('/', function(req, res){
	res.send('hello use /login to login and get a token, /patch to apply JSON patch, /thumbnail to get the thumbnail')
})
router.post('/login',function(req,res){
  var login = require('../modules/login.js')(req,res)
})

/* ----------------------- Restricted Routes ----------------------*/

/**
 * protected routes
 * importing the jwt verification file
 */
var auth = require('./../modules/auth.js');
/**
 * defining routes
 * importing different modules according to routes 
 */
router.post('/patch',auth,function(req, res) {
	var patch = require('../modules/patch.js')(req,res);
});

router.post('/thumbnail',auth,function(req, res) {
	var thumb = require('../modules/thumb.js')(req,res)
});

module.exports = router;