var connection = require('../lib/connection');

exports.get = function(opinionId, callback) {
	var sql = "select * from tbl_opinion t1 where t1.opinion_id = :opinionId";
	connection.select(sql, {opinionId: opinionId}, function(rows) {
		if (callback) callback(rows);
	});	
};


exports.insert = function(params, callback) {
	var sql = "insert into tbl_opinion" +
			"(opinion_id, election_id, constituency_id, candidate_id, issue_id, text, regist_user_id, regist_date, update_user_id, update_date) " +
			"select " +
			"ifnull(max(opinion_id), 0) + 1, " +
			":electionId, " +
			":constituencyId, " +
			":candidateId, " +
			":issueId, " +
			":text, " +
			":userId, now(), :userId, now() " +
			"from tbl_opinion";
	connection.insert(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.update = function(params, callback) {
	var sql = "update tbl_opinion set " +
			"text = :text, " + 
			"update_user_id = :userId, " + 
			"update_date = now() " + 
			"where " +
			"election_id = :electionId " +
			"and constituency_id = :constituencyId " +
			"and candidate_id = :candidateId " +
			"and issue_id = :issueId";
	connection.update(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};