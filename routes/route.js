var multer  = require('multer')
var jwt = require('express-jwt')
var ssl = require('ssl-key-match')
var async = require('async')
var fs = require('fs')
var crypto = require('crypto')
var request = require("request")

var	pageRouter = require( './module/page.js' )
var	apiRouter = require(  './module/api.js' )

var config = require( __base+'server/config/env.js' )

// var jwt_secret = require( __base+'jwt_secret.json' )


// multer setting
var storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, './upload')
  },

  filename: function (req, file, cb) {

  	var siteid = req.body.siteid

    cb(null, siteid + '-' + file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

// jwt setting
var cookieToken = ""

// var Auth = jwt({
// 		secret: jwt_secret.secret,
// 		credentialsRequired: false,

// 		getToken: function fromHeaderOrQuerystring (req) {

// 			var token = null;
		
// 			// query string
// 			if(req.query.token){
// 				cookieToken = req.query.token
// 				return req.query.token
// 			}

// 			// cookies
// 		    if (req.headers.cookie) {
// 		        req.headers.cookie.split(';').forEach(function( cookie ){

// 		        	var parts = cookie.split('=')

// 		        	if(parts[0].trim() === 'token' ){
// 		        		// console.log(parts[1].trim())
// 		        		token = parts[1]
// 		        	}
// 		        })
// 		    }

// 		    return token
// 		}
// 	})

function authUser( user ){

	// user is undefined ?
	if(!user) return false;

  // user is a customer ?
	if( user.cid === '' ) return false;

	// expired time 
	if( user.exp < new Date().getTime() / 1000 ) return false;

	// is a super user ?
	if (new RegExp("admin|monitor").test( user.roles )) return true;

  // user has scopes
	if( !user.scopes || !user.scopes.ap) return false;

	return true;
}

module.exports = function( app ){

	// app.all('*', Auth, function( req, res, next ){

	// 	if( authUser(req.user) ){

	// 		console.log(req.user);

	// 		if(cookieToken !== ""){

	// 			if(process.env.NODE_ENV !== "production")
	// 				res.cookie('token', cookieToken, { expires: new Date(Date.now() + 86400000), httpOnly: false })
				
	// 			cookieToken = ""
	// 			console.log('set cookie!!!!!!!!!!')

	// 			return res.redirect('/dashboard')
	// 		}

	// 		next()
	// 	}
	// 	else
	// 		return res.redirect(config.sso + '?redirect_uri=' + config.host);
	// });
	
	
	app.use( '/api' , apiRouter );

	app.use( '/' , pageRouter );
	
	// ssl key upload
	app.post('/ssl/upload', upload.fields([{ name: 'crt' }, { name: 'key' }]), function (req, res, next) {

		// verify ssl
		if( !req.user)
			return res.redirect(config.sso + '?redirect_uri=' + config.host);

		console.log(req.user)
		console.log(req.files)

		var crtPath = req.files.crt[0].path
		var keyPath = req.files.key[0].path

		ssl.matchFiles(crtPath, keyPath, function(err, matches) {

			if (err){
				console.error('Something\'s wrong: cert invalid, key invalid, key encrypted or else');
				return res.send( { uploadStatus: "failure", msg: 'cert invalid, key invalid, key encrypted or else' } );
			}

			if (matches){

				console.log('Yay, it matches.');

				//to g-center
				var readAsync = function(file, callback) {
				    fs.readFile(file, 'ascii', callback);
				}

				async.map( [ crtPath, keyPath  ], readAsync, function(err, results) {
				    
					var token = crypto.createHash('sha1').update( "nexusguard.com" ).digest('hex')

					var SSL = {
						crt: results[0],
						key: results[1],

						token: token,

						siteid: req.body.siteid,
						siteurl: req.body.siteurl,
						sitename: req.body.sitename
					}

					console.log( '-------- before ssl request --------' )
					console.log( SSL )

					// g-center 
					request(
						{
							uri: config.gc + '/ssl.php',
							method: "POST",
							rejectUnauthorized: false,
							form: {
								crt: SSL.crt,
								key: SSL.key,
								token: SSL.token,
								site: SSL.siteid,
								url: SSL.siteurl,
								name: SSL.sitename,
								user: SSL.user
							}
						}, function(error, response, body) {
							console.log( error , response , body )
							if( !error ) {
								return res.send( { uploadStatus : "success" , msg:"Your SSL files are deploying." } )
							}else {
								return res.send( { uploadStatus: "failure" , msg:error + body } )
							}
					});
				});
			}

		  else{
		    	console.log('You\'ve picked the wrong key, bro.');
		    	return res.send( { uploadStatus: "failure", msg: 'picked the wrong key' } );
			}
		});
	})	
}
