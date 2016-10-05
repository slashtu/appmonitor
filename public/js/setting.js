var config = {}

if( process.env.NODE_ENV === "development"){

	config = {
		apiv2: "http://localhost:8000/api",
		trackerWS: "",
		sso: "http://localhost:8000/api",
		host: "http://localhost:8000/dashboard",
		gdns_host: "",
		myop_host: "",
		wafapi: ""
	}

}else if( process.env.NODE_ENV === "production" ){

	config = {
	}
}else if( process.env.NODE_ENV === "uat" ){

	config = {

	}
}



module.exports = config
