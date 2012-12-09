var connection = require('../lib/connection');

exports.get = function(opinionId, callback) {
	var sql = "select * from tbl_opinion t1 where t1.opinion_id = :opinionId";
	connection.select(sql, {opinionId: opinionId}, function(rows) {
		if (callback) callback(rows);
	});	
};


exports.insert = function(params, callback) {
	var sql = "insert into tbl_opinion" +
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
	var sql = "update tbl_opinion set " +
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