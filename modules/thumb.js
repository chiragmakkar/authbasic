var fs = require('fs');
var request = require('request');
var thumb = require('node-thumbnail').thumb;
/**
 * downloadImg function takes uri as input and downloads the image
 * @param {string} uri 
 * @param {*} file 
 * @param {*} callback 
 */
var downloadImg = function(uri, file, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(file)).on('close', callback);
  });
};
/**
 * generates a random alphanumeric name for the downloaded image
 * @param {number} length 
 */
function ImgCode(length) {
    var result = '';
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
/**
 * converts the downloaded image to thumbnail and returns it to the client
 * @param {*} req 
 * @param {*} res 
 */
var page = function(req,res) {
	if(req.body.uri) {
    var uri_link = req.body.uri;
  	var thumb_path = 'public/thumbnails/';
  	var uri_ext = uri_link.split('.').reverse()[0];
  	var uri_extr = ImgCode(11)+'.'+uri_ext;
  	var orig_path = 'public/original/'+uri_extr;

  	downloadImg(uri_link, orig_path, function(){
  		thumb({
  			source: orig_path, // could be a filename: dest/path/image.jpg
  			destination: thumb_path,
  			concurrency: 2,
  			suffix: '',
  			quiet: true,
  			width: 50,
  			height: 50
  		}, function(files, err, stdout, stderr) {
  			if(err) {
  				console.log(err);
  			}
  			else {
  				var results = {
  					"success": true,
  					"check": true,
  					"Original File":orig_path+'/'+uri_extr,
  					"Thumbnail":thumb_path+uri_extr
  				}
  				res.json(results);
  			}
  		});
  	});
  }
}

module.exports = page;
