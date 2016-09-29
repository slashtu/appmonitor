var express = require('express');

var dummy_me = require('./dummy/me.json');

var router = express.Router();


// dummy data
router.get('/me', (req, res, next) => {
	return res.send(dummy_me);
})

router.get('/getOverview', function(req, res, next) {

	var overview = {}

	if(req.query.custid === 'C-1ad0f960-5c11-4f80-9131-b318dab9e9c3'){

		overview = 	{

		'S-81375fec-fe24-4518-8ae6-6b1530be8671': {

				onlineUsers: Math.round(Math.random()*10), 
				threats: Math.round(Math.random()*5000),
				cache: Math.round(Math.random()*100),
				pageViews: Math.round(Math.random()*10000),
				visitors: Math.round(Math.random()*3000),
				bandwidth: Math.round(Math.random()*5000),
				request: Math.round(Math.random()*5000),
			}, 

        'S-fb4c56d8-b5de-41cf-8be0-7a6b589816bd':{

            	onlineUsers: Math.round(Math.random()*10), 
				threats: Math.round(Math.random()*100),
				cache: Math.round(Math.random()*10),
				pageViews: Math.round(Math.random()*100),
				visitors: Math.round(Math.random()*100),
				bandwidth: Math.round(Math.random()*1000),
			    request: Math.round(Math.random()*1000),
			} 
				
		}
	}

	return res.send( overview )
});

// dummy data
router.get('/getProtectionData', function(req, res, next) {

	if(req.query.site_id === 'S-81375fec-fe24-4518-8ae6-6b1530be8671'){

		return res.send( { threat: Math.round(Math.random()*3000), 
						   bandwidth: Math.round(Math.random()*5000),
						   request: Math.round(Math.random()*5000),
						});
	}
	else{
		return res.send( { threat: Math.round(Math.random()*10), 
						   bandwidth: Math.round(Math.random()*1000),
						   request: Math.round(Math.random()*1000),
						});
	}
});

// accountInfo
router.get('/getUser', function(req, res, next) {

	var sites = { 
		'S-81375fec-fe24-4518-8ae6-6b1530be8671': {
			name: 'www.high.com',
			siteId: 'S-81375fec-fe24-4518-8ae6-6b1530be8671'
		},

		'S-fb4c56d8-b5de-41cf-8be0-7a6b589816bd': {
			name: 'www.low.com',
			siteId: 'S-fb4c56d8-b5de-41cf-8be0-7a6b589816bd'
		}
	}

	return res.send({
		cid: "C-1ad0f960-5c11-4f80-9131-b318dab9e9c3",
		name: "HTB", 
		username: "slash.tu@nexusguard.com",
		sites: sites
		});	
});

module.exports = router;
