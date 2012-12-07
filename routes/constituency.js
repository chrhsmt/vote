
var async = require('async');
var electionDao = require('../dao/electionDao');
var constituencyDao = require('../dao/constituencyDao');
var issueDao = require('../dao/issueDao');


exports.index = function(req, res) {
	var electionId = req.params.electionId;
	var constituencyId = req.params.constituencyId;
	
	constituencyDao.get(electionId, constituencyId, function(rows) {
		res.render('constituency', {
			candidates: rows,
	      	issues: issueDao.getIssues()
		});
	})
}