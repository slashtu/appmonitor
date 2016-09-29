var config = {}

if( process.env.NODE_ENV === "development"){

	config = {

		apiv2: "https://sso.nxg.me/apiv2",
		sso: "http://localhost:8000",
		// sso: "https://login.nxg.me",
		host: "http://localhost:8000/dashboard",
		gc: 'http://gcenter.nxg.me:80'
	}

}else if( process.env.NODE_ENV === "production" ){

	config = {
		apiv2: "https://cwapi.nexusguard.com/apiv2",
		sso: "https://login.nexusguard.com",
		host: "https://myap.nexusguard.com/dashboard",
		gc: 'https://gc.nexusguard.com'

	}
}else if( process.env.NODE_ENV === "uat" ){

	config = {

		apiv2: "https://sso.nxg.me/apiv2",
		sso: "https://login.nxg.me",
		host: "http://myap.nxg.me/dashboard",
		gc: 'http://gcenter.nxg.me:80'
	}
}



module.exports = config