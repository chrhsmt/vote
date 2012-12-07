
var poolModule = require('generic-pool');
var pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback) {
        var mysql = require('mysql');
    	var c = mysql.createConnection({
    		host: "localhost",
    		user: "root",
    		password: "admin",
    		database: "vote",
    		charset: "UTF-8",
    		socketPath: "/opt/local/var/run/mysql55/mysqld.sock"
    		});

    	//Custom SQL format
    	var originFormatter = c.format;
    	c.format = function (query, values) {
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

    	c.connect(function(err){
    		if (err) throw err;
    	});

        // parameter order: err, resource
        // new in 1.0.6
        callback(null, c);
    },
    destroy  : function(client) { client.end(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2, 
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
     // if true, logs via console.log - can also be a function
    log : false 
});

exports.select = function(sql, params, callbak) {
	pool.acquire(function(err, client) {
	    if (err) {
	    	if (err) throw err;
	    } else {
	    	client.query(sql, params, function(err, rows, fields) {
	    		try {
	    			if (err) throw err;
	    			if (callbak) callbak(rows);
	    		} finally {
	    			pool.release(client);
	    		}
	    	})
	    }
	});
};

exports.update = function(sql, params, callbak) {
	pool.acquire(function(err, client) {
	    if (err) {
	    	if (err) throw err;
	    } else {
	    	client.query(sql, params, function(err, rows, fields) {
	    		try {
	    			if (err) throw err;
	    			if (callbak) callbak(rows);
	    		} finally {
	    			pool.release(client);
	    		}
	    	})
	    }
	});
};
