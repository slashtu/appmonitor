var config = {}

if( process.env.NODE_ENV === "development"){

	config = {
		apiv2: "http://localhost:8000/api",
		// apiv2: "https://sso.nxg.me/apiv2",
		trackerWS: "wss://sso.nxg.me/ws",
		sso: "http://localhost:8000/api",
		host: "http://localhost:8000/dashboard",

		gdns_host: "http://mydns.nxg.me/",
		myop_host: "https://myop.nxg.me:3000/",
		wafapi: "https://wafapi.nexusguard.com/api/v1/"
	}

}else if( process.env.NODE_ENV === "production" ){

	config = {
		apiv2: "https://cwapi.nexusguard.com/apiv2",
		trackerWS: "wss://cwapi.nexusguard.com/ws",
		
		sso: "https://login.nexusguard.com",
		host: "https://myap.nexusguard.com/dashboard",

		gdns_host: "https://mydns.nexusguard.com",
		myop_host: "https://myop.nexusguard.com",
		wafapi:"https://wafapi.nexusguard.com/api/v1/"
	}
}else if( process.env.NODE_ENV === "uat" ){

	config = {

		apiv2: "https://sso.nxg.me/apiv2",
		trackerWS: "wss://sso.nxg.me/ws",
		sso: "https://login.nxg.me",
		host: "http://myap.nxg.me/dashboard",

		gdns_host: "http://mydns.nxg.me/",
		myop_host: "https://myop.nxg.me:3000/",
		wafapi:"https://wafapi.nexusguard.com/api/v1/"
	}
}



module.exports = config
