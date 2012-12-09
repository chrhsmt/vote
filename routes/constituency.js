
var async = require('async');
var electionDao = require('../dao/electionDao');
var constituencyDao = require('../dao/constituencyDao');
var issueDao = require('../dao/issueDao');
var candidateDao = require('../dao/candidateDao');


exports.index = function(req, res) {
	var electionId = req.params.electionId;
	var constituencyId = req.params.constituencyId;
	
	async.parallel([
	                 function(callback) {
						constituencyDao.getCandidate(electionId, constituencyId, function(rows) {
							callback(null, rows)
						});
	                 },
	                 function(callback) {
	                	 constituencyDao.getIssues(electionId, constituencyId, function(rows) {
							callback(null, rows)
						});
	                 },
	                 function(callback) {
	                	 issueDao.getIssues(function(rows) {
							callback(null, rows)
						});
	                 },
	                 function(callback) {
	                	 constituencyDao.getOpinions(electionId, constituencyId, function(rows) {
							callback(null, rows)
						});
	                 },
	                 function(callback) {
	                	 candidateDao.list(null, function(rows) {
							callback(null, rows)
						});
	                 },
	                 ],
	                 function(err, results) {
						res.render('constituency', {
							electionId: electionId,
							constituencyId: constituencyId,
							candidates: results[0],
					      	issues: results[1],
					      	allIssues: results[2],
					      	opinions: results[3],
							allCandidates: results[4]
						});
	});
}

exports.addCandidate = function(req, res) {
	req.body.userId = req.session.user.user_id;
	constituencyDao.addCandidate(req.body, function() {
		res.redirect('/election/' + req.body.electionId + '/constituency/' + req.body.constituencyId);
	});
};

exports.addIssue = function(req, res) {
	req.body.userId = req.session.user.user_id;
	constituencyDao.addIssue(req.body, function() {
		res.redirect('/election/' + req.body.electionId + '/constituency/' + req.body.constituencyId);
	});
};
