var connection = require('../lib/connection');

var candidates = [
                    {
                    	id:0,
                    	name:"テスト太郎",
                    	description:"説明",
                    	thumbUrl: "",
                    	birthDay:"2012/12/16"
                    },
                    {
                    	id:1,
                    	name:"テスト二郎",
                    	description:"説明",
                    	thumbUrl: "",
                    	birthDay:"2012/12/16"
                    }
                    ];

exports.getCandidates = function() {
	return candidates;
};

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

exports.update = function(params, callback) {
	var sql = "update m_candidate set " +
			"name = :name, " + 
			"description = :description, " +
			"thumbUrl = :thumbUrl, " + 
			"update_date = now() " + 
			"where candidate_id = :candidate_id";
	connection.update(sql, params, function(rows) {
		if (callback) callback(rows);
	});
};