var connection = require('../lib/connection');

exports.getConstituenciesByElectionId = function(electionId, callback) {
	var sql = "select * from tbl_election_constituency t1 " +
			"inner join m_constituency m1 on t1.constituency_id = m1.constituency_id " +
			"where election_id = :electionId";
	connection.select(sql, {electionId: electionId}, function(rows) {
		if (callback) callback(rows);
	});
}

exports.getCandidate = function(electionId, constituencyId, callback) {
	var sql = "select * from tbl_constituency_candidate t1 " +
			"inner join m_candidate m1 on t1.candidate_id = m1.candidate_id " +
			"where t1.election_id = :electionId and t1.constituency_id = :constituencyId";
	connection.select(sql, {electionId: electionId, constituencyId: constituencyId}, function(rows) {
		if (callback) callback(rows);
	});
};

exports.addCandidate = function(params, callback) {
	var sql = "insert into tbl_constituency_candidate " +
			"values(:electionId, :constituencyId, :candidateId, :userId, now())";
	connection.select(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.addIssue = function(params, callback) {
	var sql = "insert into tbl_constituency_Issue " +
			"values(:electionId, :constituencyId, :issueId, :userId, now())";
	connection.select(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};

exports.getIssues = function(electionId, constituencyId, callback) {
	var sql = "select * from tbl_constituency_issue t1 " +
			"inner join m_issue m1 on t1.issue_id = m1.issue_id " +
			"where t1.election_id = :electionId and t1.constituency_id = :constituencyId";
	connection.select(sql, {electionId: electionId, constituencyId: constituencyId}, function(rows) {
		if (callback) callback(rows);
	});
};

exports.getOpinions = function(electionId, constituencyId, callback) {
	var sql = "select * from tbl_opinion t1 " +
			"where t1.election_id = :electionId and t1.constituency_id = :constituencyId";
	connection.select(sql, {electionId: electionId, constituencyId: constituencyId}, function(rows) {
		if (callback) callback(rows);
	});
};


exports.getMunicipalities = function(prefectureId, callback) {
	var sql = "select * from m_constituency m1 " +
			"where m1.constituency_type = 3 and m1.prefecture_id = :prefectureId";
	connection.select(sql, {prefectureId: prefectureId}, function(rows) {
		if (callback) callback(rows);
	});
};