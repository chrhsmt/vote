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
}
module.exports = config;