var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var path = require( 'path' );
// var jwt = require('jsonwebtoken');
var config = require( __base+'server/config/env.js' );


router.get('/privacy', function(req, res, next) {
	return res.sendFile( __base+'dist/privacy.html' );
});

router.get('/terms', function(req, res, next) {
	return res.sendFile( __base+'dist/terms.html' );
});


router.get('*', function(req, res, next) {

	return res.sendFile( __base+'dist/dashboard.html' );
});

module.exports = router;
