var connection = require('../lib/connection');

exports.get = function(id, callback) {
	connection.select("select * from m_election where election_id = :electionId", {electionId: id}, function(rows) {
		if (callback) callback(rows);
	});
};

exports.getAllElections = function(callback) {
	connection.select("select * from m_election", null, function(rows) {
		if (callback) callback(rows);
	});
};