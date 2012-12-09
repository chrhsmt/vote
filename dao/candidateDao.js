var connection = require('../lib/connection');

exports.getById = function(id, callback) {
	connection.select("select * from m_candidate where candidate_id = :candidate_id", {candidate_id: id}, function(rows) {
		if (callback) callback(rows);
	});
};

exports.list = function(params, callback) {
	var sql = "select * from m_candidate";
	connection.select(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.insert = function(params, callback) {
	var sql = "insert into m_candidate" +
			"(candidate_id, name, description, thumbUrl, birthday, regist_user_id, regist_date, update_user_id, update_date) " +
			"select " +
			"ifnull(max(candidate_id), 0) + 1, " +
			":name, " +
			":description, " +
			":thumbUrl, " +
			":birthday, " +
			":userId, now(), :userId, now() " +
			"from m_candidate";
	connection.insert(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.update = function(params, callback) {
	var sql = "update m_candidate set " +
			"name = :name, " + 
			"description = :description, " +
			"thumbUrl = :thumbUrl, " + 
			"update_user_id = :updateUserId, " + 
			"update_date = now() " + 
			"where candidate_id = :candidate_id";
	connection.update(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};