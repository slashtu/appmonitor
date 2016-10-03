var express = require('express');

var dummy_me = require('./dummy/me.json');
var dummy_overview = require('./dummy/overview.json');
var dummy_idcrequest = require('./dummy/idcrequest.json');

// 12hours
var twelve_hours_cachehit = require('./dummy/12hours/cachehit.json')
var twelve_hours_legitimated = require('./dummy/12hours/legitimated.json')
var twelve_hours_upstream = require('./dummy/12hours/upstream.json')
var twelve_hours_request = require('./dummy/12hours/request.json')
var twelve_hours_totalbytes = require('./dummy/12hours/totalbytes.json')

// 1day
var aday_cachehit = require('./dummy/1day/cachehit.json')
var aday_legitimated = require('./dummy/1day/legitimated.json')
var aday_upstream = require('./dummy/1day/upstream.json')
var aday_request = require('./dummy/1day/request.json')
var aday_totalbytes = require('./dummy/1day/totalbytes.json')

// 7days
var sevendays_cachehit = require('./dummy/7days/cachehit.json')
var sevendays_legitimated = require('./dummy/7days/legitimated.json')
var sevendays_upstream = require('./dummy/7days/upstream.json')
var sevendays_request = require('./dummy/7days/request.json')
var sevendays_totalbytes = require('./dummy/7days/totalbytes.json')

// 30days
var thirtydays_cachehit = require('./dummy/30days/cachehit.json')
var thirtydays_legitimated = require('./dummy/30days/legitimated.json')
var thirtydays_upstream = require('./dummy/30days/upstream.json')
var thirtydays_request = require('./dummy/30days/request.json')
var thirtydays_totalbytes = require('./dummy/30days/totalbytes.json')

var router = express.Router();


// dummy data
router.get('/me', (req, res, next) => {
	return res.send(dummy_me);
})

router.get('/overview', function(req, res, next) {

	var overview = {}

	// if(req.query.custid === 'C-1ad0f960-5c11-4f80-9131-b318dab9e9c3'){

	// 	overview = 	{

	// 	'S-81375fec-fe24-4518-8ae6-6b1530be8671': {

	// 			onlineUsers: Math.round(Math.random()*10), 
	// 			threats: Math.round(Math.random()*5000),
	// 			cache: Math.round(Math.random()*100),
	// 			pageViews: Math.round(Math.random()*10000),
	// 			visitors: Math.round(Math.random()*3000),
	// 			bandwidth: Math.round(Math.random()*5000),
	// 			request: Math.round(Math.random()*5000),
	// 		}, 

 //        'S-fb4c56d8-b5de-41cf-8be0-7a6b589816bd':{

 //        onlineUsers: Math.round(Math.random()*10), 
	// 			threats: Math.round(Math.random()*100),
	// 			cache: Math.round(Math.random()*10),
	// 			pageViews: Math.round(Math.random()*100),
	// 			visitors: Math.round(Math.random()*100),
	// 			bandwidth: Math.round(Math.random()*1000),
	// 		    request: Math.round(Math.random()*1000),
	// 		} 
				
	// 	}
	// }

	return res.send( dummy_overview )
});


router.get('/', function(req, res, next) {



	var now = Math.floor( new Date().getTime() / 1000);

	if(req.query.field === 'idcrequest'){
		return res.send( dummy_idcrequest )

	}else if(req.query.length === '144'){

		var data = {
			"authlevel": [],
			"authquote": [],
			"badbot": [],
			"badgeo": [],
			"badhead": [],
			"badip": [],
			"badscan": [],
			cachehit: twelve_hours_cachehit.cachehit,
			"clearproxy": [],
			"duphead": [],
			"emptyhead": [],
			legitimated: twelve_hours_legitimated.legitimated,
			"pageviews": [],
			"rdnsquote": [],
			"request": twelve_hours_request.request,
			"spiderquote": [],
			"threat": [],
			"totalbytes": twelve_hours_totalbytes.totalbytes,
			upstream: twelve_hours_upstream.upstream,
			"visitors": []
		}

		for(var pro in data){
			var twelveHoursAgo = now - 144 * 300;

			for( var index = 0 ; index < 144 ; index++ ){
				if(data[pro].length < 144){
					data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
				}
				else{
					data[pro][index][0] = twelveHoursAgo;
				}
				twelveHoursAgo = twelveHoursAgo + 300
			}
		}
		return res.send(data);

	}else if(req.query.length === '288'){
		var data = {
			"authlevel": [],
			"authquote": [],
			"badbot": [],
			"badgeo": [],
			"badhead": [],
			"badip": [],
			"badscan": [],
			cachehit: aday_cachehit.cachehit,
			"clearproxy": [],
			"duphead": [],
			"emptyhead": [],
			legitimated: aday_legitimated.legitimated,
			"pageviews": [],
			"rdnsquote": [],
			"request": aday_request.request,
			"spiderquote": [],
			"threat": [],
			"totalbytes": aday_totalbytes.totalbytes,
			upstream: aday_upstream.upstream,
			"visitors": []
		}

		for(var pro in data){
			var twelveHoursAgo = now - 288 * 300;

			for( var index = 0 ; index < 288 ; index++ ){
				if(data[pro].length < 288){
					data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
				}
				else{
					data[pro][index][0] = twelveHoursAgo;
				}
				twelveHoursAgo = twelveHoursAgo + 300
			}
		}
		return res.send(data);

	}else if(req.query.length === '168'){
		var data = {
			"authlevel": [],
			"authquote": [],
			"badbot": [],
			"badgeo": [],
			"badhead": [],
			"badip": [],
			"badscan": [],
			cachehit: sevendays_cachehit.cachehit,
			"clearproxy": [],
			"duphead": [],
			"emptyhead": [],
			legitimated: sevendays_legitimated.legitimated,
			"pageviews": [],
			"rdnsquote": [],
			"request": sevendays_request.request,
			"spiderquote": [],
			"threat": [],
			"totalbytes": sevendays_totalbytes.totalbytes,
			upstream: sevendays_upstream.upstream,
			"visitors": []
		}

		for(var pro in data){
			var twelveHoursAgo = now - 168 * 3600;

			for( var index = 0 ; index < 168 ; index++ ){
				if(data[pro].length < 168){
					data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
				}
				else{
					data[pro][index][0] = twelveHoursAgo;
				}
				twelveHoursAgo = twelveHoursAgo + 3600
			}
		}
		return res.send(data);	

	}else if(req.query.length === '30'){
		var data = {
			"authlevel": [],
			"authquote": [],
			"badbot": [],
			"badgeo": [],
			"badhead": [],
			"badip": [],
			"badscan": [],
			cachehit: thirtydays_cachehit.cachehit,
			"clearproxy": [],
			"duphead": [],
			"emptyhead": [],
			legitimated: thirtydays_legitimated.legitimated,
			"pageviews": [],
			"rdnsquote": [],
			"request": thirtydays_request.request,
			"spiderquote": [],
			"threat": [],
			"totalbytes": thirtydays_totalbytes.totalbytes,
			upstream: thirtydays_upstream.upstream,
			"visitors": []
		}

		for(var pro in data){
			var twelveHoursAgo = now - 30 * 86400;

			for( var index = 0 ; index < 30 ; index++ ){
				if(data[pro].length < 30){
					data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
				}
				else{
					data[pro][index][0] = twelveHoursAgo;
				}
				twelveHoursAgo = twelveHoursAgo + 86400
			}
		}
		return res.send(data);	
	}
	return res.send( 'no' )
});


module.exports = router;
