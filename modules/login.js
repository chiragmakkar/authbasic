var jwt = require('jsonwebtoken')

var config = require('../config.js')

var app = require('../app.js')
/**
 * checkUser function for validated login
 * takes username and password as input, creates a jwt based on payload
 * @param {*} req 
 * @param {*} res 
 */
var checkUser = function(req,res) {
    if(req.body.username && req.body.password) {
      var data = {
				"username":req.body.username,
				"password":req.body.password,
      }
      var token = jwt.sign(data, app.get('superSecret'), {
					     expiresIn: 86400 // expires in 24 hours
			});

      res.json({
			    success: true,
			    message: 'Authenticated',
			    token: token
			});
    }
    else {
      res.json({
			    success: false,
			    message: 'Username/Password empty.'
			});
    }
}

module.exports = checkUser
