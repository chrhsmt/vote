var connection = require('../lib/connection');

exports.insert = function(params, callback) {
	var sql = "insert into m_issue" +
			"(issue_id, title, description, regist_user_id, regist_date) " +
			"select " +
			"ifnull(max(issue_id), 0) + 1, " +
			":title, " +
			":description, " +
			":userId, now()" +
			"from m_issue";
	connection.insert(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.getIssues = function(callback) {
	var sql = "select * from m_issue";
	connection.select(sql, null, function(rows) {
		if (callback) callback(rows);
	});
}