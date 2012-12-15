var connection = require('../lib/connection');

exports.list = function(callback) {
	var sql = "select * from m_prefecture";
	connection.select(sql, null, function(rows) {
		if (callback) callback(rows);
	});	
};

