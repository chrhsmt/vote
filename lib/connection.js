
var mysql = require('mysql');
var DB_NAME = 'test';

var connection = mysql.createConnection({
//	host: "localhost",
	user: "root",
	password: "admin",
	database: DB_NAME,
	socketPath: "/opt/local/var/run/mysql55/mysqld.sock"
	});

//Custom SQL format
var originFormatter = connection.format;
connection.format = function (query, values) {
  // for ? bindings
  query = originFormatter(query, values);
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};


exports.select = function(sql, params, callbak) {
	connection.connect(function(err){
		if (err) throw err;
	});
	connection.query(sql, params, function(err, rows, fields) {
		try {
			if (err) throw err;
			if (callbak) callbak(rows);
		} finally {
			connection.end();
		}
	})
};
