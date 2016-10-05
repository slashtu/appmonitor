var config = {}

if( process.env.NODE_ENV === "development"){

	config = {

		sso: "http://localhost:8000",
		host: "http://localhost:8000/dashboard",
	}

}else if( process.env.NODE_ENV === "production" ){

	config = {


	}
}else if( process.env.NODE_ENV === "uat" ){

	config = {


	}
}



module.exports = config