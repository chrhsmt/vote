var connection = require('../lib/connection');

exports.getConstituenciesByElectionId = function(electionId, callback) {
	var sql = "select * from tbl_election_constituency t1 " +
			"inner join m_constituency m1 on t1.constituency_id = m1.constituency_id " +
			"where election_id = :electionId";
	connection.select(sql, {electionId: electionId}, function(rows) {
		if (callback) callback(rows);
	});
}

exports.get = function(electionId, constituencyId, callback) {
	var sql = "select * from tbl_election_candidate t1 " +
			"inner join m_candidate m1 on t1.candidate_id = m1.candidate_id " +
			"where t1.election_id = :electionId and t1.constituency_id = :constituencyId";
	connection.select(sql, {electionId: electionId, constituencyId: constituencyId}, function(rows) {
		if (callback) callback(rows);
	});
};