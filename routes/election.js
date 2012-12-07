
var async = require('async');
var electionDao = require('../dao/electionDao');
var constituencyDao = require('../dao/constituencyDao');

exports.index = function(req, res) {
	var showAll = !req.params.electionId;
	if (showAll) {
		electionDao.getAllElections(function(rows) {
			res.render('electionList', {
				elections: rows
			});
		});
	} else {
		async.parallel([
		                function(callback) {
		            		constituencyDao.getConstituenciesByElectionId(req.params.electionId, function(rows) {
			                	callback(null, rows);
		            		});
		                },
		                function(callback) {
		                	electionDao.get(req.params.electionId, function(rows) {
			                	callback(null, rows[0]);
		            		});
		                }
		                ],
		                function(err, results) {
							res.render('constituencies', {
								constituencies: results[0],
								election: results[1]
							});
		});
	}
}

exports.detail = function(req, res) {
	electionDao.get(req.params.electionId, function(rows) {
		res.render('electionDetail', {
			election: rows[0]
		});
	});
}