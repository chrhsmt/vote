
var candidateDao = require('../dao/candidateDao.js');

exports.id = function(req, res) {
	var showAll = !req.params.candidateId;
	if (showAll) {
		candidateDao.list(null, function(rows) {
		    res.render('candidateList', {
		    	candidates : rows
		    	});
		})
	} else {
		candidateDao.getById(req.params.candidateId, function(rows) {
		    res.render('candidate', {
		    	candidate : rows[0]
		    	});
		})
	}
};

exports.update = function(req, res) {
	req.body.candidate_id = req.params.candidateId;
	candidateDao.update(req.body, function(rows) {
	    res.render('candidate', {
	    	candidate : req.body
	    	});
	})
};