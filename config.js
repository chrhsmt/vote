var config = {};
var mode = process.env.NODE_ENV;
if (mode == "production") {
	config.db = {
    		host: "localhost",
    		user: "root",
    		password: "admin",
    		database: "vote",
    		charset: "UTF-8",
    		};
	config.oauth ={
			redirectUrl: "http://vote.chrhsmt.com/auth/facebook/callback"	
	};
} else if (mode = "development") {
	config.db = {
    		host: "localhost",
    		user: "root",
    		password: "admin",
    		database: "vote",
    		charset: "UTF-8",
    		socketPath: "/opt/local/var/run/mysql55/mysqld.sock",
    		//debug: true
    		};
	config.oauth ={
			redirectUrl: "http://local.chrhsmt.com:3000/auth/facebook/callback"	
	};
}
module.exports = config;